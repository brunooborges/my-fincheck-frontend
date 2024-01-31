import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { Transaction } from '../../../../../app/services/entities/Transaction';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor'),
    z.number().min(1, 'Informe o valor'),
  ]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationFn: transactionsService.update,
  });
  const { isPending: isPendingAll, mutateAsync: updateAllInstallmentsTransaction } =
    useMutation({
      mutationFn: transactionsService.updateAllInstallments,
    });

  const { isPending: isPendingDelete, mutateAsync: removeTransaction } = useMutation({
    mutationFn: transactionsService.remove,
  });
  const {
    isPending: isPendingAllDelete,
    mutateAsync: removeAllTransactionsInstallments,
  } = useMutation({
    mutationFn: transactionsService.removeAllInstallments,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
        installmentOption: transaction!.installmentOption,
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'A despesa foi editada com sucesso'
          : 'A receita foi editada com sucesso',
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao salvar a despesa!'
          : 'Erro ao salvar a receita!',
      );
    }
  });

  const handleAllSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAllInstallmentsTransaction({
        ...data,
        installmentId: transaction!.installmentId,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        installmentOption: transaction!.installmentOption,
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'A despesa foi editada com sucesso'
          : 'A receita foi editada com sucesso',
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao salvar a despesa!'
          : 'Erro ao salvar a receita!',
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === transaction?.type);
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'A despesa foi deletada com sucesso!'
          : 'A receita foi deletada com sucesso!',
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao deletar a despesa!'
          : 'Erro ao deletar a receita!',
      );
    }
  }

  async function handleDeleteAllTransactionInstallments() {
    try {
      await removeAllTransactionsInstallments(transaction!.installmentId);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'As despesas foram deletadas com sucesso!'
          : 'As receitas foram deletadas com sucesso!',
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao deletar as despesas!'
          : 'Erro ao deletar as receitas!',
      );
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    handleAllSubmit,
    accounts,
    categories,
    isPending,
    isPendingAll,
    isPendingDelete,
    isPendingAllDelete,
    isDeleteModalOpen,
    handleDeleteTransaction,
    handleDeleteAllTransactionInstallments,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
