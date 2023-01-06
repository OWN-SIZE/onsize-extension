import { useRecoilValue } from 'recoil';

import { mySizeState } from '../../states/atom';
import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import NoSize from './nosize';
import SizeCompare from './size-compare';
import SizeOption from './sizeoption';

function Popup() {
  const mySize = useRecoilValue(mySizeState);

  return (
    <>
      <GlobalStyle />
      {/* <NoSize /> */}
      {mySize ? <SizeCompare isSelfWrite={true} /> : <CannotLoadSize />}
    </>
  );
}

export default Popup;
