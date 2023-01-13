export interface MySizeOutput {
  message: string;
  status: number;
  success: boolean;
  top: {
    topLength: number;
    shoulder: number;
    chest: number;
    isWidthOfTop: boolean;
  };
  bottom: {
    bottomLength: number;
    waist: number;
    thigh: number;
    rise: number;
    hem: number;
    isWidthOfBottom: boolean;
  };
}

export interface SaveProductInput {
  productUrl: string;
  image: string;
  mallName: string;
  productName: string;
  size: string | null;
  isRecommend: boolean;
  topOrBottom: number;
  faviconUrl: string;
}

export interface SaveProductOutput {
  data: {
    id: number;
  };
}

export interface SaveResultInput {
  topOrBottom: number;
  url: string;
  topItemId: number | null;
  bottomItemId: number | null;
}
export interface SaveResultOutput {
  data: {
    userId: number;
    url: string;
    recommendSize: string;
    topItemId: number | null;
    bottomItemId: number | null;
  };
}

export interface SizeTableType {
  size: string;
  isManual: boolean; // 수동입력한 사이즈: true / 크롤링사이즈면 : false
  manualInputNum: number | null; // 첫번째컬럼: 0, 두번째컬럼: 1 (수동입력 사이즈 아닐 경우에는 null값)
  topOrBottom: number;

  userId: number | null;
  topItemId: number | null;
  topLength: number | null;
  shoulder: number | null;
  chest: number | null;
  isWidthOfTop: boolean | null; //상의 측정 길이가 단면인지(T:단면, F:둘레)

  bottomItemId: number | null;
  bottomLength: number | null;
  waist: number | null; // 허리
  thigh: number | null; // 허벅지
  rise: number | null; // 밑위
  hem: number | null; //밑단
  isWidthOfBottom: boolean | null; // 하의 측정 길이가 단면인지(T:단면, F:둘레)
}
export interface PostSizeTableInput {
  sizes: SizeTableType[];
}
export interface PostSizeTableOutput {
  data: {
    id: number; // 상품 고유 id
  };
}
