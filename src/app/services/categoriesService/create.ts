import { httpClient } from '../httpClient';

export interface CreateCategoryParams {
  name: string;
  type: 'EXPENSE' | 'INCOME';
}

export async function create(params: CreateCategoryParams) {
  const { data } = await httpClient.post('/categories', params);

  return data;
}
