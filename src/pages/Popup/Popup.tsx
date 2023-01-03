import GlobalStyle from '../../styles/global';
import Layout from '../../components/common/Layout';
import Landing from './landing';
import NoSize from './nosize';
import CannotLoadSize from './cannotloadsize';

function Popup() {
  return (
    <Layout back close>
      <GlobalStyle />
      {/* <Landing /> */}
      {/* <NoSize /> */}
      <CannotLoadSize />
    </Layout>
  );
}

export default Popup;
