<?php

namespace App\Http\Controllers;

use App\Enums\AntrianStatusEnum;
use App\Enums\RoleEnum;
use App\Http\Requests\Antrian\AntrianStorePendaftaranBaruRequest;
use App\Http\Requests\Antrian\AntrianStoreRequest;
use App\Http\Requests\Antrian\AntrianUpdateRequest;
use App\Http\Requests\Antrian\OnboardingStoreRequest;
use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AntrianController extends Controller
{


    public function overview(Request $request)
    {
        $user = $request->user();


        $pasienIds = Pasien::where('user_id', $user->id)->pluck('id');



        $userAntrian = Antrian::query()
            ->forWebsite()
            ->whereStatus(AntrianStatusEnum::DIPANGGIL->value)
            ->whereIn('pasien_id', $pasienIds)
            ->take(3)
            ->get();

        $dokter = Dokter::query()->forWebsite()->take(4)->get();

        return response()->json([
            'status' => true,
            'message' => 'Data retrieved successfully',
            'data' =>  [

                'antrianUser' =>  $userAntrian ?? [],
                'dokter' =>  $dokter ?? []
            ],

        ], 200);
    }

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




    public function antrianSaya(Request $request)
    {
        $user = $request->user();

        // Pengecekan safety jika user null (mencegah error "Attempt to read property 'id' on null")
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized.',
            ], 401);
        }

        $userId = $user->id;
        $pasienIds = Pasien::where('user_id', $userId)->pluck('id');
        $search = $request->input('search');

        $query = Antrian::query()->whereIn('pasien_id', $pasienIds)->forWebsite();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw("LOWER(nomor_antrian) LIKE ?", ["%{$searchLower}%"]);
                $q->orWhereHas('pasien', function ($pasienQuery) use ($searchLower) {
                    $pasienQuery->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                        ->orWhereRaw("LOWER(nik) LIKE ?", ["%{$searchLower}%"]);
                });
                $q->orWhereHas('dokter', function ($dokterQuery) use ($searchLower) {
                    $dokterQuery->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                        ->orWhereRaw("LOWER(spesialisasi) LIKE ?", ["%{$searchLower}%"]);
                });
                $q->orWhereHas('poli', function ($poliQuery) use ($searchLower) {
                    $poliQuery->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                        ->orWhereRaw("LOWER(kode) LIKE ?", ["%{$searchLower}%"]);
                });
            });
        }

        // Ambil semua data (menjadi bentuk Collection)
        $antrianRaw = $query->get();

        // Mengelompokkan data berdasarkan kolom 'status'
        $groupedAntrian = $antrianRaw->groupBy('status');

        // BEST PRACTICE: Memastikan semua status dari Enum selalu ada di response
        $dataFormatted = [];
        foreach (AntrianStatusEnum::cases() as $statusEnum) {
            $dataFormatted[$statusEnum->value] = $groupedAntrian->get($statusEnum->value, []);
        }

        return response()->json([
            'status' => true,
            'message' => 'Antrian retrieved successfully',
            'data' => $dataFormatted,
        ], 200);
    }



    public function monitor(Request $request)
    {
        $search = $request->input('search');

        // Ini cuma nyiapin "Kerangka" query-nya aja (belum dieksekusi)
        $baseQuery = Antrian::query()->forWebsite();

        if ($search) {
            $baseQuery->where(function ($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw("LOWER(nomor_antrian) LIKE ?", ["%{$searchLower}%"]);
                $q->orWhereHas('pasien', function ($pasienQuery) use ($searchLower) {
                    $pasienQuery->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                        ->orWhereRaw("LOWER(nik) LIKE ?", ["%{$searchLower}%"]);
                });
            });
        }

        $dataFormatted = [];

        // BEST PRACTICE: Kita looping enum-nya, dan tembak ke database
        // ngambil MAKSIMAL 5 data per status. Ini jauh lebih ringan!
        foreach (AntrianStatusEnum::cases() as $statusEnum) {

            // Kita pakai '(clone $baseQuery)' agar kondisi pencarian (search)
            // di atas tetap ikut kebawa, tapi kita nggak merusak $baseQuery aslinya.
            $dataFormatted[$statusEnum->value] = (clone $baseQuery)
                ->where('status', $statusEnum->value)
                ->limit(5)
                ->get();
        }

        return response()->json([
            'status' => true,
            'message' => 'Antrian retrieved successfully',
            'data' => $dataFormatted,
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
        if (empty($validated['nomor_antrian']) || empty($validated['nomor_urut'])) {
            [$nomor_antrian, $status, $nomor_urut] = $this->generateKodeAntrian($validated['poli_id']);
            $validated['nomor_antrian'] = $nomor_antrian;
            $validated['nomor_urut'] = $nomor_urut;
            $validated['status'] = $status;
        }

        if (empty($validated['dokter_id'])) {
            $dokter = $this->pemilihanDokter($validated['poli_id'], $validated['jadwal_kunjungan']);

            if (!$dokter) {
                throw new \Exception("Tidak ada dokter tersedia untuk jadwal tersebut.");
            }
            $validated['dokter_id'] = $dokter->id;
        }

        if ($isPasien) {
            $pasien =
                Pasien::whereUserId($user->id)->first();
            if (!$pasien) {
                return response()->json(['message' => 'data pasien tidak ditemukan']);
            }
            $validated['pasien_id'] = $pasien->id;
        }



        $antrian = Antrian::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil',
            'data' => $antrian
        ], 200);
    }


    public function pendaftaranBaru(AntrianStorePendaftaranBaruRequest $request)
    {
        $user = $request->user();
        $isPasien = $user->hasRole(RoleEnum::PASIEN->value);

        $validated = $request->validated();



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

        $pasien = Pasien::create($dataPasien);
        $validated['pasien_id'] = $pasien->id;


        if (empty($validated['nomor_antrian']) || empty($validated['nomor_urut'])) {
            [$nomor_antrian, $status, $nomor_urut] = $this->generateKodeAntrian($validated['poli_id']);
            $validated['nomor_antrian'] = $nomor_antrian;
            $validated['nomor_urut'] = $nomor_urut;
            $validated['status'] = $status;
        }

        // B. Jika dokter_id belum ada, cari otomatis
        if (empty($validated['dokter_id'])) {
            $dokter = $this->pemilihanDokter($validated['poli_id'], $validated['jadwal_kunjungan']);

            if (!$dokter) {
                throw new \Exception("Tidak ada dokter tersedia untuk jadwal tersebut.");
            }
            $validated['dokter_id'] = $dokter->id;
        }

        // 3. Proses Data Antrian
        $dataAntrian = Arr::only($validated, [
            'pasien_id',
            'poli_id',
            'dokter_id',
            'metode_pembayaran',
            'status',
            'nomor_urut',
            'deskripsi',
            'nomor_antrian',
            'jadwal_kunjungan'
        ]);

        $antrian = Antrian::create($dataAntrian);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil',
            'data' => $antrian
        ], 200);
    }
    public function show(Antrian $antrian)
    {

        $antrian->load(['poli:nama,id', 'dokter:id,nama', 'pasien:id,nama']);

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
            'success' => true,
            'message' => 'Data antrian berhasil dihapus'
        ], 200);
    }




    private function pemilihanDokter(int $poli_id, string $jadwal_kunjungan)
    {
        // 1. Ubah format Y-m-d menjadi nama hari (Senin, Selasa, dst)
        $namaHari = Carbon::parse($jadwal_kunjungan)->locale('id')->dayName;

        // 2. Cari dokter di poli tersebut yang punya jadwal di hari tersebut

        $dokter = Dokter::query()
            ->forWebsite()
            ->where('poli_id', $poli_id)
            ->whereHas('jadwal', function ($query) use ($namaHari) {
                $query->where('hari', $namaHari);
            })
            ->first(); // Mengambil hanya 1 data pertama
        return $dokter;
    }
    public function cek(OnboardingStoreRequest $request)
    {

        $validated = $request->validated();
        // Panggil helper function
        $poli_id = $validated['poli_id'];
        $poli = Poli::select('nama')->findOrFail($poli_id);
        $jadwal_kunjungan = $validated['jadwal_kunjungan'];


        [$nomor_antrian, $status, $nomor_urut_finnal] = $this->generateKodeAntrian($validated["poli_id"]);


        $dokter = $this->pemilihanDokter(
            $poli_id,
            $jadwal_kunjungan
        );

        // Jika tidak ada dokter yang jadwalnya cocok
        if (!$dokter) {
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada dokter yang tersedia untuk poli dan tanggal tersebut.',
                'data' => []
            ], 404);
        }

        // Jika ketemu, kembalikan datanya
        return response()->json([
            'status' => true,
            'message' => 'Dokter tersedia berhasil ditemukan',
            'data' => [
                'dokter' => $dokter,
                'poli' => $poli,
                'nomor_antrian' => $nomor_antrian,
                'nomor_urut_finnal' => $nomor_urut_finnal,
                'status' => $status
            ]
        ], 200);
    }
}
