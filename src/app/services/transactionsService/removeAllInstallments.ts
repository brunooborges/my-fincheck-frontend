import { httpClient } from '../httpClient';

export async function removeAllInstallments(installmentId: string) {
  const { data } = await httpClient.delete(`/transactions/installments/${installmentId}`);

  return data;
}
