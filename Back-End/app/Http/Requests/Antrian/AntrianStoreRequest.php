<?php

namespace App\Http\Requests\Antrian;

use App\Enums\AntrianStatusEnum;
use App\Enums\MetodePembayaranEnum;
use App\Models\Dokter;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AntrianStoreRequest extends FormRequest
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
            'poli_id' => ['integer', 'required', 'exists:polis,id'],
            'pasien_id' => ['sometimes', 'required', 'exists:pasiens,id'],
            'dokter_id' => ['integer', 'required', 'exists:dokters,id',  Rule::in($poliDokterIds)],
            'jadwal_id' => [
                'integer',
                'required',
                'exists:jadwals,id',
                Rule::exists('jadwal_dokter', 'jadwal_id')->where('dokter_id', $this->dokter_id)
            ],
            'metode_pembayaran' => ['string', 'required', 'max:255', Rule::enum(MetodePembayaranEnum::class)],
            'status' => ['string', 'sometimes', 'max:255', Rule::enum(AntrianStatusEnum::class)],
            'deskripsi' => ['string', 'nullable', 'max:255'],
            'nomor_antrian' => ['string', 'sometimes', 'unique:antrians,nomor_antrian']
        ];
    }
}
