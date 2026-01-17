import { memo } from 'react';
import type { ReactNode } from 'react';
import { Box, Container, Paper } from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = memo(({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          {children}
        </Paper>
      </Container>
    </Box>
  );
});

AuthLayout.displayName = 'AuthLayout';

