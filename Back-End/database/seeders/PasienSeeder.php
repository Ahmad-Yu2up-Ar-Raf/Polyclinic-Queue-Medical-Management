<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Pasien;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PasienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menyebarkan 20 pasien dalam rentang waktu yang rapi mulai hari ini
        for ($index = 0; $index < 20; $index++) {

            // Pasien didistribusikan pendaftarannya dalam beberapa hari ke depan
            $daysToAdd = intdiv($index, 2);
            $waktuPembuatan = Carbon::today()
                ->addDays($daysToAdd)
                ->addHours(rand(8, 16))
                ->addMinutes(rand(1, 59));

            $user = User::factory()->create([
                'created_at' => $waktuPembuatan,
                'updated_at' => $waktuPembuatan,
            ]);

            // Jika indeks 0, kunci data utamanya milik Yusuf
            if ($index === 0) {
                $user->update([
                    'name' => 'yusuf',
                    'email' => 'pasien@gmail.com',
                    'password' => bcrypt('password'),
                ]);
            }

            $user->syncRoles(RoleEnum::PASIEN->value);

            Pasien::factory()->create([
                'user_id'    => $user->id,
                'nama'       => $user->name ?? $user->nama,
                'created_at' => $waktuPembuatan,
                'updated_at' => $waktuPembuatan,
            ]);
        }
    }
}
