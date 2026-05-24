<?php

namespace Database\Seeders;

use App\Enums\AntrianStatusEnum;
use App\Models\Antrian;
use App\Models\Pasien;
use App\Models\Poli;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AntrianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ubah 'dokters.jadwal' jadi 'dokter.jadwal' (sesuai nama fungsi di model Poli)
        $polis = Poli::with('dokter.jadwal')->get();
        $pasiens = Pasien::all();

        if ($pasiens->isEmpty()) {
            $this->command->warn('Bro, isi data Pasien dulu baru jalanin seeder antrian!');
            return;
        }

        foreach ($polis as $poli) {
            // 2. Ubah $poli->dokters menjadi $poli->dokter bro!
            $dokter = $poli->dokter->first();

            // Jika poliklinik belum ada dokternya, skip biar gak error bawahnya
            if (!$dokter) {
                $this->command->warn("Poli {$poli->nama} belum punya dokter. Antrian di-skip.");
                continue;
            }

            // 3. Ambil semua jadwal yang dimiliki oleh dokter ini
            $jadwalDokter = $dokter->jadwal;

            if (!$jadwalDokter || $jadwalDokter->isEmpty()) {
                $this->command->warn("Dokter {$dokter->nama} di {$poli->nama} belum punya jadwal. Antrian di-skip.");
                continue;
            }

            for ($i = 0; $i < 10; $i++) {
                $nomor_urut = $i + 1;
                $nomorTigaDigit = str_pad($nomor_urut, 3, "0", STR_PAD_LEFT);

                if ($nomor_urut <= 3) {
                    $status = AntrianStatusEnum::SELESAI;
                } elseif ($nomor_urut == 5) {
                    $status = AntrianStatusEnum::DIPANGGIL;
                } elseif ($nomor_urut == 4) {
                    $status = AntrianStatusEnum::DILEWATI;
                } else {
                    $status = AntrianStatusEnum::MENUNGGU;
                }

                $jadwalIdTerpilih = $jadwalDokter->random()->id;

                Antrian::factory()->create([
                    'nomor_antrian'     => "{$poli->kode}-{$nomorTigaDigit}",
                    'poli_id'           => $poli->id,
                    'dokter_id'         => $dokter->id,
                    'jadwal_id'         => $jadwalIdTerpilih, // Kemarin gw typo tulis 'jadwalIdTerpilled' nih bro, pastikan ini pakai huruf 'h' ya!
                    'pasien_id'         => $pasiens->random()->id,
                    'status'            => $status,
                    'created_at'        => Carbon::now()->subHours(5)->addMinutes($nomor_urut * 2),
                    'updated_at'        => Carbon::now()->subHours(5)->addMinutes($nomor_urut * 2),
                ]);
            }
        }

        $this->command->info('Seeder Antrian sukses! Sekarang timestamp dan jadwal_id aman.');
    }
}
