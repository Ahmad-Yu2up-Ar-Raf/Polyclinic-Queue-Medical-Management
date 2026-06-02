<?php

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
        Schema::create('pasiens', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nama');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('jenis_kelamin', JenisKelaminEnum::cases())->nullable()->default(JenisKelaminEnum::PRIA->value);
<<<<<<< HEAD
            $table->string('no_hp', 15)->nullable();
=======
            $table->string('no_hp', 60)->nullable();
>>>>>>> 084ee958cd25ffd5b0b573422f9ce0406c9e2962
            $table->date('tanggal_lahir');
            $table->string('nik', 16)->unique();
            $table->longText('alamat')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasiens');
    }
};
