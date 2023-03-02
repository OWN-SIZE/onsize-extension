import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useRedirect } from '../../hooks/queries/useRedirect';
import { CurrentViewType } from '../../states';
import { currentViewState } from '../../states/atom';
import CheckEnable from '../check-enable';

import CannotLoadSize from './cannotloadsize';
import First from './first';
import Loading from './loading';
import NoSize from './nosize';
import SaveProduct from './save-product';
import SizeCompare from './size-compare';
import SizeOption from './size-option';
import SizeRecommend from './size-recommend';
import SizeWrite from './size-write';

function Popup() {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const { redirect } = useRedirect();

  const checkCurrentView = async () => {
    const { sizeTable } = await chrome.storage.local.get(['sizeTable']);
    const { currentView } = await chrome.storage.local.get(['currentView']);

    if (currentView === 'check-enable') {
      setCurrentView('check-enable');
      return;
    }

    const storedCurrentView = localStorage.getItem('currentView') as CurrentViewType;
    if (sizeTable) {
      if (storedCurrentView === 'cannotload') {
        setCurrentView('size-option');
      } else {
        setCurrentView(storedCurrentView || 'size-option');
      }
    } else {
      if (storedCurrentView === 'compare' || storedCurrentView === 'size-write') {
        setCurrentView(storedCurrentView || 'cannotload');
      } else {
        setCurrentView('cannotload');
      }
    }
  };

  useEffect(() => {
    (async () => {
      await checkCurrentView();
      await redirect();
    })();
    chrome.storage.local.set({ isDownload: true });
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'first':
        return <First />;
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
      case 'size-recommend':
        return <SizeRecommend />;
      case 'loading':
        return <Loading />;
      case 'check-enable':
        return <CheckEnable />;
    }
  };

  return renderView();
}

export default Popup;
