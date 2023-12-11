import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import emptyStateImage from '../../../../../assets/empty-state.svg';
import { Spinner } from '../../../../components/Spinner';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
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
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

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
            onClose={handleCloseFiltersModal}
          />

          <header>
            <div className='flex items-center justify-between'>
              <TransactionTypeDropdown />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className='mt-6 relative'>
              <Swiper
                slidesPerView={3}
                centeredSlides
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
                <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
                  <div className='flex-1 flex items-center gap-3'>
                    <CategoryIcon type='expense' />
                    <div className=''>
                      <strong className='block font-bold tracking-[-0.5px]'>
                        Almoço
                      </strong>
                      <span className='text-sm text-gray-600'>05/12/2023</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-red-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-sm',
                    )}
                  >
                    - {formatCurrency(150)}
                  </span>
                </div>
                <div className='bg-white p-4 rounded-2xl flex items-center justify-between gap-4'>
                  <div className='flex-1 flex items-center gap-3'>
                    <CategoryIcon type='income' />
                    <div className=''>
                      <strong className='block font-bold tracking-[-0.5px]'>
                        Almoço
                      </strong>
                      <span className='text-sm text-gray-600'>05/12/2023</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-green-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-sm',
                    )}
                  >
                    + {formatCurrency(150)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
