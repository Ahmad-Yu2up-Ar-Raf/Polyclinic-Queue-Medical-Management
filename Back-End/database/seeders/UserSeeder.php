<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $Admin =  User::factory()->create([
            'email' => 'admin@admin.com',
        ]);



        $Operator =  User::factory(5)->create()->each(function ($ope) {
            $ope->syncRoles(RoleEnum::OPERATOR->value);
        });


        $Admin->syncRoles(RoleEnum::ADMIN->value);
    }
}
