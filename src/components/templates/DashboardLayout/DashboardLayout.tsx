import { memo } from 'react';
import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Header } from '@/components/organisms/Header';
import { Sidebar } from '@/components/organisms/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export const DashboardLayout = memo(({ children, onSearch }: DashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onSearch={onSearch} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
});

DashboardLayout.displayName = 'DashboardLayout';

