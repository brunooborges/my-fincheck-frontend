// import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { useEditUserModalController } from './useEditUserModalController';

export function EditUserModal() {
  const {
    isEditUserModalOpen,
    closeEditUserModal,
    errors,
    handleSubmit,
    register,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteUser,
    isPendingDelete,
    user,
  } = useEditUserModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteUser}
        title='Tem certeza que deseja excluir esta conta?'
        description='Ao excluir a conta, também serão excluídos todos os dados do usuário.'
      />
    );
  }

  return (
    <Modal
      title='Editar Conta'
      open={isEditUserModalOpen}
      onClose={closeEditUserModal}
      rightAction={
        <div onClick={handleOpenDeleteModal}>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </div>
      }
      className='max-w-[420px]'
    >
      <form onSubmit={handleSubmit}>
        <div className='mt-10 flex flex-col gap-4'>
          <Input
            name={'nome'}
            placeholder={user?.name}
            disabled={true}
          />
          <Input
            type='email'
            name={'email'}
            placeholder={user?.email}
            disabled={true}
          />
          <span className='text-xs text-gray-700'>Atualizar informações de usuário</span>
          <Input
            placeholder='Nome'
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            type='email'
            placeholder='Digite novo e-mail'
            {...register('newEmail')}
            error={errors.newEmail?.message}
          />
          <Input
            type='password'
            placeholder='Nova senha'
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />
          <Input
            type='password'
            placeholder='Confirme sua nova senha'
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <Input
            type='password'
            placeholder='Digite senha atual para confirmar as alterações'
            {...register('password')}
            error={errors.password?.message}
          />
        </div>
        <Button
          type='submit'
          className='w-full mt-6'
          isLoading={isPending}
        >
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
