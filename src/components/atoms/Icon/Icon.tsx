import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material';
import { memo } from 'react';

interface IconProps extends SvgIconProps {
  name: string;
}

export const Icon = memo(({ name, ...props }: IconProps) => {
  // In a real app, you'd use an icon library like @mui/icons-material
  return <SvgIcon {...props}>{name}</SvgIcon>;
});

Icon.displayName = 'Icon';

