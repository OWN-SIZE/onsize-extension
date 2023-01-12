import { useEffect, useLayoutEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CurrentViewType } from '../../states';
import { currentViewState } from '../../states/atom';
import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import NoSize from './nosize';
import SaveProduct from './save-product';
import SizeCompare from './size-compare';
import SizeOption from './size-option';
import SizeRecommend from './size-recommend';
import SizeWrite from './size-write';

function Popup() {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);

  // currentView를 체크해서 사이즈표 존재 여부에 따라 라우팅
  const checkCurrentView = async () => {
    const currentView = (localStorage.getItem('currentView') as CurrentViewType) || 'size-option';
    setCurrentView(currentView);
  };

  useLayoutEffect(() => {
    checkCurrentView();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'size-option':
        return <SizeOption />;
      case 'compare':
        return <SizeCompare />;
      case 'cannotload':
        return <CannotLoadSize />;
      case 'save':
        return <SaveProduct />;
      case 'size-write':
        return <SizeWrite />;
      case 'nosize':
        return <NoSize />;
      default:
        return <SizeRecommend />;
    }
  };

  return (
    <>
      <GlobalStyle />
      {renderView()}
    </>
  );
}

export default Popup;
