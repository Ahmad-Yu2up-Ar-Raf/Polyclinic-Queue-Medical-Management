<?php

namespace Database\Factories;

use App\Enums\JenisKelaminEnum;
use App\Models\Pasien;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

/**
 * @extends Factory<Pasien>
 */
class PasienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $faker = Faker::create('id_id');

        $jenis_kelamin = $faker->randomElement(JenisKelaminEnum::cases());

        $gender = $jenis_kelamin == JenisKelaminEnum::PRIA->value ? 'male' : 'female';
        return [
            //
            'nik' => $faker->unique()->numerify('################'),
            // 'nama' => $faker->name($gender),
            'no_hp' => $faker->phoneNumber(),
            'jenis_kelamin' => $jenis_kelamin,
            'tanggal_lahir' => $faker->date('Y-m-d', '-5 years'),
            'alamat' => $faker->address()
        ];
    }
}
