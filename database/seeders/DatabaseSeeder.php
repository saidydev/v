<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'David Hossein Shekighenda',
                'check_number' => 9536221,
                'email' => 'shekighendadavid@gmail.com',
                'role' => 'Teacher',
                'password' => 'Shekighenda@12345',
            ],
            [
                'name' => 'Diana Daniel Kimaro',
                'check_number' => 113487806,
                'email' => 'dianakimaro83@gmail.com',
                'role' => 'Teacher',
                'password' => 'Kimaro@12345',
            ],
            [
                'name' => 'Elinisamehe Aminiel Yonaza',
                'check_number' => 113490183,
                'email' => 'elinisameheaminiel@gmail.com',
                'role' => 'Teacher',
                'password' => 'Yonaza@12345',
            ],
            [
                'name' => 'Jofrey Joseph Paulos',
                'check_number' => 113496976,
                'email' => 'paulosjofrey@gmail.com',
                'role' => 'Teacher',
                'password' => 'Paulos@12345',
            ],
            [
                'name' => 'Kulwa Mathias Bukwimba',
                'check_number' => 112429461,
                'email' => 'kulwamathias47@gmail.com',
                'role' => 'Teacher',
                'password' => 'Bukwimba@12345',
            ],
            [
                'name' => 'Nasoro Bakari Chedi',
                'check_number' => 113553024,
                'email' => 'nasorobakari2016@gmail.com',
                'role' => 'Teacher',
                'password' => 'Chedi@12345',
            ],
            [
                'name' => 'Neema Julius Kayombo',
                'check_number' => 113558277,
                'email' => 'kayomboneema311@gmail.com',
                'role' => 'Teacher',
                'password' => 'Kayombo@12345',
            ],
            [
                'name' => 'Neema Tluway Tsere',
                'check_number' => 113668615,
                'email' => 'tsereneema57@gmail.com',
                'role' => 'Teacher',
                'password' => 'Tsere@12345',
            ],
            [
                'name' => 'Samweli Elia Kitiku',
                'check_number' => 113680348,
                'email' => 'kitikusamweli185@gmail.com',
                'role' => 'Teacher',
                'password' => 'Kitiku@12345',
            ],
            [
                'name' => 'SENI LUCAS KITIME',
                'check_number' => 113487835,
                'email' => 'kitimes@yahoo.com',
                'role' => 'Teacher',
                'password' => 'Kitime@12345',
            ],
            [
                'name' => 'Zabdiel Buberwa Kamukulu',
                'check_number' => 111666516,
                'email' => 'ielzabd@yahoo.com',
                'role' => 'Teacher',
                'password' => 'Kamukulu@12345',
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                [
                    'check_number' => $userData['check_number'],
                ],
                [
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'role' => $userData['role'],
                    'password' => Hash::make($userData['password']),
                ]
            );
        }
    }
}
