import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import Landing from './landing';
import NoSize from './nosize';
import SizeCompare from './size-compare';

function Popup() {
  return (
    <>
      <GlobalStyle />
      {/* <Landing /> */}
      {/* <NoSize /> */}
      {/* <CannotLoadSize /> */}
      <SizeCompare isSelfWrite={true} />
    </>
  );
}

export default Popup;
