import { useDashBoard } from '../../DashBoardContext/useDashBoard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashBoard();

  return { areValuesVisible, isInitialLoading: false, isLoading: false, transactions: [] };
}
