<?php

namespace App\Http\Controllers;

use App\Enums\AntrianStatusEnum;
use App\Http\Resources\AntrianResource;
use App\Http\Resources\PoliMonitorResource;
use App\Models\Antrian;
use App\Models\Poli;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MonitorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $sortBy = $request->query('sort_by', 'created_at');
        $sortDir = $request->query('sort_dir', 'asc');

        // 1. Ambil Antrian yang sedang dipanggil (Sudah Aman)
        $antrianDipanggil = Antrian::query()
            ->with(['pasien', 'poli', 'dokter'])
            ->where('status', AntrianStatusEnum::DIPANGGIL->value)
            ->orderBy($sortBy, $sortDir)
            ->get();

        // 2. Logic: Ambil Poli beserta antrian yang masih menunggu (FIXED)
        $antrianPoli = Poli::query()
            ->whereHas('antrian', function ($query) {
                // FIX: Gunakan Enum di sini agar konsisten menggunakan lowercase 'menunggu'
                $query->where('status', AntrianStatusEnum::MENUNGGU->value);
            })
            ->withCount([
                'antrian' => function ($query) {
                    $query->whereIn('status', [AntrianStatusEnum::MENUNGGU->value, AntrianStatusEnum::DIPANGGIL->value]);
                }
            ])
            ->with([
                'antrian' => function ($query) use ($sortBy, $sortDir) {
                    $query->with(['pasien', 'dokter'])
                        ->where('status', AntrianStatusEnum::MENUNGGU->value)
                        ->orderBy($sortBy, $sortDir)
                        ->limit(5);
                }
            ])
            ->get();

        return response()->json([
            'meta' => [
                'terminal_id' => 'MN-01',
                'timestamp'   => now()->toIso8601String(),
            ],
            'data' => [
                'dipanggil' => AntrianResource::collection($antrianDipanggil),
                'poli'      => PoliMonitorResource::collection($antrianPoli),
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
