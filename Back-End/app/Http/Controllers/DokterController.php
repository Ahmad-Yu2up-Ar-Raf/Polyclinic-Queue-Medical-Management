<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\Dokter\DokterStoreRequest;
use App\Http\Requests\Dokter\DokterUpdateRequest;
use App\Models\Dokter;
use App\Models\Poli;
use App\Models\User;
use Illuminate\Http\Request;

class DokterController extends Controller
{

    public function index(Request $request)
    {

        $search = $request->input('search');
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);

        $query = Dokter::query()->forWebsite();

        if ($search) {

            $query->where(function ($q)  use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                    ->orWhereRaw("LOWER(spesialisasi) LIKE ?", ["%{$searchLower}%"])
                    ->orWhereRaw("LOWER(deskripsi) LIKE ?", ["%{$searchLower}%"]);

                $q->orWhereHas('poli', function ($queryPoli) use ($searchLower) {
                    $queryPoli->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"]);
                });
            });
        }


        $dokters = $query->paginate($perPage, ["*"], 'page', $page);


        return response()->json([
            'status' => true,
            'message' => 'Dokter retrieved successfully',
            'data' =>  $dokters->items() ?? [],
            'meta' => [
                'filters' => [
                    'search' => $search ?? '',
                ],
                'pagination' => [
                    'total' => $dokters->total(),
                    'currentPage' => $dokters->currentPage(),
                    'perPage' => $dokters->perPage(),
                    'lastPage' => $dokters->lastPage(),
                    'hasMore' => $dokters->currentPage() < $dokters->lastPage(),
                ],
            ],
        ], 200);
    }


    public function store(DokterStoreRequest $request)
    {
        $validated = $request->validated();


        $user = User::factory()->create([
            'name' => $validated["nama"],
            'email' => $validated["email"]
        ]);

        $user->syncRoles(RoleEnum::DOKTER->value);


        $data = Dokter::create([
            'user_id'  => $user->id,
            ...$validated,
        ]);

        $jadwal_ids = $validated["jadwal_ids"];

        if ($jadwal_ids) {

            $data->jadwal()->attach($jadwal_ids);
        };

        return response()->json([
            'succes' => true
        ], 201);
    }

    public function getDokterByPoli(Request $request)
    {
        $search = $request->input('search');
        $searchLower = strtolower($search);

        $polis = Poli::query()
            // 1. Filter Poli: Cari Poli yang namanya cocok ATAU yang punya dokter yang cocok
            ->when($search, function ($query) use ($searchLower) {
                $query->where(function ($q) use ($searchLower) {
                    $q->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                        ->orWhereHas('dokter', function ($qDokter) use ($searchLower) {
                            $qDokter->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                                ->orWhereRaw("LOWER(spesialisasi) LIKE ?", ["%{$searchLower}%"]);
                        });
                });
            })
            // 2. Load Dokter: Terapkan filter yang sama pada relasi dokter
            ->with(['dokter' => function ($query) use ($search, $searchLower) {
                $query->forWebsite();

                if ($search) {
                    $query->where(function ($q) use ($searchLower) {
                        $q->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                            ->orWhereRaw("LOWER(spesialisasi) LIKE ?", ["%{$searchLower}%"])
                            ->orWhereRaw("LOWER(deskripsi) LIKE ?", ["%{$searchLower}%"]);
                    });
                }
            }])
            ->get();

        // Opsional: Hapus Poli yang dokter-nya kosong setelah di-filter
        if ($search) {
            $polis = $polis->filter(function ($poli) {
                return $poli->dokter->isNotEmpty();
            })->values();
        }

        return response()->json([
            'status' => true,
            'message' => 'Data dokter berhasil dikelompokkan berdasarkan poli',
            'data' => $polis
        ], 200);
    }


    public function show(Dokter $dokter)
    {
        $hariIni = \Carbon\Carbon::now()->locale('id')->dayName;

        $dokter->load(['poli:id,nama', 'jadwal:hari,jam_mulai,jam_selesai']);
        $dokter->loadCount(['jadwal', 'antrian']);


        $dokter->loadExists(['jadwal as tersedia' => function ($query) use ($hariIni) {
            $query->where('hari', $hariIni);
        }]);

        $dokter->jadwal->makeHidden('pivot');

        return response()->json([
            'data' => $dokter
        ], 200);
    }


    public function update(DokterUpdateRequest $request, Dokter $dokter)
    {
        $validated = $request->validated();

        if ($dokter->email  !==  $validated['email']) {
            $userDokter = User::findOrFail($dokter->user_id);
            $user = $userDokter->update([
                'email' => $validated["email"]
            ]);
        }


        $dokter->update($validated);



        $jadwal_ids = $validated["jadwal_ids"] ?? null;

        if ($jadwal_ids) {

            $dokter->jadwal()->sync($jadwal_ids);
        };


        return response()->json([
            'succes' => true
        ], 200);
    }


    public function destroy(Dokter $dokter)
    {

        $dokter->delete($dokter->id);

        return response()->json([
            'success' => true,
            'message' => 'Data dokter berhasil dihapus'
        ], 200);
    }
}
