import { useState } from 'react';
import { useDashBoard } from '../DashBoardContext/useDashBoard';
export function useTransactionsController() {
  const { areValuesVisible } = useDashBoard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
  };
}
