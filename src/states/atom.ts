import { atom } from 'recoil';

import { SizeType } from '../components/size-compare';

import { CurrentViewType, ProductType, TopOrBottom } from '.';

export const mySizeState = atom<SizeType>({
  key: 'mySize',
  default: {
    top: {
      topLength: 12.4,
      shoulder: 29,
      chest: 12,
      isWidthOfTop: true,
    },
    bottom: {
      bottomLength: 12.5,
      rise: 11,
      waist: 45,
      thigh: 25,
      hem: 28,
      isWidthOfBottom: true,
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
    favIconUrl: '',
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
