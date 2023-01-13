const isRegister = localStorage.getItem('isRegister');
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

chrome.storage.local.set({ isRegister });
chrome.storage.local.set({ userId });
chrome.storage.local.set({ token });

(async () => {
  const { token } = await chrome.storage.local.get(['token']);
  const { userId } = await chrome.storage.local.get(['userId']);
  const { isRegister } = await chrome.storage.local.get(['isRegister']);

  isRegister && localStorage.setItem('isRegister', isRegister);
  userId && localStorage.setItem('userId', userId);
  token && localStorage.setItem('token', token);
})();

console.log(isRegister, userId, token);
