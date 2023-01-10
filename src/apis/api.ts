import { SaveProductInput, SaveProductOutput } from '../types/remote';

import { client } from '.';

export const postProduct = async (payload: SaveProductInput) => {
  const { data } = await client.post<SaveProductOutput>('/toAllCloset', payload);
  return data;
};
