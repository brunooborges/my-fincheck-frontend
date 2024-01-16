import { httpClient } from '../httpClient';

export interface UpdateCategoryParams {
  id: string;
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function update({ id, ...params }: UpdateCategoryParams) {
  const { data } = await httpClient.put(`/categories/${id}`, params);

  return data;
}
