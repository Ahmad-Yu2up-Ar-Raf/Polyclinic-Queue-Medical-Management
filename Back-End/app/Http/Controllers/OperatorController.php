<?php

namespace App\Http\Controllers;

use App\Enums\AntrianStatusEnum;
use App\Models\Antrian;
use App\Models\Poli;
use Illuminate\Http\Request;

class OperatorController extends Controller
{

    public function index(Poli $poli, Request $request)
    {
        $poliId = $poli->id;
        $search = $request->input('search');
        $limit_menunggu = $request->input('limit_menunggu', 5);
        $limit_selesai = $request->input('limit_selesai', 5);
        $limit_dilewati = $request->input('limit_dilewati', 5);

        // Filter Query Pencarian Reusable
        $applySearch = function ($query) use ($search) {
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $searchLower = strtolower($search);
                    $q->whereRaw("LOWER(nomor_antrian) LIKE ?", ["%{$searchLower}%"])
                        ->orWhereHas('pasien', function ($pasienQuery) use ($searchLower) {
                            $pasienQuery->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"])
                                ->orWhereRaw("LOWER(nik) LIKE ?", ["%{$searchLower}%"]);
                        })
                        ->orWhereHas('dokter', function ($dokterQuery) use ($searchLower) {
                            $dokterQuery->whereRaw("LOWER(nama) LIKE ?", ["%{$searchLower}%"]);
                        });
                });
            }
        };

        // Antrian yang sedang dipanggil (Tetap)
        $antrianDipanggil = Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::DIPANGGIL->value)
            ->first();

        // 1. Cari tahu dulu ID Antrian Selanjutnya yang SEHARUSNYA (Tanpa filter search)
        $absoluteNext = Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::MENUNGGU->value)
            ->orderBy('id', 'asc')
            ->first();

        $absoluteNextId = $absoluteNext?->id;

        // 2. Tentukan Antrian Berikutnya (Hanya muncul jika cocok dengan search)
        $antrianBerikutnya = null;
        if ($absoluteNextId) {
            $antrianBerikutnya = Antrian::query()
                ->forOperator()
                ->where('id', $absoluteNextId)
                ->where(function ($query) use ($applySearch) {
                    $applySearch($query);
                })
                ->first();
        }

        // 3. Tentukan Antrian Berjalan (Kecualikan ID dari Antrian Berikutnya agar TIDAK PERLU skip(1))
        $antrianMenunggu = Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::MENUNGGU->value)
            ->when($absoluteNextId, function ($query, $id) {
                return $query->where('id', '!=', $id);
            })
            ->where(function ($query) use ($applySearch) {
                $applySearch($query);
            })
            ->orderBy('id', 'asc')
            ->take($limit_menunggu)
            ->get();

        // Antrian Selesai
        $antrianSelesai = Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::SELESAI->value)
            ->where(function ($query) use ($applySearch) {
                $applySearch($query);
            })
            ->orderBy('id', 'asc')
            ->take($limit_selesai)
            ->get();

        // Antrian Dilewati
        $antrianDilewati = Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::DILEWATI->value)
            ->where(function ($query) use ($applySearch) {
                $applySearch($query);
            })
            ->orderBy('id', 'asc')
            ->limit($limit_dilewati)
            ->get();

        return response()->json([
            'data' => [
                'poli' => $poli,
                'antrian_dipanggil' => $antrianDipanggil,
                'antrian_berikutnya' => $antrianBerikutnya,
                'antrian_menunggu' => $antrianMenunggu,
                'antrian_selesai' => $antrianSelesai,
                'antrian_dilewati' => $antrianDilewati,
            ],
        ], 200);
    }


    public function show(Poli $poli, AntrianStatusEnum $status, Request $request)
    {
        $poliId = $poli->id;
        $search = $request->input('search');
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);


        $query =  Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus($status)
            ->orderBy('id', 'desc');




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

        $antrian = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'status' => true,
            'message' => 'Antrian retrieved successfully',
            'data' =>  [
                'antrian' => $antrian->items() ?? [],
                'poli' => $poli ?? null,
            ],
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


    public function next(AntrianStatusEnum $status, string $id)
    {

        if (!in_array($status, [AntrianStatusEnum::SELESAI, AntrianStatusEnum::DILEWATI])) {
            return response()->json([
                'success' => false,
                'message' => 'Status tidak diizinkan untuk aksi ini.'
            ], 422);
        }

        Antrian::query()
            ->wherePoliId($id)
            ->whereStatus(AntrianStatusEnum::DIPANGGIL->value)
            ->update([
                'status' => $status->value
            ]);


        $antrianBerikutnya = Antrian::query()
            ->wherePoliId($id)
            ->whereStatus(AntrianStatusEnum::MENUNGGU->value)
            ->orderBy('id', 'asc')
            ->first();

        if ($antrianBerikutnya) {
            $antrianBerikutnya->update([
                'status' => AntrianStatusEnum::DIPANGGIL->value
            ]);
        }


        return response()->json([
            'succes' => true,
            'message' => 'Antrian berhasil diperbarui.'
        ], 200);
    }
}
