import { Antrean } from './antrian-types';
import { Dokter } from './dokter-type';

export interface OverviewResponse {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  antrianUser: Antrean[];
  dokter: Dokter[];
}
