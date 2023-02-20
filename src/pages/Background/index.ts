const matchList = [
  'https://www.musinsa.com',
  'https://www.mrporter.com',
  'https://www.ssense.com',
  'https://www.okmall.com',
  'https://product.29cm.co.kr',
  'https://www.wconcept.co.kr',
];

function listener() {
  chrome.tabs.onUpdated.addListener((tabs) => {
    chrome.tabs.query({ active: true }, (tab) => {
      const url = tab[0].url;
      if (!url) return;
      if (url.includes('ownsize.me')) {
        chrome.scripting.executeScript({ target: { tabId: tabs }, files: ['/script/getUserData.js'] });
        console.log('getUserData script reload');
      }

      if (matchList.some((v) => url.includes(v))) {
        chrome.scripting.executeScript({ target: { tabId: tabs }, files: ['/script/productContent.js'] }).then(() => {
          console.log('productContent script reload');
        });
      }
    });
  });
}
listener();
chrome.tabs.onUpdated.removeListener(listener);
