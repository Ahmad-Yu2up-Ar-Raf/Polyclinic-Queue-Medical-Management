<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    //

    use HasFactory;

    protected $table = "pasiens";

    protected $fillable = [
        'nama',
        'user_id',
        'jenis_kelamin',
        'no_hp',
        'tanggal_lahir',
        'nik',
        'alamat'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function antrian()
    {
        return $this->hasMany(Antrian::class, 'pasien_id');
    }


    public function scopeForWebsite(Builder $q): Builder
    {
        return $q->withCount('antrian as total_kunjungan')->orderBy('updated_at', 'desc');
    }
}
