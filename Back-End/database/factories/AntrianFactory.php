<?php

namespace Database\Factories;

use App\Enums\MetodePembayaranEnum;
use App\Models\Antrian;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory  as Faker;

/**
 * @extends Factory<Antrian>
 */
class AntrianFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $faker = Faker::create('id_ID');
        return [
            //
            'metode_pembayaran' => $faker->randomElement(MetodePembayaranEnum::cases()),
            'deskripsi' => $faker->sentence()
        ];
    }
}
