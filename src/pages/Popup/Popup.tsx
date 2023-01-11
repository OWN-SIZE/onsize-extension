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
