<?php

namespace App\Http\Requests\Antrian;

use App\Enums\AntrianStatusEnum;
use App\Enums\JenisKelaminEnum;
use App\Enums\MetodePembayaranEnum;
use App\Models\Dokter;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AntrianStorePendaftaranBaruRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $poliDokterIds = Dokter::query()->where('poli_id', $this->poli_id)->pluck('id')->toArray();


        return [
            //

            // untuk buat pasien
            'user_id' => ['sometimes', 'integer', 'exists:users,id'],
            'nama' => ['required', 'string', 'max:255'],
            'no_hp' => ['nullable', 'string'],
            'jenis_kelamin' => ['string', 'nullable', Rule::enum(JenisKelaminEnum::class)],
            'tanggal_lahir' => ['date', 'required', 'before:today'],
            'nik' => ['string', 'required', 'max:16', 'unique:pasiens,nik'],
            'alamat' => ['string', 'nullable', 'max:255'],
            'jadwal_kunjungan' => [
                'required',
                'date',
                'after_or_equal:today'
            ],


            'poli_id' => ['integer', 'required', 'exists:polis,id'],
            'pasien_id' => ['sometimes', 'sometimes', 'exists:pasiens,id'],
            'dokter_id' => ['integer', 'sometimes', 'exists:dokters,id',  Rule::in($poliDokterIds)],

            'metode_pembayaran' => ['string', 'required', 'max:255', Rule::enum(MetodePembayaranEnum::class)],
            'status' => ['string', 'sometimes', 'max:255', Rule::enum(AntrianStatusEnum::class)],
            'deskripsi' => ['string', 'nullable', 'max:255'],
            'nomor_antrian' => ['string', 'sometimes', 'unique:antrians,nomor_antrian'],
            'nomor_urut' => [
                'integer',
                'sometimes',
                Rule::unique('antrians', 'nomor_urut')->where(function ($query) {

                    return $query->where('poli_id', $this->poli_id);
                })
            ],
        ];
    }
}
