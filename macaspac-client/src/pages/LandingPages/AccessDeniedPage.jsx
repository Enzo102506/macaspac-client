import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const AccessDeniedPage = () => (
  <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
    <Box sx={{ bgcolor: 'rgba(15, 23, 42, 0.92)', p: 6, borderRadius: 3, border: '1px solid rgba(249, 115, 22, 0.25)' }}>
      <Typography variant="h2" sx={{ fontWeight: 700, color: 'common.white', mb: 2 }}>
        Access Denied
      </Typography>
      <Typography sx={{ color: 'rgba(226,232,240,0.78)', mb: 4 }}>
        You do not have permission to view this page. Please return to a page you are allowed to access.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="warning">
        Return Home
      </Button>
    </Box>
  </Container>
);

export default AccessDeniedPage;
