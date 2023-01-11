export interface SaveProductInput {
  productUrl: string;
  image: string;
  mallName: string;
  productName: string;
  size: string | null;
  isRecommend: boolean;
  topOrBottom: 0 | 1;
  faviconUrl: string;
}

export interface SaveProductOutput {
  data: {
    id: number;
  };
}

export interface SaveResultInput {
  userId: number;
  topOrBottom: number;
  url: string;
  topItemId: number | null;
  bottomItemId: number | null;
}
export interface SaveResultOutput {
  userId: number;
  url: string;
  recommendSize: string;
  topItemId: number | null;
  bottomItemId: number | null;
}
export interface PostSizeTableInput {
  size: string;
  isManual?: boolean; // 수동입력한 사이즈: true / 크롤링사이즈면 : false
  manualInputNum?: number; // 첫번째컬럼: 0, 두번째컬럼: 1 (수동입력 사이즈 아닐 경우에는 null값)

  topItemId?: number;
  topOrBottom?: number;
  topLength?: number;
  shoulder?: number;
  chest?: number;
  isWidthOfTop?: boolean; //상의 측정 길이가 단면인지(T:단면, F:둘레)

  bottomItemId?: number;
  bottomLength: number;
  waist?: number;
  thigh?: number;
  rise?: number;
  hem?: number;
  isWidthOfBottom?: boolean; // 하의 측정 길이가 단면인지(T:단면, F:둘레)
}
export interface PostSizeTableOutput {
  data: {
    id: number; // 상품 고유 id
  };
}
