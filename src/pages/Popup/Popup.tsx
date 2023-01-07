import { useRecoilValue } from 'recoil';

import { mySizeState, productState } from '../../states/atom';
import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import NoSize from './nosize';
import SizeCompare from './size-compare';
import SizeOption from './sizeoption';
import SizeWrite from './sizewrite';
import SizeOption from './size-option';

function Popup() {
  const mySize = useRecoilValue(mySizeState);

  return (
    <>
      <GlobalStyle />
      {/* <NoSize /> */}
      <SizeWrite sizeType="상의" />
      {/* {mySize ? <SizeCompare isSelfWrite={true} /> : <CannotLoadSize />} */}
    </>
  );
}

export default Popup;
