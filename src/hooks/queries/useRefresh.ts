import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

import { fetchRefresh } from '../../apis/api';
import { userDataState } from '../../states/atom';
import { RefreshInput } from '../../types/remote';

export const useRefresh = (token: RefreshInput) => {
  const [user, setUser] = useRecoilState(userDataState);

  const refresh = async () => {
    try {
      const { data } = await fetchRefresh(token);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400:
          case 401: {
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            localStorage.setItem('userId', '');
            localStorage.setItem('token', '');
            setUser({
              ...user,
              token: '',
            });
            window.close();
            return;
          }
        }
        return Promise.reject(error);
      }
    }
  };
  return refresh;
};
