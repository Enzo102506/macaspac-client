import DashboardLayout from '../components/DashboardLayout';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  { id: 1, name: 'Ichigo Kurosaki', role: 'Leader', status: 'Ready', location: 'Karakura Town' },
  { id: 2, name: 'Rukia Kuchiki', role: 'Support', status: 'On Duty', location: 'Soul Society' },
  { id: 3, name: 'Orihime Inoue', role: 'Healer', status: 'Guarding', location: 'Karakura Town' },
  { id: 4, name: 'Yasutora Chad', role: 'Shield', status: 'Holding', location: 'Karakura Town' },
];

const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 180 },
  { field: 'role', headerName: 'Role', flex: 1, minWidth: 140 },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
  { field: 'location', headerName: 'Location', flex: 1, minWidth: 180 },
];

const UsersPage = () => {
  return (
    <DashboardLayout>
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', pb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
              <CardContent>
                <Typography variant="overline" sx={{ color: 'warning.main', letterSpacing: 2 }}>Allies Registry</Typography>
                <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>Ichigo Squad Profiles</Typography>
                <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)' }}>
                  Review the key Soul Reapers on your team, their current role, and status on the field. The squad roster keeps Ichigo and his allies aligned.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ height: 460, width: '100%', bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)', borderRadius: 3, overflow: 'hidden' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                sx={{
                  border: 'none',
                  color: 'rgba(255,255,255,0.95)',
                  bgcolor: 'rgba(15, 23, 42, 0.88)',
                  '& .MuiDataGrid-root': {
                    bgcolor: 'rgba(15, 23, 42, 0.88)',
                  },
                  '& .MuiDataGrid-main': { bgcolor: 'transparent' },
                  '& .MuiDataGrid-columnHeaders': {
                    bgcolor: 'rgba(249, 115, 22, 1)',
                    borderBottom: '1px solid rgba(222, 110, 16, 0.35)',
                  },
                  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle': {
                    bgcolor: 'rgba(249, 115, 22, 1)',
                    color: 'rgba(15, 23, 42, 1)',
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    color: 'rgba(222, 110, 16, 0.35)',
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    bgcolor: 'rgba(15, 23, 42, 0.75)',
                  },
                  '& .MuiDataGrid-row': {
                    bgcolor: 'rgba(15, 23, 42, 0.65)',
                    '&:hover': {
                      bgcolor: 'rgba(148, 163, 184, 0.18)',
                    },
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(249, 115, 22, 0.08)',
                    color: 'rgba(255,255,255,0.92)',
                  },
                  '& .MuiDataGrid-row.Mui-even': {
                    bgcolor: 'rgba(15, 23, 42, 0.78)',
                  },
                  '& .MuiDataGrid-footerContainer': {
                    bgcolor: 'rgba(30, 41, 59, 0.95)',
                    borderTop: '1px solid rgba(249, 115, 22, 0.15)',
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default UsersPage;
