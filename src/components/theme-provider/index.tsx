import { useState, useMemo, createContext } from 'react';
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
            main: theme === 'light' ? '#000' : '#fff',
          },
          success: {
            main: '#4ec752',
          },
          background: {
            default: theme === 'light' ? '#cbeefb' : '#121212',
            paper: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
          },
          text: {
            primary: theme === 'light' ? '#000' : '#fff',
          },
        },
        typography: {
          fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 500,
          },
          body1: {
            fontSize: '1rem',
            fontWeight: 400,
          },
        },
        components: {
          MuiTypography: {
            styleOverrides: {
              root: {
                '&.MuiTypography-colorSuccess': {
                  color: theme === 'light' ? '#000' : '#fff',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e',
                boxShadow:
                  theme === 'light'
                    ? '0px 4px 12px rgba(0, 0, 0, 0.1)'
                    : '0px 4px 12px rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              },
            },
          },
          MuiCardHeader: {
            styleOverrides: {
              root: {
                backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
                borderBottom: `1px solid ${theme === 'light' ? '#e0e0e0' : '#333'}`,
              },
              title: {
                fontWeight: 700,
              },
            },
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                padding: '16px',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: theme === 'light' ? '#fff' : '',
                },
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                textTransform: 'none',
              },
            },
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
