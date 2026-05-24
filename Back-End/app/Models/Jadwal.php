<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{

    use HasFactory;

    protected $table = "jadwals";

    protected $fillable = [
        'nama',
        'hari',
        'jam_mulai',
        'jam_selesai'
    ];

    public function dokter()
    {
        return $this->belongsToMany(Dokter::class, 'jadwal_dokter')->withTimestamps();
    }

    public function antrian()
    {
        return $this->hasMany(Antrian::class, 'jadwal_id');
    }

    public function scopeForWebsite(Builder $q): Builder
    {
        return $q->withCount(['dokter', 'antrian'])->orderBy('updated_at', 'desc');
    }
}
