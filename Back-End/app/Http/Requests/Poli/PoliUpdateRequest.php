<?php

namespace App\Http\Requests\Poli;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PoliUpdateRequest extends FormRequest
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

        $id = $this->route('id');
        return [

            "nama" => ['required', 'string', 'max:255',  'unique:polis,nama,' . $id],

            "ruangan" => ['required', 'string', 'max:255',  'unique:polis,ruangan,' . $id],


        ];
    }
}
