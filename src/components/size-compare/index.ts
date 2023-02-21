export type TabName = 'top' | 'bottom';

export interface TopType {
  topLength: number;
  shoulder: number;
  chest: number;
  isWidthOfTop: boolean;
}
export interface BottomType {
  bottomLength: number;
  rise: number;
  waist: number;
  thigh: number;
  hem: number;
  isWidthOfBottom: boolean;
}

export interface TopBottomType {
  top: TopType;
  bottom: BottomType;
}

export interface SizeType {
  top: TopType;
  bottom: BottomType;
}
