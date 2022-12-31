import { render } from 'react-dom';
import Popup from './Popup';
import GlobalStyle from '../../styles/global';

render(
  <>
    <GlobalStyle />
    <Popup />
  </>,
  window.document.querySelector('#app-container'),
);
