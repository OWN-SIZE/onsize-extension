let tabs;
(async () => {
  tabs = await chrome.tabs.query({ url: 'https://www.musinsa.com/*/goods/*' });
  chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, file: 'script/productContent.js' } as any);

  tabs = await chrome.tabs.query({ url: 'https://www.mrporter.com/*/product/*' });
  chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, file: 'script/productContent.js' } as any);

  tabs = await chrome.tabs.query({ url: 'https://www.ssense.com/*/product/*' });
  chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, file: 'script/productContent.js' } as any);
})();
