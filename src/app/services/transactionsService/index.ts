import { create } from './create';
import { getAll } from './getAll';
import { remove } from './remove';
import { removeAllInstallments } from './removeAllInstallments';
import { update } from './update';
import { updateAllInstallments } from './updateAllInstallments';

export const transactionsService = {
  create,
  getAll,
  update,
  remove,
  removeAllInstallments,
  updateAllInstallments,
};
