import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import { Box, Button, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';

const drawerWidth = 280;

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardIcon />, allowedRoles: ['admin'] },
  { label: 'Articles', to: '/dashboard/articles', icon: <ArticleIcon />, allowedRoles: ['admin', 'editor'] },
  { label: 'Users', to: '/users', icon: <PeopleIcon />, allowedRoles: ['admin'] },
  { label: 'Reports', to: '/reports', icon: <BarChartIcon />, allowedRoles: ['admin'] },
];

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem('type');

  useEffect(() => {
    const path = location.pathname;
    const blockedForEditor = ['/users', '/dashboard/users', '/reports'];
    const blockedForViewer = ['/dashboard', '/reports', '/users', '/dashboard/articles'];

    if (userType === 'editor' && blockedForEditor.includes(path)) {
      navigate('/dashboard');
      return;
    }

    if (userType === 'viewer' && blockedForViewer.includes(path)) {
      navigate('/');
      return;
    }

    if (!userType && path.startsWith('/dashboard')) {
      navigate('/auth/signin');
      return;
    }
  }, [location.pathname, userType, navigate]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100%' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'rgba(15, 23, 42, 0.94)',
            color: 'white',
            borderRight: '1px solid rgba(249, 115, 22, 0.25)',
          },
        }}
      >
        <Toolbar sx={{ px: 3, py: 4 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 2, mb: 1 }}>
              Ichigo HQ
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(226, 232, 240, 0.75)' }}>
              Soul Reaper command center
            </Typography>
          </Box>
        </Toolbar>

        <Divider sx={{ borderColor: 'rgba(249, 115, 22, 0.25)' }} />

        <List disablePadding>
          {navItems
            .filter(item => !item.allowedRoles || item.allowedRoles.includes(userType))
            .map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              sx={{
                color: 'inherit',
                '&.Mui-selected': {
                  bgcolor: 'rgba(249, 115, 22, 0.18)',
                },
                '&:hover': {
                  bgcolor: 'rgba(249, 115, 22, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'transparent' }}>
        <Toolbar />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="warning"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Back to homepage
          </Button>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
