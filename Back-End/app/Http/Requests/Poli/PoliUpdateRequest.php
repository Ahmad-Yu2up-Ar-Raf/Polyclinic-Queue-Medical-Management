<?php

namespace App\Http\Requests\Poli;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // 👈 Jangan lupa import ini

class PoliUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // 👇 Ambil parameter route 'poli', ini isinya object model Poli
        $poli = $this->route('poli');

        // Jaga-jaga ambil ID-nya (kalau objectnya beneran ada)
        $id = $poli ? $poli->id : null;

        return [
            "nama" => [
                'required',
                'string',
                'max:255',
                // 👇 Paling direkomendasikan pakai class Rule Laravel biar bersih
                Rule::unique('polis', 'nama')->ignore($id)
            ],

            "ruangan" => [
                'required',
                'string',
                'max:255',
                Rule::unique('polis', 'ruangan')->ignore($id)
            ],
        ];
    }
}
