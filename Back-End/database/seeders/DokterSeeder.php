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
        //
        $photos = [
            'https://liveup-host.vercel.app/aset/istockphoto-174867075-612x612-removebg-preview.png',
            'https://liveup-host.vercel.app/aset/istockphoto-533445110-612x612-removebg-preview.png',
            'https://liveup-host.vercel.app/aset/istockphoto-175490103-612x612-removebg-preview.png',
        ];
        $polis = Poli::all();

        foreach ($polis as $index => $poli) {
            # code...
            $fotoTerpilih = $photos[$index % count($photos)];
            $user =  User::factory()->create();
            $user->syncRoles(RoleEnum::DOKTER->value);
            Dokter::factory()->create([
                'nama' => $user->name,
                'email' => $user->email ,
                'user_id' => $user->id,
                'poli_id' => $poli->id,
                'spesialisasi' => 'Spesialis' . str_replace('Poli ', '', $poli->nama),
                'foto' => $fotoTerpilih
            ]);
        }

        $this->command->info('Dokter seeder berhasil di buat');
    }
}
