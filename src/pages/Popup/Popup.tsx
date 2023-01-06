import Layout from '../../components/common/Layout';
import GlobalStyle from '../../styles/global';

import CannotLoadSize from './cannotloadsize';
import Landing from './landing';
import NoSize from './nosize';
import SizeCompare from './size-compare';
import SizeOption from './sizeoption';

function Popup() {
  return (
    <Layout back close>
      <GlobalStyle />
      {/* <Landing /> */}
      {/* <NoSize /> */}
      {/* <CannotLoadSize /> */}
      {/* <SizeCompare /> */}
      <SizeOption />
    </Layout>
  );
}

export default Popup;
