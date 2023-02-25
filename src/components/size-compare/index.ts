export type TabName = 'top' | 'bottom';

export type SizePropType = Partial<Omit<TopType, 'isWidthOfTop'> | Omit<BottomType, 'isWidthOfBottom'>>;

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

export interface TopBottomType {
  top: TopType;
  bottom: BottomType;
}

export interface SizeType {
  top: TopType;
  bottom: BottomType;
}
