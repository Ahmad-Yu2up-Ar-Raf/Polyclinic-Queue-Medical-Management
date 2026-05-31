<?php

namespace App\Http\Requests\Antrian;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class OnboardingStoreRequest extends FormRequest
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
            'poli_id' => ['integer', 'required', 'exists:polis,id'],
            'jadwal_kunjungan' => [
                'required',
                'date',
                'after_or_equal:today'
            ],
            //
        ];
    }
}
