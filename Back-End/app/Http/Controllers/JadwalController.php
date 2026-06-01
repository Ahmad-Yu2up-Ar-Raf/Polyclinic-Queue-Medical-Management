<?php

namespace App\Http\Controllers;

use App\Http\Requests\Jadwal\JadwalStoreRequest;
use App\Http\Requests\Jadwal\JadwalUpdateRequest;
use App\Models\Jadwal;
use Illuminate\Http\Request;

class JadwalController extends Controller
{


    public function select()
    {
        $jadwal = Jadwal::select('id', 'hari', 'jam_mulai', 'jam_selesai')->get();

        return response()->json([
            'status'  => true,
            'message' => 'Jadwal retrieved successfully',
            'data'    => $jadwal,
        ]);
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page');
        $perPage = $request->input('perPage');

        $query = Jadwal::query()->forWebsite()->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $lowerSearch = strtolower($search);
                $q->whereRaw("LOWER(nama) LIKE ?", ["%{$lowerSearch}%"])
                    ->orWhereRaw("LOWER(hari) LIKE ?", ["%{$lowerSearch}%"])
                ;

                $q->whereHas('dokter', function ($p) use ($lowerSearch) {
                    $p->whereRaw("LOWER(nama) LIKE ?", ["%{$lowerSearch}%"]);
                });
            });
        }


        $jadwal = $query->paginate($perPage, ["*"],  'page', $page);


        return response()->json([
            'status' => true,
            'message' => 'Jadwal retrieved successfully',
            'data'   => $jadwal->items() ?? [],

            'meta' => [
                'filters' => [
                    'search' => $search ?? '',
                ],
                'pagination' => [
                    'total' => $jadwal->total(),
                    'currentPage' => $jadwal->currentPage(),
                    'perPage' => $jadwal->perPage(),
                    'lastPage' => $jadwal->lastPage(),
                    'hasMore' => $jadwal->currentPage() < $jadwal->lastPage(),
                ],
            ],
        ], 200);
    }


    public function store(JadwalStoreRequest $request)
    {
        $validated = $request->validated();

        $dokter_ids = $validated["dokter_ids"] ?? null;



        $jadwal = Jadwal::create($validated);

        if ($dokter_ids) {
            $jadwal->dokter()->attach($dokter_ids);
        }

        return response()->json([
            'succes' => true
        ], 201);
    }


    public function show(Jadwal $jadwal)
    {

        $jadwal->load(['dokter', 'antrian']);
        $jadwal->loadCount(['dokter', 'antrian']);

        $jadwal->dokter->makeHidden('pivot');
        return response()->json([
            'data' => $jadwal
        ], 200);
    }


    public function update(JadwalUpdateRequest $request, Jadwal $jadwal)
    {
        $validated = $request->validated();



        $jadwal->update($validated);



        $dokter_ids = $validated["dokter_ids"] ?? null;

        if ($dokter_ids) {

            $jadwal->dokter()->sync($dokter_ids);
        };


        return response()->json([
            'succes' => true
        ], 200);
    }


    public function destroy(Jadwal $jadwal)
    {

        $jadwal->delete($jadwal->id);

        return response()->json([
            'succes' => true
        ], 204);
    }
}
