import DashboardLayout from '../../layouts/DashLayout';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

const SettingsPage = () => (
  <DashboardLayout>
    <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', pb: 4 }}>
      <Stack spacing={4}>
        <Card sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
          <Typography variant="overline" sx={{ color: 'warning.main', letterSpacing: 2 }}>
            Settings
          </Typography>
          <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>
            Admin Settings
          </Typography>
          <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)' }}>
            Control system settings, user permissions, and site configuration from a secure admin panel.
          </Typography>
        </Card>
        <Card sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
          <Typography sx={{ color: 'rgba(226,232,240,0.78)' }}>
            This area is reserved for admin-only features and configuration controls. Add settings here as the system grows.
          </Typography>
        </Card>
      </Stack>
    </Box>
  </DashboardLayout>
);

export default SettingsPage;
