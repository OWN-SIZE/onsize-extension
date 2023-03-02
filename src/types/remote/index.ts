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
  faviconUrl: string;
  userId: number;
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
  userId?: number | null;
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
  [key: string]: string | number | boolean | null;
  size: string;
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

export interface RefreshInput {
  accessToken: string;
}

export interface RefreshOutput {
  data: {
    token: string; //재발급된 access token
    userId: number; // 로그인한 유저 고유 아이디
  };
}
