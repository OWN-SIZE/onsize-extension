import { atom } from 'recoil';

import { SizeType } from '../components/size-compare';

import { CurrentViewType, ProductType, TopOrBottom } from '.';

export const mySizeState = atom<SizeType>({
  key: 'mySize',
  default: {
    top: {
      topLength: 50,
      shoulder: 60,
      chest: 40,
      isWidthOfTop: false,
    },
    // bottom: null,
    bottom: {
      bottomLength: 90,
      waist: 28,
      rise: 15,
      hem: 10,
      thigh: 28,
      isWidthOfBottom: false,
    },
  },
  // effects_UNSTABLE: [persistAtom],
});

export const topOrBottomState = atom<TopOrBottom>({
  key: 'topOrBottom',
  default: 'top',
  // effects_UNSTABLE: [persistAtom],
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
  // effects_UNSTABLE: [persistAtom],
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
  default: null,
});
