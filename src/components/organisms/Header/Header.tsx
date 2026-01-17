import { memo } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { UserMenu } from '@/components/molecules/UserMenu';
import { SearchBar } from '@/components/molecules/SearchBar';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = memo(({ onSearch }: HeaderProps) => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Enterprise Dashboard
        </Typography>
        {onSearch && (
          <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2 }}>
            <SearchBar onSearch={onSearch} />
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

