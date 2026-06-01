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

        // Ambil data Yusuf secara spesifik
        $pasienUtama = Pasien::where('nama', 'yusuf')->first();

        // --- TRIK 1: POLA DATA NAIK TURUN (GAP 7 BULAN) ---
        // Kita petakan 10 antrian ke dalam offset bulan (0 = bulan ini, 6 = 7 bulan ke depan)
        // Perhatikan polanya: ada penumpukan di bulan ke-1, ke-3, dan ke-6 biar grafiknya naik-turun!
        $polaBulan = [0, 1, 1, 2, 3, 3, 4, 5, 6, 6];

        foreach ($polis as $poli) {

            $dokter = $poli->dokter->first();

            if (!$dokter) {
                $this->command->warn("Poli {$poli->nama} belum punya dokter. Antrian di-skip.");
                continue;
            }

            for ($i = 0; $i < 10; $i++) {
                $nomor_urut = $i + 1;
                $nomorTigaDigit = str_pad($nomor_urut, 3, "0", STR_PAD_LEFT);

                // --- ATURAN STATUS (1 DIPANGGIL PER POLI) ---
                // Setiap nomor urut 5 otomatis berstatus DIPANGGIL (Pas per poli cuma ada satu urutan 5)
                if ($nomor_urut <= 3) {
                    $status = AntrianStatusEnum::SELESAI;
                } elseif ($nomor_urut == 5) {
                    $status = AntrianStatusEnum::DIPANGGIL;
                } elseif ($nomor_urut == 4) {
                    $status = AntrianStatusEnum::DILEWATI;
                } else {
                    $status = AntrianStatusEnum::MENUNGGU;
                }

                // --- TRIK 2: INTERVENSI PASIEN YUSUF ---
                // Kita plot Yusuf di nomor urut 2 dan 5 di SETIAP POLI (3 Poli x 2 = 6 data mantap!)
                if ($pasienUtama && ($nomor_urut == 2 || $nomor_urut == 5)) {
                    $pasienTerpilih = $pasienUtama;
                } else {
                    // Ambil pasien random selain Yusuf agar variatif
                    $pasienTerpilih = $pasiens->where('id', '!=', $pasienUtama->id)->random();
                }

                // --- TRIK 3: MANIPULASI TANGGAL KRONOLOGIS ---
                // 1. Tentukan bulan kunjungan berdasarkan pola array berjarak 7 bulan
                $bulanOffset = $polaBulan[$i];
                $targetKunjungan = Carbon::today()
                    ->addMonths($bulanOffset)
                    ->addDays(rand(1, 28));

                // 2. Waktu booking tiket dibuat 1-3 hari sebelum jadwal kunjungan
                $waktuCreateAntrian = Carbon::parse($targetKunjungan)
                    ->subDays(rand(1, 3))
                    ->addHours(rand(8, 15));

                // 3. SAFE GUARD: Pastikan waktu buat antrian TIDAK MENDAHULUI register usernya
                if ($waktuCreateAntrian->lt(Carbon::parse($pasienTerpilih->created_at))) {
                    $waktuCreateAntrian = Carbon::parse($pasienTerpilih->created_at)->addMinutes(rand(15, 45));
                }

                // 4. Pastikan jadwal kunjungan kembali logis setelah terkena safe guard
                $jadwalKunjunganFinal = Carbon::parse($targetKunjungan)->lt($waktuCreateAntrian)
                    ? Carbon::parse($waktuCreateAntrian)->addDay()->format('Y-m-d')
                    : $targetKunjungan->format('Y-m-d');

                Antrian::factory()->create([
                    'nomor_urut'       => $nomor_urut,
                    'nomor_antrian'    => "{$poli->kode}-{$nomorTigaDigit}",
                    'poli_id'          => $poli->id,
                    'dokter_id'        => $dokter->id,
                    'pasien_id'        => $pasienTerpilih->id,
                    'status'           => $status,
                    'jadwal_kunjungan' => $jadwalKunjunganFinal,
                    'created_at'       => $waktuCreateAntrian,
                    'updated_at'       => $waktuCreateAntrian,
                ]);
            }
        }

        $this->command->info('Seeder Antrian sukses besar! Gap 7 bulan fluktuatif, Yusuf terbagi rata, dan status panggilan aman.');
    }
}
