import { memo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/dashboard/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export const Sidebar = memo(({ open = true, onClose, variant = 'permanent' }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (variant === 'temporary' && onClose) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (variant === 'temporary') {
    return (
      <Drawer variant="temporary" open={open} onClose={onClose} sx={{ width: drawerWidth }}>
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant={variant}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      open={open}
    >
      {drawerContent}
    </Drawer>
  );
});

Sidebar.displayName = 'Sidebar';

