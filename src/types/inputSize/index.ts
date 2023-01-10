export interface InputSizeInput {
  size: string;
  topLength: number | null;
  shoulder: number | null;
  chest: number | null;
  isWidthOfTop: boolean;
  bottomLength: number | null;
  waist: number | null;
  thigh: number | null;
  rise: number | null;
  hem: number | null;
  isWidthOfBottom: boolean;
  isManual: boolean;
  manualInputNum: 0 | 1 | null;
  topOrBottom: 0 | 1;
}

export interface InputSizeOutput {
  status: number;
  success: boolean;
  message: string;
}

export interface InputSizeResponse {
  data: InputSizeOutput;
}
