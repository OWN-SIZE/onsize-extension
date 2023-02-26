import { useRecoilState } from 'recoil';

import { currentViewState, mySizeState, userDataState } from '../../states/atom';

export const useRedirect = () => {
  const [, setCurrentView] = useRecoilState(currentViewState);
  const [, setMySize] = useRecoilState(mySizeState);
  const [, setUserData] = useRecoilState(userDataState);

  const redirect = async () => {
    const { token } = await chrome.storage.local.get(['token']);
    const { userId } = await chrome.storage.local.get(['userId']);
    const { isRegister } = await chrome.storage.local.get(['isRegister']);
    localStorage.setItem('token', token || '');
    localStorage.setItem('userId', userId || '');
    localStorage.setItem('isRegister', isRegister || '');

    setUserData({ isRegister, userId: +userId, token });

    // 회원이 아닌 경우
    if (!isRegister && !userId) {
      setCurrentView('first');
      return;
    }

    // 로그인만 하고 실측치 입력을 안 한 경우
    if (!isRegister && userId) {
      setMySize({
        top: {
          topLength: 0,
          chest: 0,
          shoulder: 0,
          isWidthOfTop: true,
        },
        bottom: {
          bottomLength: 0,
          waist: 0,
          rise: 0,
          hem: 0,
          thigh: 0,
          isWidthOfBottom: true,
        },
      });
      return;
    }
  };

  return { redirect };
};
