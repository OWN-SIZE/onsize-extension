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
        return <SizeCompare isSelfWrite={false} />;
      case 'save':
        return <SaveProduct />;
    }
  };

  return (
    <>
      <GlobalStyle />
      {/* {renderView()} */}
      <SizeWrite />
    </>
  );
}

export default Popup;
