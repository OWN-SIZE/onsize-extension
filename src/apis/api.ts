import { InputSizeInput, InputSizeOutput } from '../types/inputSize';

import { client } from './index';

export const postSelfWrite = async (inputSize: InputSizeInput) => {
  const { data } = await client.post<InputSizeOutput>(`/extension/inputSize`, inputSize);
  return data;
};
