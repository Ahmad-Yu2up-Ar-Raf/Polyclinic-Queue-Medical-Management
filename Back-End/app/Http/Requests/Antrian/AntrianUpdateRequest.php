<?php

namespace App\Http\Requests\Antrian;

use App\Enums\AntrianStatusEnum;
use App\Enums\MetodePembayaranEnum;
use App\Models\Dokter;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AntrianUpdateRequest extends FormRequest
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

        $antrian = $this->route('antrian');
        $id = is_object($antrian) ? $antrian->id : $antrian;

        $poliDokterIds = Dokter::query()->where('poli_id', $this->poli_id)->pluck('id')->toArray();


        return [
            //
            'poli_id' => ['integer', 'required', 'exists:polis,id'],
            'pasien_id' => ['sometimes', 'sometimes', 'exists:pasiens,id'],
            'dokter_id' => ['integer', 'sometimes', 'exists:dokters,id',  Rule::in($poliDokterIds)],
            'jadwal_kunjungan' => [
                'required',
                'date',
                'after_or_equal:today'
            ],
            // 'jadwal_id' => [
            //     'integer',
            //     'required',
            //     'exists:jadwals,id',
            //     Rule::exists('jadwal_dokter', 'jadwal_id')->where('dokter_id', $this->dokter_id)
            // ],
            'metode_pembayaran' => ['string', 'required', 'max:255', Rule::enum(MetodePembayaranEnum::class)],
            'status' => ['string', 'sometimes', 'max:255', Rule::enum(AntrianStatusEnum::class)],

            'nomor_antrian' => ['string', 'sometimes', 'unique:antrians,nomor_antrian,' . $id]
        ];
    }
}
