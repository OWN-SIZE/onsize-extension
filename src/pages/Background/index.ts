chrome.tabs.onUpdated.addListener((tabs) => {
  chrome.scripting.executeScript({ target: { tabId: tabs }, files: ['/script/productContent.js'] });
});
