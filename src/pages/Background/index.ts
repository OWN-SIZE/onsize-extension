const matchList = [
  'https://www.musinsa.com/[a-zA-Z]*/goods/[a-zA-Z]*',
  'https://www.mrporter.com/[a-zA-Z]*/product/[a-zA-Z]*',
  'https://www.ssense.com/[a-zA-Z]*/product/[a-zA-Z]*',
  'https://www.okmall.com/products/[a-zA-Z]*',
  'https://product.29cm.co.kr/[a-zA-Z]*',
  'https://www.wconcept.co.kr/Product/[a-zA-Z]*',
];

const reloadUserData = (tabId: number) => {
  chrome.scripting.executeScript({ target: { tabId }, files: ['/script/getUserData.js'] });
};

const reloadProductData = (tabId: number) => {
  chrome.scripting.executeScript({ target: { tabId }, files: ['/script/productContent.js'] });
};

const reloadSizeTable = (tabId: number) => {
  chrome.scripting.executeScript({ target: { tabId }, files: ['/script/sizeTableContent.js'] });
};

const refreshExtension = () => {
  chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;
    chrome.tabs.query({ active: true }, (tab) => {
      const url = tab[0].url;
      if (!url) return;
      if (url.includes('ownsize.me')) {
        reloadUserData(tabId);
      }

      if (matchList.some((v) => url.includes(v))) {
        reloadProductData(tabId);
        reloadSizeTable(tabId);
      } else {
        chrome.action.setIcon({
          path: '/assets/img/icon-inactive.png',
        });
        chrome.action.setPopup({ popup: '' });
      }
    });
  });
  chrome.tabs.onUpdated.addListener((tabs, changeInfo) => {
    const { status } = changeInfo;

    if (status === 'loading') {
      chrome.action.setIcon({
        path: '/assets/img/icon-inactive.png',
      });
      chrome.action.setPopup({ popup: '' });
    }
    if (status === 'complete') {
      chrome.action.setIcon({
        path: '/assets/img/icon32.png',
      });
      chrome.action.setPopup({ popup: 'popup.html' });
    }

    chrome.tabs.query({ active: true }, (tab) => {
      const url = tab[0].url;
      if (!url) return;
      if (url.includes('ownsize.me')) {
        reloadUserData(tabs);
      }

      const isShoppingMall = matchList.some((v) => {
        const regex = new RegExp(v);
        return url.match(regex);
      });

      if (isShoppingMall) {
        reloadProductData(tabs);
        reloadSizeTable(tabs);
      } else {
        chrome.action.setIcon({
          path: '/assets/img/icon-inactive.png',
        });
        chrome.action.setPopup({ popup: '' });
      }
    });
  });
};
refreshExtension();
chrome.tabs.onUpdated.removeListener(refreshExtension);
