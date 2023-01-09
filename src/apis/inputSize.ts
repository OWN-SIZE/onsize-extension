import { InputSizeInput } from '../types/inputSize';

import { client } from './index';

export const postInputSize = async (inputSize: InputSizeInput) => {
  const { data } = await client.post<InputSizeInput>(`/extension/inputSize`, inputSize);
  return data;
};
