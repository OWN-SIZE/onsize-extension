import { useRecoilValue } from 'recoil';

import { currentViewState } from '../../states/atom';
import GlobalStyle from '../../styles/global';
import SaveProduct from '../save-product';

import Result from './result';
import SizeCompare from './size-compare';
import SizeOption from './size-option';
import SizeWrite from './size-write';

function Popup() {
  const currentView = useRecoilValue(currentViewState);

  const renderView = () => {
    switch (currentView) {
      case 'size-option':
        return <SizeOption />;
      case 'result':
        return <Result />;
      case 'compare':
        return <SizeCompare />;
      case 'save':
        return <SaveProduct />;
      case 'size-write':
        return <SizeWrite />;
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
