<?php

namespace Database\Factories;

use App\Enums\HariEnum;
use App\Models\Jadwal;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

/**
 * @extends Factory<Jadwal>
 */
class JadwalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create('id_ID');

        $hari = $faker->randomElement(HariEnum::cases());

        $jamMulai  = $faker->dateTimeBetween('05:00:00', '15:00:00');


        $durasi = rand(3, 5);

        $jamSelesai = Carbon::instance($jamMulai)->addHours($durasi);

        return [
            //
            'nama' => 'Jadwal ' . $faker->unique()->sentence(2),
            'hari' => $hari,
            'jam_mulai' => $jamMulai->format('H:i'),
            'jam_selesai' => $jamSelesai->format('H:i'),
        ];
    }
}
