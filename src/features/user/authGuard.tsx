import React from 'react';
import { useCurrentQuery } from '../../app/services/userApi';
import { CircularProgress } from '@mui/material';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return <CircularProgress />;
  }
  return children;
};
