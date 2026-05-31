<?php

namespace Database\Factories;

use App\Enums\DokterStatusEnum;
use App\Enums\JenisKelaminEnum;
use App\Models\Dokter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Dokter>
 */
class DokterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // 1. Siapkan data dinamis agar hasil acakan terasa natural
        $spesialisasi = [
            'Penyakit Dalam',
            'Anak',
            'Kandungan dan Kebidanan',
            'Bedah Umum',
            'Jantung dan Pembuluh Darah',
            'Mata',
            'THT-KL',
            'Saraf',
            'Kulit dan Kelamin',
            'Orthopedi'
        ];

        $universitas = [
            'Universitas Indonesia',
            'Universitas Gadjah Mada',
            'Universitas Airlangga',
            'Universitas Padjadjaran',
            'Universitas Diponegoro',
            'Universitas Brawijaya',
            'Universitas Hasanuddin'
        ];

        $fokusKeahlian = [
            'penanganan kasus-kasus kompleks dan kritis',
            'pelayanan medis holistik dan berpusat pada pasien',
            'edukasi kesehatan preventif secara komprehensif',
            'tindakan bedah minimal invasif',
            'penerapan teknologi medis terkini untuk diagnosis akurat'
        ];

        // 2. Acak datanya menggunakan $this->faker bawaan dari class Factory
        $spesialis = $this->faker->randomElement($spesialisasi);
        $kampus = $this->faker->randomElement($universitas);
        $fokus = $this->faker->randomElement($fokusKeahlian);
        $pengalaman = $this->faker->numberBetween(5, 30); // Random pengalaman 5 sampai 30 tahun

        // 3. Rangkai menjadi paragraf biografi yang panjang dan profesional
        $paragraf1 = "Beliau adalah seorang Dokter Spesialis {$spesialis} yang berdedikasi tinggi dengan pengalaman klinis selama lebih dari {$pengalaman} tahun. Menyelesaikan pendidikan kedokteran dan spesialisnya di {$kampus}, beliau terus aktif memperbarui ilmu medisnya dengan mengikuti berbagai simposium dan pelatihan, baik di tingkat nasional maupun internasional.";

        $paragraf2 = "Dalam praktik sehari-harinya, beliau memiliki ketertarikan khusus pada {$fokus}. Beliau dikenal sebagai sosok praktisi medis yang ramah, komunikatif, dan sangat mengutamakan kenyamanan serta keselamatan pasiennya selama proses penyembuhan.";

        $paragraf3 = "Saat ini, beliau juga tercatat sebagai anggota aktif Ikatan Dokter Indonesia (IDI) dan asosiasi profesi spesialis terkait. Komitmennya adalah memberikan layanan kesehatan terbaik yang inklusif dan mudah diakses oleh seluruh lapisan masyarakat.";

        // Gabungkan paragraf dengan double enter (\n\n) agar rapi jika dirender di HTML menggunakan nl2br()
        $deskripsiPanjang = $paragraf1 . "\n\n" . $paragraf2 . "\n\n" . $paragraf3;

        return [
            // 'nama' => $this->faker->name(), // Jangan lupa uncomment ini kalau modelmu butuh nama
            'status' => $this->faker->randomElement(DokterStatusEnum::cases()),
            'jenis_kelamin' => $this->faker->randomElement(JenisKelaminEnum::cases()),
            'deskripsi' => $deskripsiPanjang,
        ];
    }
}
