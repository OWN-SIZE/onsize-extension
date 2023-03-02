const matchList = [
  'https://www.musinsa.com/[a-zA-Z]*/goods/[a-zA-Z]*',
  'https://www.mrporter.com/.*/[a-zA-Z]*/product/[a-zA-Z]*',
  'https://www.ssense.com/.*/[a-zA-Z]*/product/[a-zA-Z]*',
  'https://www.okmall.com/products/view?.*',
  'https://product.29cm.co.kr/[a-zA-Z]*',
  'https://www.wconcept.co.kr/Product/[a-zA-Z]*',
];
const shoppingMallList = [
  'https://www.musinsa.com/',
  'https://www.mrporter.com/',
  'https://www.ssense.com/',
  'https://www.okmall.com/',
  'https://www.29cm.co.kr/',
  'https://www.wconcept.co.kr/',
];

const webstoreUrl = 'https://chrome.google.com/webstore';
const websiteUrl = 'ownsize.me';

const reloadUserData = (tabId: number) => {
  chrome.scripting.executeScript({ target: { tabId }, files: ['/script/getUserData.js'] });
};

const reloadProductData = (tabId: number) => {
  chrome.scripting.executeScript({ target: { tabId }, files: ['/script/productContent.js'] });
};

const reloadSizeTable = (tabId: number) => {
  chrome.scripting.executeScript({ target: { tabId }, files: ['/script/sizeTableContent.js'] });
};

const activate = () => {
  chrome.action.setIcon({
    path: '/assets/img/icon32.png',
  });
  chrome.action.setPopup({ popup: 'popup.html' });
  chrome.storage.local.remove('currentView');
};

const inactivate = () => {
  chrome.action.setIcon({
    path: '/assets/img/icon-inactive.png',
  });
  chrome.action.setPopup({ popup: '' });
  chrome.storage.local.remove('currentView');
};

const inactivatedShowPopup = () => {
  chrome.action.setIcon({
    path: '/assets/img/icon-inactive.png',
  });
  chrome.action.setPopup({ popup: 'popup.html' });
};

const checkUrl = (url: string, tabId: number) => {
  if (url.includes(websiteUrl)) {
    reloadUserData(tabId);
  }

  if (url.includes(webstoreUrl)) {
    activate();
    return;
  }

  const isShoppingMallDetailPage = matchList.some((v) => {
    const regex = new RegExp(v);
    return url.match(regex);
  });

  const isShoppingMall = shoppingMallList.some((v) => {
    return url.includes(v);
  });

  if (isShoppingMallDetailPage) {
    reloadProductData(tabId);
    reloadSizeTable(tabId);
    activate();
  } else {
    if (isShoppingMall) {
      inactivate();
    } else {
      inactivatedShowPopup();
      chrome.storage.local.set({ currentView: 'check-enable' });
    }
  }
};

const checkIsExtensionDownloaded = async (tabId: number) => {
  const { isDownload } = await chrome.storage.local.get(['isDownload']);
  if (isDownload) {
    chrome.tabs.update(tabId, {
      url: 'https://ownsize.me/login',
    });
  }
};

const refreshExtension = () => {
  chrome.tabs.onActivated.addListener((activeInfo) => {
    const { tabId } = activeInfo;

    chrome.tabs.query({ active: true }, (tab) => {
      const url = tab[0].url;
      if (!url) return;

      checkUrl(url, tabId);
    });
  });
  chrome.tabs.onUpdated.addListener((tabs, changeInfo) => {
    const { status } = changeInfo;

    if (status === 'loading') {
      inactivate();
    }
    if (status === 'complete') {
      activate();

      chrome.tabs.query({ active: true }, (tab) => {
        const url = tab[0].url;
        if (!url) return;
        checkUrl(url, tabs);

        if (url === 'https://ownsize.me/landing') {
          checkIsExtensionDownloaded(tabs);
        }
      });
    }
  });
};
refreshExtension();
chrome.tabs.onUpdated.removeListener(refreshExtension);
