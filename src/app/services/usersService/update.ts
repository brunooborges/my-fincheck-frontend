import { httpClient } from '../httpClient';

export interface UpdateUserParams {
  id: string;
  name?: string;
  email?: string;
  newEmail?: string;
  password: string;
  newPassword?: string;
}

export async function update({ id, ...params }: UpdateUserParams) {
  const { data } = await httpClient.put(`/users/${id}`, params);

  return data;
}
