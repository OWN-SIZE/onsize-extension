import { RecoilRoot } from 'recoil';

import GlobalStyle from '../../styles/global';

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
