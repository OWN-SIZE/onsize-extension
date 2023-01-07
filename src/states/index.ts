export type TopOrBottom = 'top' | 'bottom' | null;

export interface ProductType {
  productUrl?: string;
  image?: string;
  mallName?: string;
  productName?: string;
  isRecommend?: boolean;
  topOrBottom?: 0 | 1;
  favIconUrl?: string;
  size?: string;
  memo?: string | null;
  isPin?: boolean | null;
}

export type CurrentViewType = 'size-option' | 'result' | 'compare' | 'save';
