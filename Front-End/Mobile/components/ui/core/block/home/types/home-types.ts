import { Antrean } from '../../jadwal/types/jadwal-types';
import { Dokter } from '../../dokter/types/dokter-type';

export interface OverviewResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  antrianUser: Antrean[];
  dokter: Dokter[];
}
