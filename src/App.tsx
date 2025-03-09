import React, { useContext } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ThemeContext } from './components/theme-provider';

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Current Theme: {theme}
      </Typography>
      <Button variant="contained" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </Box>
  );
};

export default App;
