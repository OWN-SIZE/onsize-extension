import { SaveProductInput, SaveProductResponse } from '../types/remote';

import { client } from '.';

export const postProduct = async (payload: SaveProductInput) => {
  const { data } = await client.post<SaveProductResponse>('/toAllCloset', payload);
  return data;
};
