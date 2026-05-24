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

        User::factory()->count(50)->create()->each(function ($user) {
            $user->syncRoles(RoleEnum::PASIEN->value);
            Pasien::factory()->create([
                'user_id' => $user->id,
                'nama' => $user->name ?? $user->nama,
            ]);
        });
    }
}
