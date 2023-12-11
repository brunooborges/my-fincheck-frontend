import { createContext, useCallback, useState } from 'react';

interface DashBoardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  toggleValueVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
}

export const DashBoardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    if (localStorage.getItem('dashBoardValuesVisibility') === 'false') {
      return false;
    }
    return true;
  });
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(true);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);

    const invert = !areValuesVisible;
    localStorage.setItem('dashBoardValuesVisibility', invert.toString());
  }, [areValuesVisible]);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);
  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);
  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);
  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashBoardContext.Provider
      value={{
        areValuesVisible,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
