import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { categoriesService } from '../../../../../app/services/categoriesService';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  icon: z.string().min(1, 'Escolha o ícone'),
  type: z.enum(['EXPENSE', 'INCOME']),
});

type FormData = z.infer<typeof schema>;

export function useNewCategoryModalController() {
  const { isNewCategoryModalOpen, closeNewCategoryModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories } = useCategories();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: categoriesService.create,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria cadastrada com sucesso');
      closeNewCategoryModal();
      reset();
    } catch {
      toast.error('Erro ao cadastrar a categoria!');
    }
  });

  return {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    isPending,
    categories,
  };
}
