import { useState, useCallback, memo } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { logoutUser } from '@/features/auth/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const UserMenu = memo(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/auth/login');
    handleClose();
  }, [dispatch, navigate, handleClose]);

  const handleProfile = useCallback(() => {
    navigate('/settings');
    handleClose();
  }, [navigate, handleClose]);

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={{ width: 32, height: 32 }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          <Typography variant="body2">{user?.name || 'User'}</Typography>
        </MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
});

UserMenu.displayName = 'UserMenu';

