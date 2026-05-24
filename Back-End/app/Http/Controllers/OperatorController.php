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
        $limit_menunggu = $request->input('limit_menunggu', 5);
        $limit_selesai = $request->input('limit_selesai', 5);
        $limit_dilewati = $request->input('limit_dilewati', 5);


        $antrianDipanggil =  Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::DIPANGGIL->value)
            ->first();

        $antrianBerikutnya =  Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::MENUNGGU->value)
            ->orderBy('id', 'asc')
            ->first();


        $antrianMenunggu =  Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::MENUNGGU->value)
            ->skip(1)
            ->orderBy('id', 'desc')
            ->take($limit_menunggu)
            ->get();


        $antrianSelesai =  Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::SELESAI->value)
            ->orderBy('id', 'desc')
            ->take($limit_selesai)
            ->get();



        $antrianDilewati =  Antrian::query()
            ->forOperator()
            ->wherePoliId($poliId)
            ->whereStatus(AntrianStatusEnum::DILEWATI->value)
            ->orderBy('id', 'desc')
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
