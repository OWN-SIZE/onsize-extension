import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

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
  const currentView = useRecoilValue(currentViewState);

  const getUrl = async () => {
    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      if (!url) return;

      const forwardUrlIndex = url.match('goods/')?.index;
      const questionMarkIndex = url.split('').indexOf('?');

      if (!forwardUrlIndex) return;
      const productId = url?.slice(forwardUrlIndex + 6, questionMarkIndex);
      console.log(productId);
    });
  };

  useEffect(() => {
    getUrl();
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
