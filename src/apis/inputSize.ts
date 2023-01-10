import { InputSizeInput, InputSizeOutput } from '../types/inputSize';

import { client } from './index';

export const postInputSize = async (inputSize: InputSizeInput) => {
  const { data } = await client.post<InputSizeOutput>(`/extension/inputSize`, inputSize);
  return data;
};
