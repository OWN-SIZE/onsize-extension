(async () => {
  const { token } = await chrome.storage.local.get(['token']);
  const { userId } = await chrome.storage.local.get(['userId']);
  const { isRegister } = await chrome.storage.local.get(['isRegister']);

  isRegister && localStorage.setItem('isRegister', isRegister);
  userId && localStorage.setItem('userId', userId);
  token && localStorage.setItem('token', token);
})();
