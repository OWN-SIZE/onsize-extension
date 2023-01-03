import Layout from '../../components/common/Layout';
import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import Landing from './landing';
import NoSize from './nosize';
import NoSizeCompare from './nosizecompare';

function Popup() {
  return (
    <Layout back close>
      <GlobalStyle />
      {/* <Landing /> */}
      {/* <NoSize /> */}
      {/* <CannotLoadSize /> */}
      <NoSizeCompare />
    </Layout>
  );
}

export default Popup;
