import React, { useContext } from 'react';
import { ThemeContext } from '../theme-provider';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectIsAuthenticated } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <Box className="w-full">
      <BottomNavigation className="w-full">
        <div className="flex items-center justify-between w-full mx-auto max-w-screen-xl">
          <BottomNavigationAction
            label="Network Social"
            className="flex-grow"
            showLabel
          />
          <Box>
            <BottomNavigationAction
              icon={theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              onClick={toggleTheme}
              className="ml-auto"
            />
            {isAuthenticated && (
              <BottomNavigationAction
                icon={<CiLogout />}
                label="Выйти"
                onClick={handleLogout}
                showLabel
              />
            )}
          </Box>
        </div>
      </BottomNavigation>
    </Box>
  );
};
