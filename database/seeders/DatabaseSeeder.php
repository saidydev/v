<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'check_number' => 11223344,
            ],
            [
                'name' => 'Admin Midabangulo',
                'email' => 'midabangulo@gmail.com',
                'role' => 'Admin',
                'password' => Hash::make('Admin@12345'),
            ]
        );
    }
}
