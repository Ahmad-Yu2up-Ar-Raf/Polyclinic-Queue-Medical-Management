<?php

use App\Enums\DokterStatusEnum;
use App\Enums\JenisKelaminEnum;
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
        Schema::create('dokters', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('poli_id')->constrained()->cascadeOnDelete();
            $table->string('nama')->unique();
            $table->string('email')->unique();
            $table->enum('jenis_kelamin', JenisKelaminEnum::cases())->nullable()->default(JenisKelaminEnum::PRIA->value);
            $table->enum('status', DokterStatusEnum::cases())->nullable()->default(DokterStatusEnum::AKTIF->value);
            $table->longText('deskripsi')->nullable();
            $table->string('spesialisasi');
            $table->string('foto')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokters');
    }
};
