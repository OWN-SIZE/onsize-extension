import Layout from '../../components/common/Layout';
import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import Landing from './landing';
import NoSize from './nosize';
import SizeCompare from './size-compare';

function Popup() {
  return (
    <Layout back close>
      <GlobalStyle />
      {/* <Landing /> */}
      {/* <NoSize /> */}
      {/* <CannotLoadSize /> */}
      <SizeCompare />
    </Layout>
  );
}

export default Popup;
