<?php

namespace App\Http\Requests\Pasien;

use App\Enums\JenisKelaminEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PasienStoreRequest extends FormRequest
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
            'user_id' => ['sometimes', 'integer', 'exists:users,id'],
            'nama' => ['required', 'string', 'max:255'],
            'no_hp' => ['nullable', 'string'],
            'jenis_kelamin' => ['string', 'nullable', Rule::enum(JenisKelaminEnum::class)],
            'tanggal_lahir' => ['date', 'required', 'before:today'],
            'nik' => ['string', 'required', 'max:16', 'unique:pasiens,nik'],
            'alamat' => ['string', 'nullable', 'max:255']
        ];
    }
}
