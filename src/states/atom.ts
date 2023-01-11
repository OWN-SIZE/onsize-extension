import { atom } from 'recoil';

import { SizeType } from '../components/size-compare';

import { CurrentViewType, ProductType, TopOrBottom, UserDataType } from '.';

export const mySizeState = atom<SizeType>({
  key: 'mySize',
  default: {
    // top: {
    //   topLength: 50,
    //   shoulder: 60,
    //   chest: 40,
    //   isWidthOfTop: false,
    // },
    top: null,
    bottom: {
      bottomLength: 90,
      waist: 28,
      rise: 15,
      hem: 10,
      thigh: 28,
      isWidthOfBottom: false,
    },
  },
});

export const topOrBottomState = atom<TopOrBottom>({
  key: 'topOrBottom',
  default: 'top',
});

export const productState = atom<ProductType>({
  key: 'product',
  default: {
    productUrl: '',
    image: '',
    mallName: '무신사(MUSINSA)',
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
  default: (localStorage.getItem('currentView') as CurrentViewType) || 'cannotload',
});

export const isSelfWriteState = atom<boolean>({
  key: 'isSelfWrite',
  default: false,
});

export const historyState = atom<CurrentViewType | null>({
  key: 'history',
  default: null,
});

export const userDataState = atom<UserDataType>({
  key: 'userData',
  default: {
    isRegister: false,
    userId: '',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkpvQGdtYWlsLmNvbSIsImlhdCI6MTY3MzMzMjk4NX0.2IT_r2vURBDJUV6FfcIUX3V2lhIIFWgAsK5cYzIq4kg',
  },
});
