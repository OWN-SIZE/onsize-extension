console.log('This is the background page.');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
});

chrome.runtime.sendMessage({ popup: 'popup' }, function (response) {
  console.log(response.bye);
});
