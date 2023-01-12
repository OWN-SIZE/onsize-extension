import { useRecoilValue } from 'recoil';

import { currentViewState } from '../../states/atom';
import GlobalStyle from '../../styles/global';

import First from './first';
import Result from './result';
import SaveProduct from './save-product';
import SizeCompare from './size-compare';
import SizeOption from './size-option';
import SizeWrite from './size-write';

function Popup() {
  const currentView = useRecoilValue(currentViewState);

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ? 'from a content script in popup:' + sender.tab.url : 'from the extension');
    console.log('request in popup', request);
    if (request.isSizeTableExist === 'exist') sendResponse({ farewell: 'i want to go home' });
  });

  const renderView = () => {
    switch (currentView) {
      case 'first':
        return <First />;
      case 'size-option':
        return <SizeOption />;
      case 'result':
        return <Result />;
      case 'compare':
        return <SizeCompare />;
      case 'save':
        return <SaveProduct />;
      case 'size-write':
        return <SizeWrite />;
    }
  };

  return (
    <>
      <GlobalStyle />
      {renderView()}
    </>
  );
}

export default Popup;
