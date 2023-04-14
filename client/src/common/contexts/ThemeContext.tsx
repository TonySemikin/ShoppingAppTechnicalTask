import { createContext, ReactNode, useContext } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const theme = {
  primary: {
    light: 'var(--primary-light)',
    main: 'var(--primary-main)',
    dark: 'var(--primary-dark)',
    contrastTextLight: 'var(--primary-contrast-text-light)',
    contrastTextMain: 'var(--primary-contrast-text-main)',
    contrastTextDark: 'var(--primary-contrast-text-dark)',
  },
  secondary: {
    light: 'var(--secondary-light)',
    main: 'var(--secondary-main)',
    dark: 'var(--secondary-dark)',
    contrastTextLight: 'var(--secondary-contrast-text-light)',
    contrastTextMain: 'var(--secondary-contrast-text-main)',
    contrastTextDark: 'var(--secondary-contrast-text-dark)',
  },
};

const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useModals = () => useContext(ThemeContext);
