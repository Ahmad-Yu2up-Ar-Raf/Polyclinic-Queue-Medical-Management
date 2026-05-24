<?php

namespace Database\Seeders;

use App\Models\Dokter;
use App\Models\Jadwal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $dokters = Dokter::all();

        if ($dokters->isEmpty()) {
            $this->command->warn("Tidak ada data dokter");
            return;
        }


        Jadwal::factory()->count(20)->create()->each(function ($jadwal) use ($dokters) {
            $dokteAcak  = $dokters->random(rand(1, 2))->pluck('id');
            $jadwal->dokter()->attach($dokteAcak);
        });
    }
}
