import axios from 'axios';

const token = '';
export const BASE_URL = `${process.env.REACT_APP_SERVER}`;

export const client = axios.create({
  baseURL: `${BASE_URL}/extension`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
