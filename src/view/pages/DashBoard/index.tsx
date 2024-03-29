import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import { DashboardContext, DashboardProvider } from './components/DashboardContext';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { EditAccountModal } from './modals/EditAccountModal';
import { EditCategoryModal } from './modals/EditCategoryModal';
import { EditUserModal } from './modals/EditUserModal';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewCategoryModal } from './modals/NewCategoryModal';
import { NewTransactionModal } from './modals/NewTransactionModal';

export function DashBoard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited, isCategoryBeingEdited }) => (
          <div className='h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4'>
            <header className='h-12 flex items-center justify-between'>
              <Logo className='h-6 text-teal-900' />
              <UserMenu />
            </header>

            <main className='flex-1 flex flex-col md:flex-row gap-4 max-h-full'>
              <section className='w-full md:w-1/2'>
                <Accounts />
              </section>

              <section className='w-full md:w-1/2'>
                <Transactions />
              </section>
            </main>

            <Fab />

            <NewAccountModal />
            <NewTransactionModal />
            <NewCategoryModal />
            {accountBeingEdited && <EditAccountModal />}
            {isCategoryBeingEdited && <EditCategoryModal />}
            <EditUserModal />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
