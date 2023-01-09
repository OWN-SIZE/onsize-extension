import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { currentViewState } from '../../states/atom';
import GlobalStyle from '../../styles/global';

import Popup from './Popup';
import Result from './result';
import SaveProduct from './save-product';
import SizeCompare from './size-compare';
import SizeOption from './size-option';
import SizeWrite from './size-write';

function PopupLayout() {
  const currentView = useRecoilValue(currentViewState);

  const renderView = () => {
    switch (currentView) {
      case 'size-option':
        return <SizeOption />;
      case 'result':
        return <Result />;
      case 'compare':
        return <SizeCompare />;
      case 'save':
        return <SaveProduct />;
    }
  };

  return (
    <Popup>
      {renderView()}
      {/* <SizeWrite /> */}
    </Popup>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <PopupLayout />
    </RecoilRoot>
  </React.StrictMode>,
);
