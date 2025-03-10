import type { FC, JSX } from 'react';
import MuiButton from '@mui/material/Button';

type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
};

export const MyButton: FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <MuiButton
      startIcon={icon}
      className={className}
      color={color}
      type={type}
      fullWidth={fullWidth}
      size="large"
    >
      {children}
    </MuiButton>
  );
};
