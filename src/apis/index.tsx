import { PropsWithChildren, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useRecoilState } from 'recoil';

import { userDataState } from '../states/atom';

export const BASE_URL = process.env.REACT_APP_SERVER ?? '';

export default function createAxios(endpoint: string, config?: AxiosRequestConfig) {
  const axiosBasic = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', ...config?.headers },
    ...config,
  });

  const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', ...config?.headers },
    ...config,
  });

  return {
    axiosBasic,
    client,
  };
}

function AxiosInterceptor({ children }: PropsWithChildren) {
  const [, setUserData] = useRecoilState(userDataState);
  const token = localStorage.getItem('token') || '';

  const requestIntercept = client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers['Authorization']) {
        config.headers['Authorization'] = `${token}`;
        return config;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseIntercept = client.interceptors.response.use(
    (config) => config,
    async (error) => {
      const config = error.config;
      if (error.response.status === 400) {
        alert('상품 상세 페이지에서 이용해주세요.');
        return;
      }
      if (error.response.status === 401) {
        if (!config.headers['Authorization']) {
          const result = confirm('로그인 후 이용해 주세요');
          setUserData((prev) => ({ ...prev, userId: 0, token: '' }));
          result ? window.open('https://ownsize.me/login') : window.close();
        } else {
          const result = confirm('세션이 만료되었습니다. 다시 로그인 해주세요.');
          result ? window.open('https://ownsize.me/login') : window.close();
        }
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(requestIntercept);
      client.interceptors.response.eject(responseIntercept);
    };
  }, [requestIntercept, responseIntercept]);

  return <>{children}</>;
}

const { axiosBasic, client } = createAxios(BASE_URL);

export { axiosBasic, client, AxiosInterceptor };
