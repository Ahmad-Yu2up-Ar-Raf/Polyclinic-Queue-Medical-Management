import { router } from 'expo-router';
import { useToast } from '../../../../../../hooks/use-toast-simplified';
import { handleApiError } from '@/utils/form-utils';
import { useAppForm } from '../../../../../../hooks/form/use-form';
import {
  firstStepSchema,
  pendaftaranBaruSchema,
  secondStepSchema,
  type FirstStepSchema,
  type SecondStepSchema,
  type PendaftaranBaruSchema,
  SelectPasien,
  selectPasien,
  pendaftaranLamaSchema,
} from '@/components/ui/core/block/pendaftaran/schema/pendaftaran-validation';
import {
  setDokterPoli,
  setReset,
  useOnboardingStore,
} from '@/components/ui/core/block/pendaftaran/store/pendaftaran-store';
import { api } from '@/api/clien';
import { Dokter } from '@/components/ui/core/block/dokter/types/dokter-type';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Antrean, Pasien } from '../../jadwal/types/jadwal-types';
// Helper Global untuk Error Handling biar gak ngetik berulang-ulang
const useFormErrorHandler = () => {
  const { toast } = useToast();
  return (title: string, formApi: any) => (error: any) => {
    handleApiError(error, formApi, (message) => {
      toast.error({ title, message });
    });
  };
};

// ==========================================
// 1. HOOK UNTUK STEP PERTAMA
// ==========================================
export const useFirstStepForm = () => {
  const onError = useFormErrorHandler();
  const store = useOnboardingStore();

  return useAppForm({
    defaultValues: {
      nama: store.nama,
      nik: store.nik,
      // Fallback ke undefined jika datanya kosong
      tanggal_lahir: store.tanggal_lahir || undefined,
      no_hp: store.no_hp,
      alamat: store.alamat,
      jenis_kelamin: store.jenis_kelamin,
    } as FirstStepSchema,
    validators: { onSubmit: firstStepSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        store.setData(value);
        // FIX: Pakai push supaya tombol Back bekerja dengan benar!
        router.push('/daftar/pendaftaran_baru/second-step');
      } catch (err) {
        onError('Gagal membuat antrian', formApi)(err);
      }
    },
  });
};

export const useSelectPasien = () => {
  const onError = useFormErrorHandler();
  const store = useOnboardingStore();

  return useAppForm({
    defaultValues: {
      pasien_id: store.pasien_id,
    } as SelectPasien,
    validators: { onSubmit: selectPasien },
    onSubmit: async ({ value, formApi }) => {
      try {
        useOnboardingStore.setState({
          ...value,
        });
        const response = await api.get(`pasien/${value.pasien_id}`).json<PasienDetailResponse>();
        store.setData(response.data);
        router.push('/daftar/pendaftaran_baru/second-step');
      } catch (err) {
        onError('Gagal membuat pasien', formApi)(err);
      }
    },
  });
};

// ==========================================
// 2. HOOK UNTUK STEP KEDUA
// ==========================================
export const useSecondStepForm = () => {
  const onError = useFormErrorHandler();
  const store = useOnboardingStore();

  return useAppForm({
    defaultValues: {
      poli_id: store.poli_id,
      // Fallback ke undefined jika datanya kosong
      jadwal_kunjungan: store.jadwal_kunjungan || undefined,
      metode_pembayaran: store.metode_pembayaran,
    } as SecondStepSchema,
    validators: { onSubmit: secondStepSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        const response = await api
          .post('antrian/cek', { json: value })
          .json<OnboardingFinalResponse>();

        const backendDokter = response.data.dokter;
        const backendPoli = response.data.poli;

        let finalDokterId = store.dokter_id;

        if (!store.Dokter && backendDokter) {
          setDokterPoli({ Dokter: backendDokter, poli: backendPoli.nama });
          finalDokterId = backendDokter.id;
        }

        if (store.Dokter && backendPoli) {
          setDokterPoli({ Dokter: store.Dokter, poli: backendPoli.nama });
        }

        store.setData({
          ...value,
          dokter_id: finalDokterId,
          status: response.data.status as
            | 'dipanggil'
            | 'dilewati'
            | 'menunggu'
            | 'selesai'
            | undefined,
          nomor_antrian: response.data.nomor_antrian,
          nomor_urut: response.data.nomor_urut_finnal,
        });

        // FIX: Pakai push ke step 3
        router.push('/daftar/pendaftaran_baru/third-step');
      } catch (err) {
        onError('Gagal membuat antrian', formApi)(err);
      }
    },
  });
};
// ==========================================
// 3. HOOK UNTUK STEP KETIGA (FINAL)
// ==========================================
export const useFinalSubmit = () => {
  const { toast } = useToast();
  const store = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const submitAction = async () => {
    setIsLoading(true);
    try {
      if (store.mode == 'pendaftaran_baru') {
        const rawPayload = {
          nama: store.nama,
          no_hp: store.no_hp,
          nik: store.nik,
          alamat: store.alamat,
          tanggal_lahir: store.tanggal_lahir,
          jenis_kelamin: store.jenis_kelamin,
          poli_id: store.poli_id,
          dokter_id: store.dokter_id,
          nomor_urut: store.nomor_urut,
          status: store.status,
          nomor_antrian: store.nomor_antrian,
          metode_pembayaran: store.metode_pembayaran,
          jadwal_kunjungan: store.jadwal_kunjungan,
        };

        const validatedData = pendaftaranBaruSchema.parse(rawPayload);
        console.log(rawPayload);

        const data = await api
          .post('antrian/pendaftaranBaru', { json: validatedData })
          .json<FinnalResponse>();
        const antrian = data.data;
        toast.success({
          title: 'Pendaftaran Berhasil',
          message: 'Antrean Anda berhasil dibuat!',
        });
        router.replace({
          pathname: '/daftar/[id]',
          params: {
            id: antrian.id,
          },
        });
      } else {
        const rawPayload = {
          pasien_id: store.pasien_id,
          poli_id: store.poli_id,
          dokter_id: store.dokter_id,
          nomor_urut: store.nomor_urut,
          status: store.status,
          nomor_antrian: store.nomor_antrian,
          metode_pembayaran: store.metode_pembayaran,
          jadwal_kunjungan: store.jadwal_kunjungan,
        };

        const validatedData = pendaftaranLamaSchema.parse(rawPayload);
        console.log(rawPayload);
        const data = await api.post('antrian', { json: validatedData }).json<FinnalResponse>();
        const antrian = data.data;
        toast.success({
          title: 'Pendaftaran Berhasil',
          message: 'Antrean Anda berhasil dibuat!',
        });
        router.replace({
          pathname: '/daftar/[id]',
          params: {
            id: antrian.id,
          },
        });
      }

      setReset();
      queryClient.invalidateQueries({ queryKey: ['overview', 'jadwal'] });
    } catch (err: any) {
      console.error('Error Final Submit:', err);

      const errorMessage =
        err?.response?.data?.message || err?.message || 'Terjadi kesalahan saat mendaftar antrian';

      toast.error({
        title: 'Gagal Mendaftar',
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { submitAction, isLoading };
};

export interface OnboardingFinalResponse {
  status: boolean;
  message: string;
  data: {
    dokter: Dokter;
    nomor_antrian: string;
    poli: {
      nama: string;
    };
    nomor_urut_finnal: number;
    status: string;
  };
}
export interface FinnalResponse {
  status: boolean;
  message: string;
  data: Antrean;
}

export interface PasienDetailResponse {
  data: PendaftaranBaruSchema;
}
