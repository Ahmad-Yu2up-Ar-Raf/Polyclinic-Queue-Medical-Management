<?php

namespace App\Http\Requests\Jadwal;

use App\Enums\HariEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class JadwalStoreRequest extends FormRequest
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
            'nama' => ['string', 'nullable', 'max:255', 'unique:jadwals,nama'],
            'hari' => ['string', 'required', Rule::enum(HariEnum::class)],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i', 'after:jam_mulai'],
            'dokter_ids' => ['sometimes', 'array'],
            'dokter_ids.*' => ['integer', 'distinct', 'exists:dokters,id'],
        ];
    }
}
