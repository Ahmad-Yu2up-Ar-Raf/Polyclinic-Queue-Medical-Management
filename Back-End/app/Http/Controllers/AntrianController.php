<?php

namespace App\Http\Controllers;

use App\Enums\AntrianStatusEnum;
use App\Enums\RoleEnum;
use App\Http\Requests\Antrian\AntrianStorePendaftaranBaruRequest;
use App\Http\Requests\Antrian\AntrianStoreRequest;
use App\Http\Requests\Antrian\AntrianUpdateRequest;
use App\Models\Antrian;

use App\Models\Pasien;
use App\Models\Poli;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class AntrianController extends Controller
{

    public function index(Request $request)
    {

        $search = $request->input('search');
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);

        $query = Antrian::query()->forWebsite();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw("LOWER(nomor_antrian) LIKE ?", ["%{$searchLower}%"]);
                $q->orWhereHas('pasien', function ($pasienQuery) use ($searchLower) {
                    $pasienQuery->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                        ->orWhereRaw("LOWER(nik) LIKE ?", ["%{$searchLower}%"]);
                });
            });
        };


        $antrian = $query->paginate($perPage, ["*"], 'page', $page);

        return response()->json([
            'status' => true,
            'message' => 'Antrian retrieved successfully',
            'data' =>  $antrian->items() ?? [],
            'meta' => [
                'filters' => [
                    'search' => $search ?? '',
                ],
                'pagination' => [
                    'total' => $antrian->total(),
                    'currentPage' => $antrian->currentPage(),
                    'perPage' => $antrian->perPage(),
                    'lastPage' => $antrian->lastPage(),
                    'hasMore' => $antrian->currentPage() < $antrian->lastPage(),
                ],
            ],
        ], 200);
    }

    private function generateKodeAntrian(string $id)
    {
        $poli = Poli::findOrFail($id);
        $kode = $poli->kode;
        $latestAntrian = Antrian::query()->where('poli_id', $poli->id)->latest('id')->first();
        if ($latestAntrian) {
            $latestAntrianStatus = $latestAntrian->status;
            $statusValue = $latestAntrianStatus instanceof \UnitEnum ? $latestAntrianStatus->value : $latestAntrianStatus;

            $status = match ($statusValue) {
                AntrianStatusEnum::SELESAI->value => AntrianStatusEnum::DIPANGGIL->value,
                AntrianStatusEnum::DIPANGGIL->value => AntrianStatusEnum::MENUNGGU->value,
                default => AntrianStatusEnum::MENUNGGU->value,
            };

            $nomorAntrianTerbaru = $latestAntrian->nomor_urut;
            $nomor_urut_finnal =   $nomorAntrianTerbaru + 1;
        } else {
            $status = AntrianStatusEnum::MENUNGGU->value;
            $nomor_urut_finnal = 1;
        }

        $antrianKode = str_pad($nomor_urut_finnal, 3, "0", STR_PAD_LEFT);
        $nomor_antrian = "{$kode}-{$antrianKode}";


        return [$nomor_antrian, $status, $nomor_urut_finnal];
    }


    public function store(AntrianStoreRequest $request)
    {

        $user = $request->user();
        $isPasien = $user->hasRole(RoleEnum::PASIEN->value);

        $validated = $request->validated();




        if ($isPasien) {
            $pasien =
                Pasien::whereUserId($user->id)->first();
            if (!$pasien) {
                return response()->json(['message' => 'data pasien tidak ditemukan']);
            }
            $validated['pasien_id'] = $pasien->id;
        }


        [$nomor_antrian, $status, $nomor_urut_finnal] = $this->generateKodeAntrian($validated["poli_id"]);

        $validated['nomor_antrian'] = $nomor_antrian;
        $validated['nomor_urut'] = $nomor_urut_finnal;
        $validated['status'] = $status;

        $antrian = Antrian::create($validated);

        return response()->json([
            'succes' => true
        ], 200);
    }

    public function pendaftaranBaru(AntrianStorePendaftaranBaruRequest $request)
    {

        $user = $request->user();
        $isPasien = $user->hasRole(RoleEnum::PASIEN->value);
        $validated = $request->validated();

        return DB::transaction(function () use ($user, $isPasien, $validated) {


            $dataPasien = Arr::only($validated, [
                'nama',
                'no_hp',
                'user_id',
                'jenis_kelamin',
                'tanggal_lahir',
                'nik',
                'alamat'
            ]);


            if ($isPasien) {

                $dataPasien['user_id'] = $user->id;
            }

            $pasien =   Pasien::create($dataPasien);
            $validated['pasien_id'] = $pasien->id;



            [$nomor_antrian, $status, $nomor_urut_finnal]  = $this->generateKodeAntrian($validated["poli_id"]);

            $dataAntrian = Arr::only($validated, [
                'pasien_id',
                'poli_id',
                'dokter_id',
                'jadwal_id',
                'metode_pembayaran',
                'status',
                'nomor_urut',
                'deskripsi',
                'nomor_antrian'
            ]);


            $dataAntrian['nomor_antrian'] = $nomor_antrian;
            $dataAntrian['status'] = $status;
            $dataAntrian['nomor_urut'] = $nomor_urut_finnal;

            $antrian = Antrian::create($dataAntrian);

            return response()->json([
                'succes' => true
            ], 200);
        });
    }

    public function show(Antrian $antrian)
    {

        $antrian->load(['jadwal:hari,id', 'poli:nama,id', 'dokter:id,nama', 'pasien:id,nama']);

        return response()->json([
            'data' => $antrian
        ], 200);
    }

    public function update(AntrianUpdateRequest $request, Antrian $antrian)
    {
        $validated = $request->validated();
        $poli_id = $validated["poli_id"];

        if ($antrian->poli_id !== $poli_id) {
            [$nomor_antrian, $status] = $this->generateKodeAntrian($poli_id);

            $validated['nomor_antrian'] = $nomor_antrian;
            $validated['status'] = $status;
        }

        $antrian->update($validated);

        return response()->json([
            'succes' => true
        ], 200);
    }


    public function destroy(Antrian $antrian)
    {
        $antrian->delete($antrian->id);

        return response()->json([
            'succes' => true
        ], 204);
    }
}
