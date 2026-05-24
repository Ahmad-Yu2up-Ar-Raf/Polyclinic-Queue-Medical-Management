<?php

namespace App\Http\Controllers;

use App\Http\Requests\Poli\PoliStoreRequest;
use App\Http\Requests\Poli\PoliUpdateRequest;
use App\Models\Poli;
use Illuminate\Http\Request;

class PoliController extends Controller
{

    public function index(Request $request)
    {

        $search = $request->input('search');
        $perPage = $request->input('perPage');
        $page = $request->input('page');

        $query = Poli::query()->forWebsite();


        if ($search) {
            $query->where(function ($q) use ($search) {
                $searchLower = strtolower($search);
                $q->whereRaw("LOWER(nama) LIKE ? ", ["%{$searchLower}%"])
                    ->orWhereRaw("LOWER(kode) LIKE ? ", ["%{$searchLower}%"])
                    ->orWhereRaw("LOWER(ruangan) LIKE ? ", ["%{$searchLower}%"])
                ;
            });
        }


        $polis = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'status' => true,
            'message' => 'Polis retrieved successfully',
            'data'   => $polis->items() ?? [],
            'meta' => [
                'filters' => [
                    'search' => $search ?? '',
                ],
                'pagination' => [
                    'total' => $polis->total(),
                    'currentPage' => $polis->currentPage(),
                    'perPage' => $polis->perPage(),
                    'lastPage' => $polis->lastPage(),
                    'hasMore' => $polis->currentPage() < $polis->lastPage(),
                ],
            ],
        ]);
    }


    public function store(PoliStoreRequest $request)
    {
        $validate =   $request->validated();

        $validate['kode'] = $this->generateKode($validate['nama']);
        $polis = Poli::create($validate);

        return response()->json([
            'succes' => true
        ], 201);
    }


    public function show(Poli $poli)
    {
        $poli->loadCount(['dokter', 'antrian']);
        return response()->json([
            'data' => $poli
        ]);
    }



    private function generateKode(string $nama): string
    {
        $namaClean = strtoupper(str_replace('Poli ', '', $nama));
        $kodeBase = substr(preg_replace('/[^A-Z]/', '', $namaClean), 0, 3);

        if (strlen($kodeBase) < 3) {
            $kodeBase = str_pad($kodeBase, 3, 'X');
        }

        $kode = $kodeBase;
        $counter = 1;

        while (Poli::query()->where('kode', $kode)->exists()) {
            $kode = substr($kodeBase, 0, 2) . $counter;
            $counter++;
        }

        return $kode;
    }

    public function update(PoliUpdateRequest $request, Poli $poli)
    {


        $validated = $request->validated();



        if ($poli->nama !== $validated["nama"]) {
            $validated['kode'] = $this->generateKode($validated['nama']);
        } else {
            $validated['kode'] = $poli->kode;
        }



        $poli->update($validated);

        return response()->json([
            'succes' => true
        ], 200);
    }


    public function destroy(Poli $poli)
    {
        $poli->delete($poli->id);

        return response()->json([
            'succes' => true
        ], 204);
    }
}
