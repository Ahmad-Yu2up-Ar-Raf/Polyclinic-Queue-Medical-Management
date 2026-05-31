import { PendaftaranBaruSchema } from '@/lib/validations/pendaftaran-validation';
import { Dokter } from '@/types/dokter-type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OnboardingState = Partial<PendaftaranBaruSchema> & {
  setData: (data: Partial<PendaftaranBaruSchema>) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  Dokter: Dokter | null;
  poli: string | null;
};

const initialState = {
  nama: '',
  no_hp: '',
  nik: '',
  alamat: '',
  tanggal_lahir: undefined, // <--- UBAH INI
  poli: '',
  nomor_urut: 0,
  Dokter: null,
  jadwal_kunjungan: undefined, // <--- UBAH INI
  deskripsi: '',
  jenis_kelamin: undefined,
  poli_id: undefined,
  _hasHydrated: false,
};
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
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

// FIX RESET: Tetap set _hasHydrated jadi true supaya UI gak nge-bug/flicker
export const setReset = () => {
  const { setData, setHasHydrated } = useOnboardingStore.getState();
  useOnboardingStore.setState(
    {
      ...initialState,
      _hasHydrated: true, // Tetap true setelah reset
      setData,
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
