import { useEffect, useState } from 'react';
import { MONTHS } from '../../../../../../app/config/constants';
import { useBankAccounts } from '../../../../../../app/hooks/useBankAccounts';
import { TransactionsFilters } from '../../../../../../app/services/transactionsService/getAll';

interface UseFiltersModalControllerParams {
  filters: TransactionsFilters;
}

export function useFiltersModalController({ filters }: UseFiltersModalControllerParams) {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(
    filters.bankAccountId,
  );
  const [selectedYear, setSelectedYear] = useState(filters.year);
  const [selectedMonth, setSelectedMonth] = useState(filters.month);
  const [search, setSearch] = useState(filters.search ?? '');

  useEffect(() => {
    setSelectedBankAccountId(filters.bankAccountId);
    setSelectedYear(filters.year);
    setSelectedMonth(filters.month);
    setSearch(filters.search ?? '');
  }, [filters]);

  const { accounts } = useBankAccounts();

  const monthOptions = MONTHS.map((month, index) => ({
    value: String(index),
    label: month,
  }));

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId,
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  function handleChangeMonth(value: string) {
    setSelectedMonth(Number(value));
  }

  function handleChangeSearch(value: string) {
    setSearch(value);
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    selectedMonth,
    handleChangeMonth,
    search,
    handleChangeSearch,
    accounts,
    monthOptions,
  };
}
