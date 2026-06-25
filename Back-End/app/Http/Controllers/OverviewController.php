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
        // 1. Ambil Total Keseluruhan (Sangat Ringan, Langsung Hitung di DB)
        $totals = [
            'totalDokter'  => Dokter::count(),
            'totalPasien'  => Pasien::count(),
            'totalAntrian' => Antrian::count(),
            'totalPoli'    => Poli::count(),
        ];

        // 2. Grouping & Counting Langsung via SQL menggunakan pluck()
        $dokterStatusCount = Dokter::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $jenisKelaminDokter = Dokter::selectRaw('jenis_kelamin, count(*) as count')
            ->groupBy('jenis_kelamin')
            ->pluck('count', 'jenis_kelamin');

        $jenisKelaminPasien = Pasien::selectRaw('jenis_kelamin, count(*) as count')
            ->groupBy('jenis_kelamin')
            ->pluck('count', 'jenis_kelamin');

        $antrianStatusCount = Antrian::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        // 3. Ambil Top 5 Dokter (Sudah Benar)
        $topDokter = Dokter::select('id', 'nama')
            ->withCount('antrian')
            ->orderByDesc('antrian_count')
            ->take(5)
            ->get();

        // 4. Data Statistik per Tanggal (Pakai selectRaw agar lebih bersih)
        $pasienDates = Pasien::selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')->pluck('count', 'date');

        $antrianDates = Antrian::selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')->pluck('count', 'date');

        $dokterDates = Dokter::selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')->pluck('count', 'date');

        $poliDates = Poli::selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')->pluck('count', 'date');

        // 5. Menggabungkan Tanggal Unik Secara Efisien
        $allDates = collect([])
            ->merge($pasienDates->keys())
            ->merge($antrianDates->keys())
            ->merge($dokterDates->keys())
            ->merge($poliDates->keys())
            ->unique()
            ->sort();

        // 6. Mapping Data Statistik
        $countsByDate = $allDates->map(function ($date) use ($pasienDates, $antrianDates) {
            return [
                'date'    => $date,
                'pasien'  => $pasienDates->get($date, 0),
                'antrian' => $antrianDates->get($date, 0),
            ];
        })->values();

        // 7. Kembalikan Response
        return response()->json([
            'reports' => array_merge($totals, [
                'topDokter'               => $topDokter,
                'AntrianstatusCount'      => $antrianStatusCount,
                'DokterstatusCount'       => $dokterStatusCount,
                'JenisKelaminPasienCount' => $jenisKelaminPasien,
                'JenisKelaminDokterCount' => $jenisKelaminDokter,
                'countsByDate'            => $countsByDate,
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
