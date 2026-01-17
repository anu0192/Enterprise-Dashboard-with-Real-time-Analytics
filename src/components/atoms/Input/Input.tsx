import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { memo } from 'react';

type InputProps = TextFieldProps & {
  label: string;
}

export const Input = memo(({ label, ...props }: InputProps) => {
  return <TextField label={label} {...props} />;
});

Input.displayName = 'Input';

