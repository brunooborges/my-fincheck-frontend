import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '../../../app/hooks/useAuth';
import { authService } from '../../../app/services/authService';
import { SignupParams } from '../../../app/services/authService/signup';

const schema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email().min(1, 'E-mail inválido'),
    password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos'),
    confirmPassword: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não são iguais',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error('Ocorreu um erro ao criar a sua conta!');
    }
  });

  return { handleSubmit, register, errors, isPending };
}
