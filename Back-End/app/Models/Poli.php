<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Poli extends Model
{
    //

    // protected $guarded = [];
    protected $table = "polis";

    protected $fillable = [
        "nama",
        "kode",
        "ruangan",
    ];


    public function dokter()
    {
        return $this->hasMany(Dokter::class, 'poli_id');
    }


    public function antrian()
    {
        return $this->hasMany(Antrian::class, 'poli_id');
    }

    public function scopeForWebsite(Builder $q): Builder
    {
        return  $q->withCount(['dokter', 'antrian'])->orderBy('updated_at', 'desc');
    }
}
