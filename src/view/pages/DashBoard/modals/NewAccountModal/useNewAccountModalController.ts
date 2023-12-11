import { useDashBoard } from '../../components/DashBoardContext/useDashBoard';

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashBoard();

  return { isNewAccountModalOpen, closeNewAccountModal };
}
