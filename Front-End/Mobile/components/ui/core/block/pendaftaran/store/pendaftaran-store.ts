import { PendaftaranBaruSchema } from '@/components/ui/core/block/pendaftaran/schema/pendaftaran-validation';
import { Dokter } from '@/components/ui/core/block/dokter/types/dokter-type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OnboardingState = Partial<PendaftaranBaruSchema> & {
  setData: (data: Partial<PendaftaranBaruSchema>) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  Dokter: Dokter | null;
  mode: string;
  pasien_id: number | null;
  poli: string | null;
};

const initialState = {
  nama: '',
  no_hp: '',
  nik: '',
  alamat: '',
  tanggal_lahir: undefined,
  poli: '',
  pasien_id: null,

  nomor_urut: 0,
  Dokter: null,
  jadwal_kunjungan: undefined,
  deskripsi: '',
  jenis_kelamin: undefined,
  poli_id: undefined,
  _hasHydrated: false,
};
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      mode: 'pendaftran_baru',
      setData: (data) => set((state) => ({ ...state, ...data })),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        return () => state?.setHasHydrated(true);
      },
    }
  )
);

export const setReset = () => {
  const { setData, setHasHydrated } = useOnboardingStore.getState();
  useOnboardingStore.setState(
    {
      ...initialState,
      _hasHydrated: true,
      setData,
      mode: 'pendaftaran_baru',
      setHasHydrated,
    },
    true
  );
};

export const setDokterPoli = ({ Dokter, poli }: { Dokter: Dokter | null; poli: string | null }) =>
  useOnboardingStore.setState({
    Dokter: Dokter,
    poli: poli,
  });
