<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Bungkus semua query database di dalam Cache::remember
        // Data ini akan disimpan selama 10 detik. Jadi dalam 10 detik,
        // jika ada 100 orang yang akses, aplikasi lu GAK AKAN nembak database sama sekali!
        // Langsung instan diambil dari memori.
        $reports = Cache::remember('overview_reports', 10, function () {
            $totals = [
                'totalDokter'  => Dokter::count(),
                'totalPasien'  => Pasien::count(),
                'totalAntrian' => Antrian::count(),
                'totalPoli'    => Poli::count(),
            ];

            $dokterStatusCount = Dokter::select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->pluck('count', 'status');

            $jenisKelaminDokter = Dokter::select('jenis_kelamin', DB::raw('count(*) as count'))
                ->groupBy('jenis_kelamin')
                ->pluck('count', 'jenis_kelamin');

            $jenisKelaminPasien = Pasien::select('jenis_kelamin', DB::raw('count(*) as count'))
                ->groupBy('jenis_kelamin')
                ->pluck('count', 'jenis_kelamin');

            $antrianStatusCount = Antrian::select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->pluck('count', 'status');

            $topDokter = Dokter::withCount('antrian')
                ->orderBy('antrian_count', 'desc')
                ->take(5)
                ->get();

            // Ambil data chart ringkas (jangan pakai ->get() lalu di-loop di PHP!)
            $dokterCounts = Dokter::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('count', 'date');

            $antrianCounts = Antrian::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('count', 'date');

            $pasienCounts = Pasien::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
                ->groupBy(DB::raw('DATE(created_at)'))->pluck('count', 'date');

            // Satukan dates
            $allDates = collect(array_merge(
                $dokterCounts->keys()->toArray(),
                $antrianCounts->keys()->toArray(),
                $pasienCounts->keys()->toArray()
            ))->unique()->sort();

            $counts = $allDates->map(function ($date) use ($dokterCounts, $pasienCounts, $antrianCounts) {
                return [
                    'date'    => $date,
                    'dokter'  => $dokterCounts->get($date, 0),
                    'pasien'  => $pasienCounts->get($date, 0),
                    'antrian' => $antrianCounts->get($date, 0),
                ];
            })->values();

            return array_merge($totals, [
                'topDokter'               => $topDokter,
                'AntrianstatusCount'      => $antrianStatusCount,
                'DokterstatusCount'       => $dokterStatusCount,
                'JenisKelaminPasienCount' => $jenisKelaminPasien,
                'JenisKelaminDokterCount' => $jenisKelaminDokter,
                'countsByDate'            => $counts,
            ]);
        });

        return response()->json(['reports' => $reports]);
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
