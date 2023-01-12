chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.sizeTable) {
    sendResponse({ status: 'success' });
  } else {
    sendResponse({ status: 'failed' });
  }
});
