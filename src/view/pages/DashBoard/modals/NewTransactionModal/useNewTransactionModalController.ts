import { useDashBoard } from '../../components/DashBoardContext/useDashBoard';

export function useNewTransactionModalController() {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } =
    useDashBoard();

  return { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType };
}
