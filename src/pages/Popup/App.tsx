import { RecoilRoot } from 'recoil';

import { AxiosInterceptor } from '../../apis';
import GlobalStyle from '../../styles/global';

import Popup from './Popup';

function App() {
  return (
    <RecoilRoot>
      <AxiosInterceptor>
        <GlobalStyle />
        <Popup />
      </AxiosInterceptor>
    </RecoilRoot>
  );
}

export default App;
