export interface TopValuesType {
  [key: string]: string;
  size: string;
  topLength: string;
  shoulder: string;
  chest: string;
}

export interface BottomValuesType {
  [key: string]: string;
  size: string;
  bottomLength: string;
  waist: string;
  thigh: string;
  rise: string;
  hem: string;
}

export type ValuesType = TopValuesType | BottomValuesType;
