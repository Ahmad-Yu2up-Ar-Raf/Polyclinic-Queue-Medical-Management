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
        $polis = Poli::with('dokter.jadwal')->get();
        $pasiens = Pasien::all();

        if ($pasiens->isEmpty()) {
            $this->command->warn('Bro, isi data Pasien dulu baru jalanin seeder antrian!');
            return;
        }

        // --- TRIKNYA DI SINI BRO ---
        // 1. Ambil spesifik Akun Utama yang udah dibikin di PasienSeeder
        $pasienUtama = Pasien::whereNama('yusuf')->first();

        // 2. Set target kuota (lebih dari 5 berarti minimal 6) dan bikin counternya
        $targetAntrianUtama = 6;
        $counterAntrianUtama = 0;
        // ---------------------------

        foreach ($polis as $poli) {

            $dokter = $poli->dokter->first();

            if (!$dokter) {
                $this->command->warn("Poli {$poli->nama} belum punya dokter. Antrian di-skip.");
                continue;
            }

            // $jadwalDokter = $dokter->jadwal;

            // if (!$jadwalDokter || $jadwalDokter->isEmpty()) {
            //     $this->command->warn("Dokter {$dokter->nama} di {$poli->nama} belum punya jadwal. Antrian di-skip.");
            //     continue;
            // }

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

                // $jadwalIdTerpilih = $jadwalDokter->random()->id;

                // --- 3. KONDISI LOCK ID PASIEN ---
                // Jika data Akun Utama ada dan kuotanya belum habis, prioritaskan dia dulu
                if ($pasienUtama && $counterAntrianUtama < $targetAntrianUtama) {
                    $pasienIdTerpilih = $pasienUtama->id;
                    $counterAntrianUtama++; // Tambah counter tiap kali Akun Utama dipakai
                } else {
                    // Kalau kuota Akun Utama udah aman (udah punya 6 antrian), baru digacha lagi
                    $pasienIdTerpilih = $pasiens->random()->id;
                }
                // ---------------------------------

                Antrian::factory()->create([
                    'nomor_urut'      => $nomor_urut,
                    'nomor_antrian'   => "{$poli->kode}-{$nomorTigaDigit}",
                    'poli_id'         => $poli->id,
                    'dokter_id'       => $dokter->id,
                    // 'jadwal_id'       => $jadwalIdTerpilih,
                    'pasien_id'       => $pasienIdTerpilih, // Sekarang pakai variabel penentu di atas
                    'status'          => $status,
                    'created_at'      => Carbon::now()->subHours(5)->addMinutes($nomor_urut * 2),
                    'updated_at'      => Carbon::now()->subHours(5)->addMinutes($nomor_urut * 2),
                ]);
            }
        }

        $this->command->info('Seeder Antrian sukses! Akun Utama dipastikan punya minimal 6 antrian.');
    }
}
