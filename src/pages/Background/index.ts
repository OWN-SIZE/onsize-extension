chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.isSizeTableExist === 'exist') sendResponse({ status: 'success' });
  else sendResponse({ status: 'failed' });
});
