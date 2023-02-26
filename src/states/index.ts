export type TopOrBottom = 'top' | 'bottom' | null;

export interface ProductType {
  productUrl: string;
  image: string;
  mallName: string;
  productName: string;
  isRecommend: boolean;
  topOrBottom: 0 | 1;
  faviconUrl: string;
  size: string;
  memo: string | null;
  isPin: boolean | null;
}

export type CurrentViewType =
  | 'first'
  | 'size-option'
  | 'compare'
  | 'save'
  | 'size-write'
  | 'cannotload'
  | 'nosize'
  | 'size-recommend'
  | 'loading';

export type IsRegisterType = 'null' | 'true' | 'false';

export interface UserDataType {
  isRegister: IsRegisterType | string;
  userId: number;
  token: string;
}
