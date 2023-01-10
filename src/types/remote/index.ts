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
