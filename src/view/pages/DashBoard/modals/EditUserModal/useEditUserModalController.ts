import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useAuth } from '../../../../../app/hooks/useAuth';
import { usersService } from '../../../../../app/services/usersService';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z
  .object({
    name: z.string(),
    newEmail: z
      .string()
      .optional()
      .refine(
        (value) => value === '' || z.string().email().safeParse(value).success,
        'E-mail inválido!',
      ),
    password: z.string().min(8, 'Senha é obrigatória!'),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !data.newPassword || data.confirmPassword, {
    message: 'Confirmação de senha é obrigatória',
    path: ['confirmPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não são iguais',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export function useEditUserModalController() {
  const { isEditUserModalOpen, closeEditUserModal } = useDashboard();
  const { user } = useAuth();
  const { signout } = useAuth();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateUsers } = useMutation({
    mutationFn: usersService.update,
  });
  const { isPending: isPendingDelete, mutateAsync: removeUsers } = useMutation({
    mutationFn: usersService.remove,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (!data.newPassword) {
        await updateUsers({
          id: user!.id,
          name: data.name ? data.name : user?.name,
          email: user?.email,
          password: data?.password,
        });
      }

      await updateUsers({
        id: user!.id,
        name: data.name ? data.name : user?.name,
        email: user?.email,
        newEmail: data?.newEmail ? data?.newEmail : undefined,
        password: data?.password,
        newPassword: data.newPassword,
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('A conta foi editada com sucesso!');
      closeEditUserModal();
    } catch {
      if (user?.password !== data.password) {
        toast.error('Senha incorreta');
      }
      toast.error('Erro ao salvar as alterações!');
    }
  });

  function handleOpenDeleteModal() {
    setDeleteModalOpen(true);
  }
  function handleCloseDeleteModal() {
    setDeleteModalOpen(false);
  }

  async function handleDeleteUser() {
    try {
      await removeUsers(user!.id);

      queryClient.invalidateQueries({ queryKey: ['users'] });
      signout();
      closeEditUserModal();
      toast.success('A conta foi deletada com sucesso!');
    } catch {
      toast.error('Erro ao deletar a conta!');
    }
  }

  return {
    isEditUserModalOpen,
    closeEditUserModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteUser,
    isPendingDelete,
    user,
  };
}
