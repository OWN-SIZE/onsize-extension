export type TopOrBottom = 'top' | 'bottom';

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
  | 'size-option'
  | 'compare'
  | 'save'
  | 'size-write'
  | 'cannotload'
  | 'nosize'
  | 'size-recommend';

export type IsRegisterType = 'null' | 'true' | 'false';

export interface UserDataType {
  isRegister: IsRegisterType;
  userId: string;
  token: string;
}
