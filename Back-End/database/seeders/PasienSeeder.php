<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Pasien;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PasienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $users = User::factory()->count(20)->create();

        foreach ($users as $index => $user) {
            // Jika ini adalah data pertama (indeks 0), timpa datanya
            if ($index === 0) {
                $user->update([
                    'name' => 'yusuf',
                    'email' => 'pasien@gmail.com',
                    'password' => bcrypt('password'), // Opsional jika ingin password khusus
                ]);
            }

            $user->syncRoles(RoleEnum::PASIEN->value);

            Pasien::factory()->create([
                'user_id' => $user->id,
                'nama' => $user->name ?? $user->nama,
            ]);
        }
    }
}
