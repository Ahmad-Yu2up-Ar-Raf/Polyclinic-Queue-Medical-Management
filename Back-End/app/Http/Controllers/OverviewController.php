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
        // 1. Ambil semua angka lewat Query Aggregate (Jauh lebih hemat RAM)
        $totals = [
            'totalDokter'  => Dokter::count(),
            'totalPasien'  => Pasien::count(),
            'totalAntrian' => Antrian::count(),
            'totalPoli'    => Poli::count(),
        ];

        // 2. Gunakan pluck() untuk grouping langsung di Database
        // Ini mengembalikan array: ['aktif' => 10, 'nonaktif' => 2]
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

        // 3. Top Dokter (Tetap pakai withCount, ini sudah benar)
        $topDokter = Dokter::select('id', 'nama')
            ->withCount('antrian')
            ->orderByDesc('antrian_count')
            ->take(5)
            ->get();

        // 4. Data per Tanggal (Optimasi Query)
        // Kita ambil data sekaligus tanpa memuat objek Model
        $dokterCounts = Dokter::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')->pluck('count', 'date');

        $pasienCounts = Pasien::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')->pluck('count', 'date');

        $antrianCounts = Antrian::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')->pluck('count', 'date');

        // Gabungkan tanggal unik
        $allDates = $dokterCounts->keys()
            ->merge($pasienCounts->keys())
            ->merge($antrianCounts->keys())
            ->unique()
            ->sort();

        $counts = $allDates->map(function ($date) use ($pasienCounts, $antrianCounts) {
            return [
                'date'    => $date,
                'pasien'  => $pasienCounts->get($date, 0),
                'antrian' => $antrianCounts->get($date, 0),
            ];
        })->values();

        return response()->json([
            'reports' => array_merge($totals, [
                'topDokter'               => $topDokter,
                'AntrianstatusCount'      => $antrianStatusCount,
                'DokterstatusCount'       => $dokterStatusCount,
                'JenisKelaminPasienCount' => $jenisKelaminPasien,
                'JenisKelaminDokterCount' => $jenisKelaminDokter,
                'countsByDate'            => $counts,
            ]),
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
