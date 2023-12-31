<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 20)->nullable()->unique()->comment("Hanya untuk pemilih");
            $table->enum('status', ['sudah memilih', 'belum memilih', '-'])->default("belum memilih");
            $table->string('username')->nullable()->unique()->comment("Hanya untuk admin");
            $table->string('password')->nullable()->comment("Hanya untuk admin");;
            $table->enum("role", ["pemilih", "admin"])->default("pemilih");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
