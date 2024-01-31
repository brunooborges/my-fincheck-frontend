import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { categoriesService } from '../../../../../app/services/categoriesService';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  categoryId: z.string().min(1, 'Informe a categoria'),
  name: z.string().min(1, 'Informe o nome'),
  icon: z.string().min(1, 'Informe o ícone'),
  type: z.enum(['INCOME', 'EXPENSE']),
});

type FormData = z.infer<typeof schema>;

export function useEditCategoryModalController() {
  const {
    closeEditCategoriesModal,
    isCategoryBeingEdited,
    categoryBeingEdited,
    onSelectCategory,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { categories } = useCategories();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateCategory } = useMutation({
    mutationFn: categoriesService.update,
  });
  const { isPending: isPendingDelete, mutateAsync: removeCategory } = useMutation({
    mutationFn: categoriesService.remove,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateCategory({
        ...data,
        id: categoryBeingEdited!.id,
        name: data!.name,
        icon: data!.icon,
        type: data!.type,
      });

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('A categoria foi editada com sucesso');
      closeEditCategoriesModal();
    } catch {
      toast.error('Erro ao salvar a categoria!');
    }
  });

  async function handleDeleteCategory() {
    try {
      await removeCategory(categoryBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('A categoria foi deletada com sucesso');
      closeEditCategoriesModal();
    } catch {
      toast.error('Erro ao deletar a categoria!');
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
    categories,
    handleSubmit,
    isPending,
    isPendingDelete,
    isDeleteModalOpen,
    handleDeleteCategory,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    closeEditCategoriesModal,
    isCategoryBeingEdited,
    setValue,
    onSelectCategory,
  };
}
