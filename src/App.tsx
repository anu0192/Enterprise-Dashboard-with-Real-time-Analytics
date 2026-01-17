import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AppProvider } from './app/providers/AppProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy load pages for code splitting
const Login = lazy(() => import('./pages/Login/Login').then((module) => ({ default: module.Login })));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard').then((module) => ({ default: module.Dashboard })));
const Analytics = lazy(() => import('./pages/Analytics/Analytics').then((module) => ({ default: module.Analytics })));
const Settings = lazy(() => import('./pages/Settings/Settings').then((module) => ({ default: module.Settings })));

const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
