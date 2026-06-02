<?php

namespace App\Http\Requests\Pasien;

use App\Enums\JenisKelaminEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PasienUpdateRequest extends FormRequest
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
        // 🎯 Ambil parameter {pasien}. Karena pakai Route Model Binding,
        // ini bisa berupa Object Model 'Pasien' atau ID mentah.
        $pasien = $this->route('pasien');
        $id = is_object($pasien) ? $pasien->id : $pasien;

        return [
            'nama' => ['required', 'string', 'max:255'],
            'no_hp' => ['nullable', 'string'],
            'jenis_kelamin' => ['string', 'nullable', Rule::enum(JenisKelaminEnum::class)],
            'tanggal_lahir' => ['date', 'required', 'before:today'],

            // 🎯 Perbaikan validasi NIK menggunakan Rule::unique()->ignore()
            'nik' => [
                'string',
                'required',
                'max:16',
                Rule::unique('pasiens', 'nik')->ignore($id)
            ],

            'alamat' => ['string', 'nullable', 'max:255']
        ];
    }
}
