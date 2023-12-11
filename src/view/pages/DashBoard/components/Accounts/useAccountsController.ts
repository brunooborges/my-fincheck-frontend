import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashBoard } from '../DashBoardContext/useDashBoard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();

  const { areValuesVisible, toggleValueVisibility, openNewAccountModal } = useDashBoard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal,
  };
}
