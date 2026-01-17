import { lazy, Suspense } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Box, CircularProgress, Typography } from '@mui/material';

// Lazy load analytics components for code splitting
const AnalyticsCharts = lazy(() => import('@/features/dashboard/components/AnalyticsCharts'));

export const Analytics = () => {
  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        }
      >
        <AnalyticsCharts />
      </Suspense>
    </DashboardLayout>
  );
};

