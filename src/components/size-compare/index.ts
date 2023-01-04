export type TabName = 'top' | 'bottom';

export interface TopType {
  총장: number;
  '어깨 단면': number;
  '가슴 단면': number;
}
export interface BottomType {
  총장: number;
  밑위: number;
  '허리 단면': number;
  '허벅지 단면': number;
  '밑단 단면': number;
}

export interface ContentsType {
  top: TopType | null;
  bottom: BottomType | null;
}
