<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AntrianResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'nomor_antrian' => $this->nomor_antrian,
            'status'        => $this->status,
            'poli'          => [
                'nama'    => $this->whenLoaded('poli', fn() => $this->poli->nama),
                'ruangan' => $this->whenLoaded('poli', fn() => $this->poli->ruangan),
            ],
            // Data pasien & dokter bisa diatur agar lebih aman
            'pasien_nama'   => $this->whenLoaded('pasien', fn() => $this->pasien->nama),
            'dokter_nama'   => $this->whenLoaded('dokter', fn() => $this->dokter->nama),
            'created_at'    => $this->created_at,
        ];
    }
}
