import { useRecoilValue } from 'recoil';

import { mySizeState } from '../../states/atom';
import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import NoSize from './nosize';
import SizeCompare from './size-compare';
import SizeOption from './sizeoption';
import SizeWrite from './sizewrite';

function Popup() {
  const mySize = useRecoilValue(mySizeState);

  return (
    <>
      <GlobalStyle />
      {/* <NoSize /> */}
      <SizeWrite />
      {/* {mySize ? <SizeCompare isSelfWrite={true} /> : <CannotLoadSize />} */}
    </>
  );
}

export default Popup;
