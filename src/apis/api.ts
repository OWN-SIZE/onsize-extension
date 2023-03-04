import { InputSizeInput, InputSizeOutput } from '../types/inputSize';
import {
  MySizeOutput,
  PostSizeTableInput,
  PostSizeTableOutput,
  RefreshInput,
  RefreshOutput,
  SaveProductInput,
  SaveProductOutput,
  SaveResultInput,
  SaveResultOutput,
} from '../types/remote';

import { axiosBasic, client } from './index';

// 마이사이즈 조회
export const fetchMySize = async () => {
  const { data } = await client.get<MySizeOutput>(`/mySize`);
  return data;
};

// 비교 사이즈 수동 입력
export const postSelfWrite = async (inputSize: InputSizeInput) => {
  const { data } = await client.post<InputSizeOutput>(`/extension/inputSize`, inputSize);
  return data;
};

// 전체 옷장에 저장
export const saveProductToAllCloset = async (body: SaveProductInput) => {
  const { data } = await client.post<SaveProductOutput>('/extension/toAllCloset', body);
  return data;
};

// 사이즈 추천 결과 저장
export const saveResult = async (body: SaveResultInput) => {
  const { data } = await client.post<SaveResultOutput>('/extension/saveBest', body);
  return data;
};

// 크롤링한 사이즈표 저장
export const postSizeTable = async (body: PostSizeTableInput) => {
  const { data } = await client.post<PostSizeTableOutput>('/extension/saveCrawling', body);
  return data;
};

export const fetchRefresh = async ({ accessToken }: RefreshInput): Promise<RefreshOutput> => {
  const { data } = await axiosBasic('/auth/token', {
    headers: {
      token: accessToken,
    },
  });
  return data;
};
