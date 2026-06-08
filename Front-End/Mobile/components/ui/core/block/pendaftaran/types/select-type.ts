export interface SelectResponse {
  status: boolean;
  message: string;
  data: SelectType[];
}

export interface SelectType {
  id: number;
  nama: string;
  nik?: string;
}
