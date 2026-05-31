<?php

namespace Database\Seeders;

use App\Models\Poli;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PoliSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $data = [
            [
                "nama" => "Poli Anak",
                "kode" => "ANK",
                "ruangan" => "120-203",
            ],
            [
                "nama" => "Poli Tulang",
                "kode" => "TAG",
                "ruangan" => "670-903",
            ],
            [
                "nama" => "Poli Gigi",
                "kode" => "GIG",
                "ruangan" => "520-403",
            ],
            [
                "nama" => "Poli Mata",
                "kode" => "MTA",
                "ruangan" => "220-103",
            ],
        ];


        foreach ($data as $itme => $poli) {
            # code...
            Poli::create($poli);
        }
    }
}
