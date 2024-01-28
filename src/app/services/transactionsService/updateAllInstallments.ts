import { httpClient } from '../httpClient';

export interface UpdateTransactionInstallmentsParams {
  installmentId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  installmentOption: number;
}

export async function updateAllInstallments({
  installmentId,
  ...params
}: UpdateTransactionInstallmentsParams) {
  const { data } = await httpClient.put(
    `/transactions/installments/${installmentId}`,
    params,
  );

  return data;
}
