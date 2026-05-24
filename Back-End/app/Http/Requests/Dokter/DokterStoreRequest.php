<?php

namespace App\Http\Requests\Dokter;

use App\Enums\DokterStatusEnum;
use App\Enums\JenisKelaminEnum;
use App\Models\Dokter;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DokterStoreRequest extends FormRequest
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
        return [
            //
            'poli_id' => ['required', 'integer', 'exists:polis,id'],
            'jadwal_ids' => ['sometimes', 'array'],
            'jadwal_ids.*' => ['integer', 'distinct', 'exists:jadwals,id'],
            'nama' => ['string', 'required', 'max:255'],
            'spesialisasi' => ['string', 'nullable', 'max:255'],

            'foto' => ['nullable', 'image', 'max:2048'],
            'jenis_kelamin' => ['string', 'nullable', Rule::enum(JenisKelaminEnum::class)],
            'status' => ['string', 'nullable', Rule::enum(DokterStatusEnum::class)],

            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:dokters,email'],
            'deskripsi' => ['string', 'nullable', 'max:255'],

        ];
    }
}
