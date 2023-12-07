import { createContext, useCallback, useState } from 'react';

interface DashBoardContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility(): void;
}

export const DashBoardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    if (localStorage.getItem('dashBoardValuesVisibility') === 'false') {
      return false;
    }
    return true;
  });

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);

    const invert = !areValuesVisible;
    localStorage.setItem('dashBoardValuesVisibility', invert.toString());
  }, [areValuesVisible]);

  return (
    <DashBoardContext.Provider value={{ areValuesVisible, toggleValueVisibility }}>
      {children}
    </DashBoardContext.Provider>
  );
}
