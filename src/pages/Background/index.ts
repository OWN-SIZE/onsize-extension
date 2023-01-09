console.log('This is the background page.');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ? 'from a content script in bg:' + sender.tab.url : 'from the extension');
  console.log('request in bg', request);

  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
});

chrome.runtime.sendMessage({ popup: 'popup' }, function (response) {
  console.log(response.bye);
});
