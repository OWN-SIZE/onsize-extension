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
  default: 'size-option',
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
    isRegister: 'null',
    userId: '',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlZXNlb29vQHNvb2tteXVuZy5hYy5rciIsImlhdCI6MTY3MzQzOTg5OH0.L0RlpbVZnMucTVVmA8tVhh6F2eQzgKV0lFJm4SQM-q4',
  },
});
