<?php

namespace Database\Seeders;

use App\Enums\HariEnum;
use App\Models\Dokter;
use App\Models\Jadwal;
use Illuminate\Database\Seeder;

class JadwalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dokters = Dokter::all();

        if ($dokters->isEmpty()) {
            $this->command->warn("Tidak ada data dokter. Jalankan DokterSeeder dulu bro!");
            return;
        }

        $semuaHari = HariEnum::cases();

        foreach ($semuaHari as $hari) {

            // PENTING: Namanya dibikin unik pakai tambahan nama hari
            $jadwalPagi = Jadwal::factory()->create([
                'nama' => 'Shift Pagi - ' . $hari->value,
                'hari' => $hari->value,
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
            ]);

            $jadwalSore = Jadwal::factory()->create([
                'nama' => 'Shift Sore - ' . $hari->value,
                'hari' => $hari->value,
                'jam_mulai' => '13:00:00',
                'jam_selesai' => '17:00:00',
            ]);

            $dokterPagiIds = [];
            $dokterSoreIds = [];

            foreach ($dokters as $dokter) {
                if (rand(0, 1) === 1) {
                    $dokterPagiIds[] = $dokter->id;
                } else {
                    $dokterSoreIds[] = $dokter->id;
                }
            }

            $jadwalPagi->dokter()->sync($dokterPagiIds);
            $jadwalSore->dokter()->sync($dokterSoreIds);
        }

        $this->command->info('Jadwal seeder berhasil dibuat! Semua dokter sekarang punya jadwal di setiap hari.');
    }
}
