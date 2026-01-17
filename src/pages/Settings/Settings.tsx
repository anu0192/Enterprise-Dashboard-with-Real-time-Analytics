import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useAppSelector } from '@/app/hooks';

export const Settings = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {user?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user?.role}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

