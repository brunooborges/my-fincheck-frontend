import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { CategoriesIconsDropDownInput } from '../../../../components/CategoriesIconsDropDownInput';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { useEditCategoryModalController } from './useEditCategoryModalController';

export function EditCategoryModal() {
  const {
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
    onSelectCategory,
    setValue,
  } = useEditCategoryModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteCategory}
        title={'Tem certeza que deseja excluir esta categoria?'}
      />
    );
  }

  return (
    <Modal
      title={'Editar Categoria'}
      open={isCategoryBeingEdited}
      onClose={closeEditCategoriesModal}
      rightAction={
        <div onClick={handleOpenDeleteModal}>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className='mt-10 flex flex-col gap-4'>
          <Controller
            control={control}
            name='categoryId'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={(selectedOption) => {
                  const selectedCategory = categories.find(
                    (category) => category.id === selectedOption.valueOf(),
                  );

                  setValue('icon', selectedCategory!.icon);
                  setValue('type', selectedCategory!.type);

                  onSelectCategory(selectedCategory!);
                  onChange(selectedOption);
                }}
                value={value}
                error={errors.categoryId?.message}
                placeholder='Categoria'
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Input
            type='text'
            placeholder={'Nome da Categoria'}
            {...register('name')}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name='icon'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <CategoriesIconsDropDownInput
                onChange={onChange}
                value={value}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='type'
            defaultValue='EXPENSE'
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.type?.message}
                placeholder='Tipo'
                options={[
                  {
                    value: 'INCOME',
                    label: 'Receita',
                  },
                  {
                    value: 'EXPENSE',
                    label: 'Despesa',
                  },
                ]}
              />
            )}
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
