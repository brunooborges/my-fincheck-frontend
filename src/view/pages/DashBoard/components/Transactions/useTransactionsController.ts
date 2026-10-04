import { useState } from 'react';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { Transaction } from '../../../../../app/services/entities/Transaction';
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll';
import { useDashboard } from '../DashboardContext/useDashboard';

function getCurrentDateFilters(): Pick<TransactionsFilters, 'month' | 'year'> {
  const today = new Date();

  return {
    month: today.getMonth(),
    year: today.getFullYear(),
  };
}

const INITIAL_FILTERS: TransactionsFilters = {
  ...getCurrentDateFilters(),
};

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null);
  const [filters, setFilters] = useState<TransactionsFilters>(INITIAL_FILTERS);

  const { transactions, isLoading, isInitialLoading } = useTransactions(filters);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
    month,
    search,
  }: {
    bankAccountId: string | undefined;
    year: number;
    month: number;
    search?: string;
  }) {
    setFilters((prevState) => ({
      ...prevState,
      bankAccountId,
      year,
      month,
      search,
    }));
    setIsFiltersModalOpen(false);
  }

  function handleClearFilters() {
    setFilters({
      ...getCurrentDateFilters(),
    });
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    isEditModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleClearFilters,
    transactionBeingEdited,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}
