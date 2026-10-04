import { Cross2Icon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { formatDate } from '../../../../../app/utils/formatDate';
import emptyStateImage from '../../../../../assets/empty-state.svg';
import { Spinner } from '../../../../components/Spinner';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { EditTransactionModal } from '../../modals/EditTransactionModal';
import { FiltersModal } from './FiltersModal';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleClearFilters,
    handleCloseEditModal,
    handleOpenEditModal,
    isEditModalOpen,
    transactionBeingEdited,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  const today = new Date();
  const hasActiveFilters =
    filters.year !== today.getFullYear() ||
    filters.month !== today.getMonth() ||
    Boolean(filters.bankAccountId) ||
    Boolean(filters.search) ||
    Boolean(filters.type);

  return (
    <div className='bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col'>
      {isInitialLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner className='w-10 h-10' />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            filters={filters}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />

          <header>
            <div className='flex items-center justify-between'>
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button
                onClick={handleOpenFiltersModal}
                className={cn(
                  'relative p-2 rounded-full transition-colors',
                  hasActiveFilters ? 'bg-teal-900/10 text-teal-900' : 'text-gray-800',
                )}
              >
                <FilterIcon />
                {hasActiveFilters && (
                  <span className='absolute top-0 right-0 w-2.5 h-2.5 bg-teal-900 rounded-full ring-2 ring-gray-100' />
                )}
              </button>
            </div>

            {hasActiveFilters && (
              <div className='mt-4 flex items-center gap-2'>
                <span className='text-xs font-medium text-gray-700'>Filtros ativos:</span>
                <div className='flex items-center gap-2 flex-wrap'>
                  {filters.search && (
                    <span className='inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-gray-800 shadow-sm'>
                      &quot;{filters.search}&quot;
                    </span>
                  )}
                  <span className='inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-gray-800 shadow-sm'>
                    {MONTHS[filters.month]} {filters.year}
                  </span>
                  {filters.bankAccountId && (
                    <span className='inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-gray-800 shadow-sm'>
                      Conta selecionada
                    </span>
                  )}
                  <button
                    onClick={handleClearFilters}
                    className='inline-flex items-center gap-1 text-xs text-red-900 font-medium hover:underline'
                  >
                    <Cross2Icon className='w-3 h-3' />
                    Limpar
                  </button>
                </div>
              </div>
            )}

            <div className='mt-6 relative'>
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                key={filters.year}
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        index={index}
                        isActive={isActive}
                        month={month}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className='mt-4 space-y-2 flex-1 overflow-y-auto'>
            {isLoading && (
              <div className='flex flex-col items-center justify-center h-full'>
                <Spinner className='w-10 h-10' />{' '}
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className='flex flex-col items-center justify-center h-full'>
                <img
                  src={emptyStateImage}
                  alt='Empty State'
                />
                <p className='text-gray-700 text-center'>
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}
                {transactions.map((transaction) => (
                  <div
                    className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'
                    key={transaction.id}
                    role='button'
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className='flex-1 flex items-center gap-3'>
                      <CategoryIcon
                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                        category={transaction.category?.icon}
                      />
                      <div className=''>
                        <strong className='block font-bold tracking-[-0.5px]'>
                          {transaction.name}
                        </strong>
                        <span className='text-sm text-gray-600'>
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'tracking-[-0.5px] font-medium',
                        transaction.type === 'EXPENSE'
                          ? 'text-red-800'
                          : 'text-green-800',
                        !areValuesVisible && 'blur-sm',
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '-' : '+'}{' '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
