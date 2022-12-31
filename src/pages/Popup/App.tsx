import GlobalStyle from '../../styles/global';
import { RecoilRoot } from 'recoil';
import Popup from './Popup';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Popup />
    </RecoilRoot>
  );
}

export default App;
