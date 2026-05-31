<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antrian extends Model
{
    //

    use HasFactory;

    protected $table = "antrians";


    protected $fillable = [
        'poli_id',
        'dokter_id',
        // 'jadwal_id',
        'pasien_id',
        'jadwal_kunjungan',
        'nomor_urut',
        'metode_pembayaran',
        'deskripsi',
        'nomor_antrian',
        'status',
    ];


    // public function jadwal()
    // {
    //     return $this->belongsTo(Jadwal::class, 'jadwal_id');
    // }

    public function poli()
    {
        return $this->belongsTo(Poli::class, 'poli_id');
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'dokter_id');
    }

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'pasien_id');
    }


    public function scopeForWebsite(Builder $q): Builder
    {
        return  $q->with([
            'dokter:nama,id,foto,spesialisasi',
            'poli:id,nama',
            'pasien:id,nama,nik',
        ])->orderBy('updated_at', 'desc');
    }
    public function scopeForOperator(Builder $q): Builder
    {
        return  $q->with([
            'dokter:nama,id,spesialisasi',
            'pasien:id,nama,jenis_kelamin',

        ]);
    }
}
