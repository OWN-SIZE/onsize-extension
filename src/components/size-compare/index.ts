export type TabName = 'top' | 'bottom';

export type SizePropType = MyTopType | MyBottomType;

export interface MyTopType {
  topLength: number;
  shoulder: number;
  chest: number;
}
export interface MyBottomType {
  bottomLength: number;
  rise: number;
  waist: number;
  thigh: number;
  hem: number;
}
export interface TopType {
  topLength: number | null;
  shoulder: number | null;
  chest: number | null;
  isWidthOfTop: boolean | null;
}
export interface BottomType {
  bottomLength: number | null;
  rise: number | null;
  waist: number | null;
  thigh: number | null;
  hem: number | null;
  isWidthOfBottom: boolean | null;
}

export interface SizeType {
  top: TopType;
  bottom: BottomType;
}
