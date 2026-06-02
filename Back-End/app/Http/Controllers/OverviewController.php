<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recordDokter = Dokter::all();


        $recordPasien = Pasien::all();
        $recordAntrian = Antrian::all();
        $recordPoli = Poli::all();

        $dokterCounts = Dokter::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as dokter'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');
        $antrianCounts = Antrian::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as antrian'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');

        $pasienCounts = Pasien::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as pasien'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');
        $poliCounts = Poli::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as poli'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');

        $topDokter = Dokter::select('nama')
            ->withCount('antrian')
            ->orderByDesc('antrian_count')
            ->take(5)
            ->get();


        // Gabungkan data dokter dan pasien berdasarkan tanggal
        $allDates = collect($dokterCounts->keys())->merge($pasienCounts->keys())->merge($antrianCounts->keys())->merge($poliCounts->keys())->unique();

        $counts = $allDates->map(function ($date) use ($dokterCounts, $pasienCounts, $antrianCounts, $poliCounts) {
            return [
                'date' => $date,

                'pasien' => $pasienCounts->get($date)->pasien ?? 0,
                'antrian' => $antrianCounts->get($date)->antrian ?? 0,


            ];
        })->values();




        $dokterStatusCount = $recordDokter->groupBy('status')->map(function ($group) {
            return $group->count();
        });
        $jenisKelaminDokter = $recordDokter->groupBy('jenis_kelamin')->map(function ($group) {
            return $group->count();
        });
        $jenisKelaminPasien = $recordPasien->groupBy('jenis_kelamin')->map(function ($group) {
            return $group->count();
        });
        $antrianCounts = $recordAntrian->groupBy('status')->map(function ($group) {
            return $group->count();
        });





        return  response()->json([
            'reports' => [
                'totalDokter' => $recordDokter->count(),
                'totalPasien' => $recordPasien->count(),
                'totalAntrian' => $recordAntrian->count(),
                'totalPoli' => $recordPoli->count(),

                'topDokter' => $topDokter,

                'AntrianstatusCount' => $antrianCounts,
                'DokterstatusCount' => $dokterStatusCount,
                'JenisKelaminPasienCount' => $jenisKelaminPasien,
                'JenisKelaminDokterCount' => $jenisKelaminDokter,
                'countsByDate' => $counts,
            ],
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
