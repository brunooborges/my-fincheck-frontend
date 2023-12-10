import { Logo } from '../../components/Logo';
import { Modal } from '../../components/Modal';
import { UserMenu } from '../../components/UserMenu';
import { DashBoardProvider } from './DashBoardContext';
import { Accounts } from './components/Accounts';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';

export function DashBoard() {
  return (
    <DashBoardProvider>
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
      </div>
    </DashBoardProvider>
  );
}