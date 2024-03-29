import { Button } from './Button';
import { Modal } from './Modal';
import { TrashIcon } from './icons/TrashIcon';

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onConfirmAll?(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
  installments?: number;
}

export function ConfirmDeleteModal({
  onClose,
  title,
  description,
  onConfirm,
  onConfirmAll,
  installments,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open
      title='Excluir'
      onClose={onClose}
    >
      <div className='flex flex-col items-center text-center gap-6'>
        <div className='w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center'>
          <TrashIcon className='w-6 h-6 text-red-900' />
        </div>
        <p className='w-[180px] text-gray-800 font-bold tracking-[-0.5px]'>{title}</p>
        <p className='tracking-[-0.5px] text-gray-800'>{description}</p>
      </div>

      <div className='mt-10 space-y-4'>
        <Button
          variant='danger'
          className='w-full'
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo exlcuir {installments && installments > 1 && 'esta parcela'}
        </Button>
        {installments && installments > 1 && (
          <Button
            variant='danger'
            className='w-full'
            onClick={onConfirmAll}
            isLoading={isLoading}
          >
            Sim, desejo exlcuir todas as parcelas
          </Button>
        )}
        <Button
          variant='ghost'
          className='w-full'
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
