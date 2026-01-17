import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { memo } from 'react';

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

export const Button = memo(({ children, ...props }: ButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>;
});

Button.displayName = 'Button';

