import { InputSizeInput, InputSizeOutput } from '../types/inputSize';
import { SaveProductInput, SaveProductOutput } from '../types/remote';

import { client } from './index';

/** POST */

// 비교 사이즈 수동 입력
export const postSelfWrite = async (inputSize: InputSizeInput) => {
  const { data } = await client.post<InputSizeOutput>(`/inputSize`, inputSize);
  return data;
};

// 전체 옷장에 저장
export const saveProductToAllCloset = async (body: SaveProductInput) => {
  const { data } = await client.post<SaveProductOutput>('/toAllCloset', body);
  return;
  data;
};

// 사이즈 추천 결과 저장
export const saveRecommendedSizeResult = async () => {
  const { data } = await client.post('/saveBest');
  return data;
};

// 크롤링한 사이즈표 저장
export const postSizeTable = async () => {
  const { data } = await client.post('/toAllSize');
  return data;
};

/** GET */

// 사이즈 추천 결과 조회
export const fetchRecommendedSizeResult = async () => {
  const { data } = await client.get('/bestSize');
  return data;
};
