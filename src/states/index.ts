export type TopOrBottom = 'top' | 'bottom';

export interface ProductType {
  productUrl?: string;
  image?: string;
  mallName?: string;
  productName?: string;
  isRecommend?: boolean;
  topOrBottom?: 0 | 1;
  favIconUrl?: string;
  size?: string;
}
