import React, { useState, useMemo, createContext } from 'react';
import type { ReactNode } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
  const [theme, setTheme] = useState<'dark' | 'light'>(storedTheme || 'dark');

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: theme === 'light' ? '#1976d2' : '#90caf9',
          },
          background: {
            default: theme === 'light' ? '#ffffff' : '#121212',
            paper: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
          },
          text: {
            primary: theme === 'light' ? '#000' : '#fff',
          },
        },
      }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
