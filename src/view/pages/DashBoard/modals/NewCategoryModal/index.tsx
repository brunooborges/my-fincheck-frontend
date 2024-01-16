import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { CategoriesIconsDropDownInput } from '../../../../components/CategoriesIconsDropDownInput';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewCategoryModalController } from './useNewCategoryModalController';

export function NewCategoryModal() {
  const {
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    control,
    errors,
    handleSubmit,
    register,
    isPending,
  } = useNewCategoryModalController();

  return (
    <Modal
      title={'Criar Categoria'}
      open={isNewCategoryModalOpen}
      onClose={closeNewCategoryModal}
    >
      <form onSubmit={handleSubmit}>
        <div className='mt-10 flex flex-col gap-4'>
          <Input
            type='text'
            placeholder={'Nome da categoria'}
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
          Criar
        </Button>
      </form>
    </Modal>
  );
}
