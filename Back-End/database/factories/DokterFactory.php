<?php

namespace Database\Factories;

use App\Enums\DokterStatusEnum;
use App\Enums\JenisKelaminEnum;
use App\Models\Dokter;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

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
        $faker = Faker::create('id_id');
        return [
            //
            // 'nama' => $faker->name(),
            'status' => $faker->randomElement(DokterStatusEnum::cases()),
            'jenis_kelamin' => $faker->randomElement(JenisKelaminEnum::cases()),
            'deskripsi' => $faker->sentence(),
        ];
    }
}
