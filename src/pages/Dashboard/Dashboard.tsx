import { useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchDashboardData } from '@/features/dashboard/slices/dashboardSlice';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  Assessment,
} from '@mui/icons-material';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWebSocket } from '@/hooks/useWebSocket';
import { WS_URL } from '@/utils/constants';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { stats, chartData, loading, error, lastUpdated } = useAppSelector(
    (state) => state.dashboard
  );

  // WebSocket connection for real-time updates
  const { isConnected } = useWebSocket(WS_URL);

  useEffect(() => {
    const endDate = new Date().toISOString();
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    dispatch(fetchDashboardData({ startDate, endDate }));
  }, [dispatch]);

  const handleSearch = useCallback((query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  }, []);

  const statCards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        title: 'Total Sales',
        value: formatCurrency(stats.totalSales),
        icon: <AttachMoney />,
        color: '#1976d2',
        growth: stats.growth.sales,
      },
      {
        title: 'Active Users',
        value: stats.activeUsers.toLocaleString(),
        icon: <People />,
        color: '#2e7d32',
        growth: stats.growth.users,
      },
      {
        title: 'Conversion Rate',
        value: formatPercentage(stats.conversionRate),
        icon: <TrendingUp />,
        color: '#ed6c02',
        growth: 0,
      },
      {
        title: 'Revenue',
        value: formatCurrency(stats.revenue),
        icon: <Assessment />,
        color: '#9c27b0',
        growth: stats.growth.revenue,
      },
    ];
  }, [stats]);

  if (loading && !stats) {
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert severity="error">{error}</Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onSearch={handleSearch}>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            {lastUpdated && `Last updated: ${new Date(lastUpdated).toLocaleString()}`}
          </Typography>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: isConnected() ? 'success.main' : 'error.main',
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {isConnected() ? 'Connected' : 'Disconnected'}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {card.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {card.value}
                    </Typography>
                    {card.growth !== 0 && (
                      <Typography
                        variant="body2"
                        sx={{ color: card.growth > 0 ? 'success.main' : 'error.main', mt: 1 }}
                      >
                        {card.growth > 0 ? '+' : ''}
                        {formatPercentage(card.growth)}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ color: card.color }}>{card.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

