import { useContext } from 'react';
import { DashBoardContext } from '.';

export function useDashBoard() {
  return useContext(DashBoardContext);
}
