<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Dokter;
use App\Models\Poli;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DokterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $photos = [
            'https://www.pngarts.com/files/3/Doctor-PNG-Download-Image.png',

            'https://www.pngarts.com/files/3/Doctor-PNG-Photo.png',
            'https://png.pngtree.com/png-clipart/20250209/original/pngtree-the-old-male-doctor-was-smiling-png-image_19567171.png',

            'https://png.pngtree.com/png-clipart/20240912/original/pngtree-smiling-black-male-doctor-holding-clipboard-png-image_15998270.png',

            'https://png.pngtree.com/png-clipart/20250728/original/pngtree-female-doctor-smiling-with-stethoscope-isolated-on-transparent-background-png-image_21320154.png',
            'https://png.pngtree.com/png-vector/20240201/ourmid/pngtree-the-lab-doctor-smiles-png-image_11526321.png',
            'https://png.pngtree.com/png-vector/20240515/ourmid/pngtree-photo-muslim-doctor-physician-chest-smiling-png-image_12381056.png',
            'https://png.pngtree.com/png-vector/20240103/ourmid/pngtree-portrait-of-a-young-beautiful-woman-doctor-isolated-on-white-png-image_11398209.png',
            'https://png.pngtree.com/png-vector/20250415/ourmid/pngtree-young-female-doctor-smiling-and-looking-at-camera-png-image_15971050.png',
            'https://png.pngtree.com/png-vector/20240705/ourmid/pngtree-portrait-of-smiling-female-doctor-standing-against-png-image_12848802.png',
            'https://png.pngtree.com/png-vector/20250813/ourmid/pngtree-professional-asian-indonesian-female-doctor-portrait-with-simple-pose-and-smile-png-image_17150761.webp',
            'https://png.pngtree.com/png-clipart/20240220/original/pngtree-portrait-of-a-smiling-handsome-male-doctor-man-png-image_14366794.png',
            'https://png.pngtree.com/png-clipart/20240323/original/pngtree-professional-doctor-with-stethoscope-png-image_14659597.png',
            'https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png',
            'https://png.pngtree.com/png-clipart/20240328/original/pngtree-doctor-and-health-care-png-image_14702173.png',
            'https://png.pngtree.com/png-clipart/20240323/original/pngtree-professional-doctor-with-stethoscope-png-image_14666123.png',
            'https://png.pngtree.com/png-clipart/20250111/original/pngtree-smiling-male-doctor-in-white-coat-and-stethoscope-arms-crossed-professional-png-image_19848286.png',
            'https://png.pngtree.com/png-clipart/20240406/original/pngtree-male-doctor-photo-png-image_14764635.png',
            'https://png.pngtree.com/png-clipart/20240220/original/pngtree-portrait-of-a-smiling-handsome-male-doctor-man-png-image_14366794.png',
            'https://png.pngtree.com/png-clipart/20250420/original/pngtree-confident-asian-doctor-with-arms-crossed-png-image_20829096.png',
            'https://png.pngtree.com/png-clipart/20250419/original/pngtree-young-asian-doctor-smiling-png-image_20827705.png',

            'https://png.pngtree.com/png-clipart/20240511/original/pngtree-female-person-with-stethoscope-depicting-lady-doctor-png-image_15064743.png',
            'https://png.pngtree.com/png-clipart/20250525/original/pngtree-smiling-female-doctor-with-stethoscope-isolated-on-transparent-background-png-image_21078910.png',

            'https://png.pngtree.com/png-clipart/20250104/original/pngtree-a-female-doctor-png-image_19258040.png',
            'https://png.pngtree.com/png-clipart/20240417/original/pngtree-female-doctor-at-medical-office-wearing-stethoscope-and-lab-coat-in-png-image_14871218.png',
            'https://png.pngtree.com/png-clipart/20250711/original/pngtree-muslim-female-doctor-with-stethoscope-png-image_21303513.png',
            'https://png.pngtree.com/png-clipart/20240328/original/pngtree-smiling-doctor-give-medical-paper-png-image_14701945.png'
        ];

        // 1. Acak urutan array-nya sekali saja sebelum loop
        shuffle($photos);

        $polis = Poli::all();
        $photoIndex = 0; // Pointer untuk mengambil foto

        foreach ($polis as $poli) {
            for ($i = 0; $i < 5; $i++) {
                $user = User::factory()->create();
                $user->syncRoles(RoleEnum::DOKTER->value);

                // 2. Ambil foto berdasarkan index, lalu increment index-nya
                $foto = $photos[$photoIndex % count($photos)];
                $photoIndex++;

                Dokter::factory()->create([
                    'nama' => 'dr. ' . $user->name,
                    'email' => $user->email,
                    'user_id' => $user->id,
                    'poli_id' => $poli->id,
                    'spesialisasi' => 'Spesialis ' . str_replace('Poli ', '', $poli->nama),
                    'foto' => $foto
                ]);
            }
        }
        $this->command->info('Dokter seeder berhasil dibuat dengan foto unik');
    }
}
