import { Antrean } from '@/components/ui/core/block/jadwal/types/jadwal-types';
import { Dokter } from '../../dokter/types/dokter-type';

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

  data: Antrean;
}
