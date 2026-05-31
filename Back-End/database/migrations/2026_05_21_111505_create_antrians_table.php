<?php

use App\Enums\AntrianStatusEnum;
use App\Enums\MetodePembayaranEnum;
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
        Schema::create('antrians', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('poli_id')->constrained()->cascadeOnDelete();
            $table->foreignId('pasien_id')->constrained()->cascadeOnDelete();
            $table->foreignId('dokter_id')->constrained()->cascadeOnDelete();
            // $table->foreignId('jadwal_id')->constrained()->cascadeOnDelete();

            $table->string('nomor_antrian')->unique();
            $table->integer('nomor_urut');
            $table->date('jadwal_kunjungan');

            $table->enum("status", AntrianStatusEnum::cases())->nullable()->default(AntrianStatusEnum::MENUNGGU->value);
            $table->enum("metode_pembayaran", MetodePembayaranEnum::cases())->nullable()->default(MetodePembayaranEnum::BPJS->value);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antrians');
    }
};
