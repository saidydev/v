<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'check_number' => 113926612,
            'email' => 'admin@venueyangu.com',
            'role' => 'Admin',
            'password' => Hash::make('Admin@12345'),
        ]);
    }
}