// File: src/lib/form-utils.ts
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import type { AnyFormApi } from '@tanstack/react-form';
export function useFormFieldState(field: any) {
  const { colorScheme } = useColorScheme();
  const currentTheme = colorScheme ?? 'light';

  // Ekstrak dan bersihkan error dari Zod
  const parsedErrors = field.state.meta.errors.filter(
    (err: any): err is string => typeof err === 'string' && err.trim().length > 0
  );

  const errorMessage = parsedErrors.join(', ');

  // Logic kapan error harus muncul (saat disentuh ATAU disubmit)
  const isInvalid =
    parsedErrors.length > 0 &&
    (field.state.meta.isTouched || field.form.state.submissionAttempts > 0);

  const isValid = field.state.value && !isInvalid;

  return {
    errorMessage,
    isInvalid,
    isValid,
    colors: {
      destructive: THEME[currentTheme].destructive,
      primary: THEME[currentTheme].primary,
      mutedForeground: THEME[currentTheme].mutedForeground,
    },
  };
}

interface LaravelErrorResponse {
  message?: string;
  errors?: Record<string, string | string[]>;
}

interface HttpErrorLike {
  name: 'HTTPError';
  response: Response;
}

export function isHttpError(error: unknown): error is HttpErrorLike {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as Record<string, unknown>).name === 'HTTPError' &&
    'response' in error &&
    (error as Record<string, unknown>).response instanceof Response
  );
}

export async function handleApiError(
  error: unknown,
  formApi: AnyFormApi,
  onError: (message: string) => void
): Promise<void> {
  if (!isHttpError(error)) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan jaringan.';
    onError(message);
    return;
  }

  try {
    const errorBody = (await error.response.json()) as LaravelErrorResponse;

    if (error.response.status === 422 && errorBody.errors) {
      Object.keys(errorBody.errors).forEach((field) => {
        const messages = errorBody.errors![field];
        const cleanMessage = Array.isArray(messages) ? messages[0] : messages;

        formApi.setFieldMeta(field, (prev) => ({
          ...prev,
          errorMap: { ...prev.errorMap, onSubmit: cleanMessage },
        }));
      });
      onError('Cek kembali data form kamu.');
      return;
    }

    onError(errorBody.message ?? 'Email atau password salah.');
  } catch {
    onError('Terjadi kesalahan pada server.');
  }
}
