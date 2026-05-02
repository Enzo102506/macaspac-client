import DashboardLayout from '../components/DashboardLayout';
import { Box, Chip, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';

const stats = [
  { label: 'Spirit Energy', value: 92 },
  { label: 'Hollow Sight', value: 100, suffix: '%' },
  { label: 'Allies Online', value: 3 },
  { label: 'Threat Level', value: 'Severe' },
];

const details = [
  { label: 'Reiryoku Reserve', value: 88 },
  { label: 'Attack Potential', value: 76 },
  { label: 'Energy Stability', value: 94 },
];

const squad = [
  { name: 'Rukia Kuchiki', role: 'Support' },
  { name: 'Orihime Inoue', role: 'Healer' },
  { name: 'Yasutora Chad', role: 'Shield' },
];

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', pb: 4 }}>
        <Stack spacing={4}>
          <Paper sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
            <Typography variant="overline" sx={{ color: 'warning.main', letterSpacing: 2 }}>Soul Reaper Dashboard</Typography>
            <Typography variant="h3" component="h1" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>Ichigo Mission Command</Typography>
            <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)' }}>
              Track combat readiness, mission objectives, and team status in one place. This command center is tuned for Ichigo’s Soul Reaper journey.
            </Typography>
          </Paper>

          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                  <div>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, color: 'warning.main' }}>Battle Summary</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, color: 'common.white' }}>Current Mission</Typography>
                  </div>
                  <Chip label="Bankai Ready" color="warning" variant="filled" />
                </Stack>

                <Grid container spacing={3}>
                  {stats.map((item) => (
                    <Grid item xs={12} sm={6} key={item.label}>
                      <Paper sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 1)', border: '1px solid rgba(249, 115, 22, 0.1)' }} elevation={0}>
                        <Typography variant="caption" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>{item.label}</Typography>
                        <Typography variant="h4" sx={{ mt: 1, fontWeight: 700, color: 'common.white' }}>
                          {item.value}{item.suffix ?? ''}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(15, 23, 42, 1)', border: '1px solid rgba(249, 115, 22, 0.18)' }}>
                  <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5, mb: 1 }}>Mission Notes</Typography>
                  <Typography sx={{ color: 'rgba(226,232,240,0.78)' }}>
                    Ichigo must maintain his inner resolve and monitor his hollow form. Keep the squad prepared for sudden hollows and group combat scenarios.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Stack spacing={3}>
                <Paper sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                  <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5, mb: 2 }}>Vital Status</Typography>
                  <Stack spacing={3}>
                    {details.map((item) => (
                      <Box key={item.label}>
                        <Stack direction="row" justifyContent="space-between" mb={1}>
                          <Typography variant="body2" sx={{ color: 'rgba(226,232,240,0.78)' }}>{item.label}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'common.white' }}>{item.value}%</Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={item.value} sx={{ height: 10, borderRadius: 5, bgcolor: 'rgba(148, 163, 184, 0.12)' }} />
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                  <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5, mb: 2 }}>Squad Pulse</Typography>
                  <Stack spacing={2}>
                    {squad.map((member) => (
                      <Paper key={member.name} sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 1)' }} elevation={0}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography sx={{ fontWeight: 700, color: 'common.white' }}>{member.name}</Typography>
                          <Chip label={member.role} size="small" color="warning" />
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
