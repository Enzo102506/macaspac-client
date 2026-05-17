import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';

const drawerWidth = 280;

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Reports', to: '/reports', icon: <BarChartIcon /> },
  { label: 'Users', to: '/users', icon: <PeopleIcon /> },
];

const DashboardLayout = ({ children }) => {
  const location = useLocation();

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
          {navItems.map((item) => (
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
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
