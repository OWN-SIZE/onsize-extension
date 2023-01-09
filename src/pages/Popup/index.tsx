import React from 'react';
import ReactDOM from 'react-dom/client';
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

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ? 'from a content script in popup:' + sender.tab.url : 'from the extension');
    console.log('request in popup', request);
    if (request.isSizeTableExist === 'exist') sendResponse({ farewell: 'i want to go home' });
  });

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
