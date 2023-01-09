import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { mySizeState, productState } from '../../states/atom';
import GlobalStyle from '../../styles/global';

import SaveProduct from './save-product';
import SizeOption from './size-option';

function Popup() {
  const mySize = useRecoilValue(mySizeState);

  return (
    <>
      <GlobalStyle />
      {/* <SizeOption /> */}
      <SaveProduct />
      {/* <NoSize /> */}
      {/* <SizeWrite sizeType="상의" /> */}
      {/* {mySize ? <SizeCompare isSelfWrite={true} /> : <CannotLoadSize />} */}
    </>
  );
}

export default Popup;

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <Popup />
    </RecoilRoot>
  </React.StrictMode>,
);
