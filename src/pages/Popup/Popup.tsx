import GlobalStyle from '../../styles/global';
import Layout from '../../components/common/Layout';
import Landing from './landing';
import NoSize from './nosize';

function Popup() {
  return (
    <Layout back close>
      <GlobalStyle />
      {/* <Landing /> */}
      <NoSize />
    </Layout>
  );
}

export default Popup;
