import { atom } from 'recoil';

import { SizeType } from '../components/size-compare';

import { CurrentViewType, ProductType, TopOrBottom, UserDataType } from '.';

export const mySizeState = atom<SizeType>({
  key: 'mySize',
  default: {
    top: JSON.parse(
      localStorage.getItem('top') ||
        JSON.stringify({
          topLength: 0,
          shoulder: 0,
          chest: 0,
          isWidthOfTop: false,
        }),
    ) || {
      topLength: 0,
      shoulder: 0,
      chest: 0,
      isWidthOfTop: false,
    },
    bottom: JSON.parse(
      localStorage.getItem('bottom') ||
        JSON.stringify({
          bottomLength: 0,
          waist: 0,
          rise: 0,
          hem: 0,
          thigh: 0,
          isWidthOfBottom: false,
        }),
    ) || {
      bottomLength: 0,
      waist: 0,
      rise: 0,
      hem: 0,
      thigh: 0,
      isWidthOfBottom: false,
    },
  },
});

export const topOrBottomState = atom<TopOrBottom>({
  key: 'topOrBottom',
  default: 'null',
});

export const productState = atom<ProductType>({
  key: 'product',
  default: {
    productUrl: '',
    image: '',
    mallName: '',
    productName: '',
    isRecommend: true,
    topOrBottom: 0,
    faviconUrl: '',
    size: '',
    memo: null,
    isPin: null,
  },
});

export const currentViewState = atom<CurrentViewType>({
  key: 'currentView',
  default: (localStorage.getItem('currentView') as CurrentViewType) || 'size-option',
});

export const isSelfWriteState = atom<boolean>({
  key: 'isSelfWrite',
  default: false,
});

export const historyState = atom<CurrentViewType | null>({
  key: 'history',
  default: (localStorage.getItem('history') as CurrentViewType) || null,
});

export const userDataState = atom<UserDataType>({
  key: 'userData',
  default: {
    isRegister: '',
    userId: 0,
    token: '',
  },
});

export const sizeRecommendState = atom<string | null>({
  key: 'size-recommend',
  default: localStorage.getItem('recommend-size') || null,
});
