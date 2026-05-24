<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        $permissions = [
            'Antrian.view',
            'Antrian.create',
            'Antrian.update',
            'Antrian.delete',

            "Operator.antrian",

            'Pasien.view',
            'Pasien.create',
            'Pasien.update',
            'Pasien.delete',

            'Dokter.view',
            'Dokter.create',
            'Dokter.update',
            'Dokter.delete',


            'Jadwal.view',
            'Jadwal.create',
            'Jadwal.update',
            'Jadwal.delete',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }


        $AdminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN->value, 'guard_name' => 'web']);
        $OperatorRole = Role::firstOrCreate(['name' => RoleEnum::OPERATOR->value, 'guard_name' => 'web']);
        $DokterRole = Role::firstOrCreate(['name' => RoleEnum::DOKTER->value, 'guard_name' => 'web']);
        $PasienRole = Role::firstOrCreate(['name' => RoleEnum::PASIEN->value, 'guard_name' => 'web']);


        $AdminRole->syncPermissions($permissions);

        $PasienRole->syncPermissions([
            'Antrian.create',
            'Antrian.delete',
            'Antrian.update',

            'Pasien.create',

            'Jadwal.view',

            'Antrian.view',

            "Dokter.view"
        ]);



        $DokterRole->syncPermissions([

            'Jadwal.view',

            'Antrian.view',


        ]);



        $OperatorRole->syncPermissions([
            'Antrian.create',
            'Antrian.delete',
            'Antrian.update',
            "Operator.antrian",

        ]);
    }
}
