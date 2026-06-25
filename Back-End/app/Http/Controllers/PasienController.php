<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\Pasien\PasienStoreRequest;
use App\Http\Requests\Pasien\PasienUpdateRequest;
use App\Models\Antrian;
use App\Models\Pasien;
use App\Models\Poli;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PasienController extends Controller
{

    public function index(Request $request)
    {

        $search = $request->input('search');
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);


        $query = Pasien::query()->forWebsite();

        if ($search) {


            $query->where(function ($q) use ($search) {
                $searchLower = strtolower($search);

                $q->whereRaw('LOWER(nama) LIKE ?', ["%{$searchLower}%"])
                    ->orWhereRaw('LOWER(nik) LIKE ?', ["%{$searchLower}%"])
                    ->orWhereRaw('LOWER(alamat) LIKE ?', ["%{$searchLower}%"])
                ;
            });
        }

        $pasien = $query->paginate($perPage, ["*"], 'page', $page);

        return response()->json([
            'status' => true,
            'message' => 'Pasien retrieved successfully',
            'data'   => $pasien->items() ?? [],

            'meta' => [
                'filters' => [
                    'search' => $search ?? '',
                ],
                'pagination' => [
                    'total' => $pasien->total(),
                    'currentPage' => $pasien->currentPage(),
                    'perPage' => $pasien->perPage(),
                    'lastPage' => $pasien->lastPage(),
                    'hasMore' => $pasien->currentPage() < $pasien->lastPage(),
                ],
            ],
        ], 200);
    }




    public function store(PasienStoreRequest $request)
    {

        $user = $request->user();
        $validated = $request->validated();
        $isPasien = $user->hasRole(RoleEnum::PASIEN->value);

        if ($isPasien) {
            $validated["user_id"] = $user->id;
        }

        $store = Pasien::create($validated);
        return response()->json([
            'succes' => true
        ], 201);
    }


    public function show(Pasien $pasien)
    {
        $pasien->loadCount(['antrian']);
        return response()->json([
            'data' => $pasien
        ]);
    }

    public function update(PasienUpdateRequest $request, Pasien $pasien)
    {

        $validated = $request->validated();
        $pasien->update($validated);

        return response()->json([
            'succes' => true
        ], 200);
    }




    public function select(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;

        $isPasien = $user->hasRole(RoleEnum::PASIEN->value);
        $query = Pasien::select('id', 'nama', 'nik');

        if ($isPasien) {
            $query->where('user_id', $userId);
        }


        $pasien = $query->get();
        return response()->json([
            'status'  => true,
            'message' => 'Pasiens retrieved successfully',
            'data'    => $pasien, // Tidak perlu ->items() jika tidak pakai paginate
        ]);
    }




    public function destroy(Pasien $pasien)
    {

        $pasien->delete($pasien->id);

        return response()->json([
            'success' => true,
            'message' => 'Data pasien berhasil dihapus'
        ], 200);
    }
}
