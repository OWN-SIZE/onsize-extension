const matchList = [
  'https://www.musinsa.com',
  'https://www.mrporter.com',
  'https://www.ssense.com',
  'https://www.okmall.com',
  'https://product.29cm.co.kr',
  'https://www.wconcept.co.kr',
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
      }
    });
  });
  chrome.tabs.onUpdated.addListener((tabs) => {
    chrome.tabs.query({ active: true }, (tab) => {
      const url = tab[0].url;
      if (!url) return;
      if (url.includes('ownsize.me')) {
        reloadUserData(tabs);
      }

      if (matchList.some((v) => url.includes(v))) {
        reloadProductData(tabs);
        reloadSizeTable(tabs);
      }
    });
  });
};
refreshExtension();
chrome.tabs.onUpdated.removeListener(refreshExtension);
