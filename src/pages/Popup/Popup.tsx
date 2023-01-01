import GlobalStyle from '../../styles/global';
import Layout from '../../components/common/Layout';
import Landing from './landing';

function Popup() {
  return (
    <Layout back close>
      <GlobalStyle />
      <Landing />
    </Layout>
  );
}

export default Popup;
