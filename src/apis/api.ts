import { InputSizeInput, InputSizeOutput } from '../types/inputSize';
import {
  PostSizeTableInput,
  PostSizeTableOutput,
  SaveProductInput,
  SaveProductOutput,
  SaveResultInput,
  SaveResultOutput,
} from '../types/remote';

import { client } from './index';

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
export const saveResult = async (body: SaveResultInput) => {
  const { data } = await client.post<SaveResultOutput>('/saveBest', body);
  return data;
};

// 크롤링한 사이즈표 저장
export const postSizeTable = async (body: PostSizeTableInput) => {
  const { data } = await client.post<PostSizeTableOutput>('/toAllSize', body);
  return data;
};
