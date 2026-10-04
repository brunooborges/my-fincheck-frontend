import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { MONTHS } from '../../../../../../app/config/constants';
import { cn } from '../../../../../../app/utils/cn';
import { Button } from '../../../../../components/Button';
import { Input } from '../../../../../components/Input';
import { Modal } from '../../../../../components/Modal';
import { Select } from '../../../../../components/Select';
import { TransactionsFilters } from '../../../../../../app/services/transactionsService/getAll';
import { useFiltersModalController } from './useFiltersModalContoller';

interface FiltersModalProps {
  open: boolean;
  filters: Pick<TransactionsFilters, 'month' | 'year' | 'bankAccountId' | 'search'>;
  onClose(): void;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
    month: number;
    search?: string;
  }): void;
  onClearFilters(): void;
}

export function FiltersModal({
  open,
  filters,
  onClose,
  onApplyFilters,
  onClearFilters,
}: FiltersModalProps) {
  const {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
    selectedMonth,
    handleChangeMonth,
    search,
    handleChangeSearch,
    accounts,
    monthOptions,
  } = useFiltersModalController({ filters });

  const today = new Date();

  const activeFiltersCount = [
    selectedBankAccountId,
    selectedYear !== today.getFullYear(),
    selectedMonth !== today.getMonth(),
    search.trim(),
  ].filter(Boolean).length;

  const activeSummary = [
    selectedBankAccountId &&
      accounts.find((account) => account.id === selectedBankAccountId)?.name,
    selectedMonth !== today.getMonth() && MONTHS[selectedMonth],
    selectedYear !== today.getFullYear() && String(selectedYear),
    search.trim() && `Busca: "${search.trim()}"`,
  ].filter((item): item is string => Boolean(item));

  return (
    <Modal
      title='Filtros'
      open={open}
      onClose={onClose}
    >
      {activeSummary.length > 0 && (
        <div className='bg-teal-900/5 border border-teal-900/10 rounded-xl p-3 mb-6'>
          <span className='text-xs font-medium text-teal-900 uppercase tracking-wide'>
            Filtros ativos ({activeFiltersCount})
          </span>
          <p className='mt-1 text-sm text-gray-800'>
            {activeSummary.join(' • ')}
          </p>
        </div>
      )}

      <div>
        <span className='text-lg tracking-[-1px] font-bold text-gray-800'>Conta</span>
        <div className='space-y-2 mt-2'>
          {accounts.map((account) => (
            <button
              onClick={() => handleSelectBankAccount(account.id)}
              key={account.id}
              className={cn(
                'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors',
                account.id === selectedBankAccountId && '!bg-gray-200',
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-8 text-gray-800'>
        <span className='text-lg tracking-[-1px] font-bold'>Ano</span>

        <div className='mt-2 w-52 flex items-center justify-between'>
          <button
            className='w-12 h-12 flex items-center justify-center'
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className='w-6 h-6' />
          </button>
          <div className='flex-1 text-center'>
            <span className='text-sm font-medium tracking-[-0.5px]'>{selectedYear}</span>
          </div>
          <button
            className='w-12 h-12 flex items-center justify-center'
            onClick={() => handleChangeYear(1)}
          >
            <ChevronRightIcon className='w-6 h-6' />
          </button>
        </div>
      </div>

      <div className='mt-8 text-gray-800'>
        <span className='text-lg tracking-[-1px] font-bold'>Mês</span>
        <div className='mt-2'>
          <Select
            placeholder='Mês'
            options={monthOptions}
            value={String(selectedMonth)}
            onChange={handleChangeMonth}
          />
        </div>
      </div>

      <div className='mt-8 text-gray-800'>
        <span className='text-lg tracking-[-1px] font-bold'>Buscar por nome</span>
        <div className='mt-2'>
          <Input
            name='search'
            placeholder='Digite o nome da transação'
            value={search}
            maxLength={100}
            onChange={(event) => handleChangeSearch(event.target.value)}
          />
        </div>
      </div>

      <div className='mt-10 space-y-3'>
        <Button
          className='w-full'
          onClick={() =>
            onApplyFilters({
              bankAccountId: selectedBankAccountId,
              year: selectedYear,
              month: selectedMonth,
              search: search.trim() || undefined,
            })
          }
        >
          Aplicar Filtros
        </Button>

        <Button
          variant='ghost'
          className='w-full'
          onClick={onClearFilters}
        >
          Limpar Filtros
        </Button>
      </div>
    </Modal>
  );
}
