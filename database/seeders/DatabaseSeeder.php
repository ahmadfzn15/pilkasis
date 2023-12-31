<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'password' => Hash::make('123123'),
            'role' => 'admin'
        ]);

        Candidate::create([
            'paslon' => '1',
            'ketua' => 'Ahmad Fauzan',
            'wakil' => 'Lusi Kuraisin',
            'visi' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt, quia quos suscipit facere impedit, porro eos nobis veritatis, magnam nesciunt! Pariatur sunt, natus provident maxime ducimus error adipisci eos!',
            'misi' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt, quia quos suscipit facere impedit, porro eos nobis veritatis, magnam nesciunt! Pariatur sunt, natus provident maxime ducimus error adipisci eos!'
        ]);

        Candidate::create([
            'paslon' => '2',
            'ketua' => 'Ahmad Fauzan',
            'wakil' => 'Lusi Kuraisin',
            'visi' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt, quia quos suscipit facere impedit, porro eos nobis veritatis, magnam nesciunt! Pariatur sunt, natus provident maxime ducimus error adipisci eos!',
            'misi' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt, quia quos suscipit facere impedit, porro eos nobis veritatis, magnam nesciunt! Pariatur sunt, natus provident maxime ducimus error adipisci eos!'
        ]);

        Candidate::create([
            'paslon' => '3',
            'ketua' => 'Ahmad Fauzan',
            'wakil' => 'Lusi Kuraisin',
            'visi' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt, quia quos suscipit facere impedit, porro eos nobis veritatis, magnam nesciunt! Pariatur sunt, natus provident maxime ducimus error adipisci eos!',
            'misi' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam incidunt, quia quos suscipit facere impedit, porro eos nobis veritatis, magnam nesciunt! Pariatur sunt, natus provident maxime ducimus error adipisci eos!'
        ]);
    }
}
