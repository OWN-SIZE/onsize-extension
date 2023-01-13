import axios, { AxiosRequestConfig } from 'axios';

const token = '';
export const BASE_URL = process.env.REACT_APP_SERVER;

export const client = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
});

client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (config.headers && !config.headers['Authorization']) {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
