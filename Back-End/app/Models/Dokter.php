<?php

namespace App\Models;

use App\Enums\DokterStatusEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    //
    use HasFactory;

    protected  $table = "dokters";
    protected  $fillable =   [
        'user_id',
        'poli_id',
        'nama',
        'jenis_kelamin',
        'email',
        'status',
        'deskripsi',
        'spesialisasi',
        'foto',
    ];


    public function jadwal()
    {
        return $this->belongsToMany(Jadwal::class, 'jadwal_dokter')->withTimestamps();
    }
    public function poli()
    {
        return $this->belongsTo(Poli::class, 'poli_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function antrian()
    {
        return $this->hasMany(Antrian::class, 'dokter_id');
    }


    public function scopePublished(Builder $q): Builder
    {

        return $q->whereStatus(DokterStatusEnum::AKTIF->value);
    }

    // app/Models/Dokter.php
    protected $appends = ['jadwal_ids'];

    // Tambahkan accessor ini
    public function getJadwalIdsAttribute()
    {
        // Menggunakan relation 'jadwal' untuk mengambil ID saja
        // 'modelKeys()' adalah cara cepat mengambil array ID dari relasi
        return $this->jadwal()->pluck('jadwal_id')->toArray();
        // Ganti 'jadwal_id' sesuai dengan nama kolom foreign key di pivot table kamu
    }
    public function scopeForWebsite(Builder $q): Builder
    {
        $hariIni = \Carbon\Carbon::now()->locale('id')->dayName;

        return $q->withCount(['jadwal', 'antrian'])
            ->with(['poli:id,nama'])
            // Load relasi jadwal tapi batasi hanya ambil kolom id saja
            ->with(['jadwal:id'])
            ->withExists(['jadwal as tersedia' => function ($query) use ($hariIni) {
                $query->where('hari', $hariIni);
            }])
            ->orderBy('updated_at', 'desc');
    }
}
