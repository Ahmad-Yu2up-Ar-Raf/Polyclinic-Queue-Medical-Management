<?php

// app/Http/Resources/PoliMonitorResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PoliMonitorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Di dalam PoliMonitorResource.php
        return [
            'id'             => $this->id,
            'nama'           => $this->nama,
            'total_antrian'  => $this->antrian_count, // sesuaikan dengan dengan nama relasi tunggal
            'antrian_tunggu' => AntrianResource::collection($this->whenLoaded('antrian')), // pakai 'antrian', bukan 'antrians'
        ];
    }
}
