import { createContext, useCallback, useState } from 'react';
import { BankAccount } from '../../../../../app/services/entities/BankAccount';
import { Category } from '../../../../../app/services/entities/Category';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  toggleValueVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: null | BankAccount;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
  isEditCategoriesModalOpen: boolean;
  isCategoryBeingEdited: boolean;
  openEditCategoriesModal(): void;
  closeEditCategoriesModal(): void;
  openNewCategoryModal(): void;
  closeNewCategoryModal(): void;
  isNewCategoryModalOpen: boolean;
  onSelectCategory(category: Category): void;
  categoryBeingEdited: null | Category;
  isEditUserModalOpen: boolean;
  openEditUserModal(): void;
  closeEditUserModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    if (localStorage.getItem('dashboardValuesVisibility') === 'false') {
      return false;
    }
    return true;
  });
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null);
  const [isEditCategoriesModalOpen, setIsEditCategoriesModalOpen] = useState(false);
  const [isCategoryBeingEdited, setIsCategoryBeingEdited] = useState(false);
  const [categoryBeingEdited, setCategoryBeingEdited] = useState<null | Category>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);

    const invert = !areValuesVisible;
    localStorage.setItem('dashboardValuesVisibility', invert.toString());
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
  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);
  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
  }, []);
  const openNewCategoryModal = useCallback(() => {
    setIsNewCategoryModalOpen(true);
  }, []);
  const closeNewCategoryModal = useCallback(() => {
    setIsNewCategoryModalOpen(false);
  }, []);
  const openEditCategoriesModal = useCallback(() => {
    setIsCategoryBeingEdited(true);
    setIsEditCategoriesModalOpen(true);
  }, []);
  const closeEditCategoriesModal = useCallback(() => {
    setIsCategoryBeingEdited(false);
    setIsEditCategoriesModalOpen(false);
  }, []);
  const onSelectCategory = useCallback((category: Category) => {
    setCategoryBeingEdited(category);
  }, []);
  const openEditUserModal = useCallback(() => {
    setIsEditUserModalOpen(true);
  }, []);
  const closeEditUserModal = useCallback(() => {
    setIsEditUserModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
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
        isEditAccountModalOpen,
        accountBeingEdited,
        openEditAccountModal,
        closeEditAccountModal,
        openNewCategoryModal,
        closeNewCategoryModal,
        isNewCategoryModalOpen,
        isEditCategoriesModalOpen,
        openEditCategoriesModal,
        closeEditCategoriesModal,
        isCategoryBeingEdited,
        onSelectCategory,
        categoryBeingEdited,
        isEditUserModalOpen,
        openEditUserModal,
        closeEditUserModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
