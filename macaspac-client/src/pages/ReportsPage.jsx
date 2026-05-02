import DashboardLayout from '../components/DashboardLayout';
import { Box, Card, CardContent, Grid, Paper, Stack, Typography } from '@mui/material';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const summaryCards = [
  { title: 'Spirit Pressure', value: 'High', subtitle: 'Strong flow detected.' },
  { title: 'Battle Outcome', value: '68%', subtitle: 'Success rate this week.' },
  { title: 'Hollow Encounters', value: '22', subtitle: 'Tracked this month.' },
];

const chartData = [
  { name: 'Mon', energy: 72 },
  { name: 'Tue', energy: 88 },
  { name: 'Wed', energy: 95 },
  { name: 'Thu', energy: 84 },
  { name: 'Fri', energy: 91 },
  { name: 'Sat', energy: 98 },
  { name: 'Sun', energy: 93 },
];

const battleReports = [
  { title: 'Soul Society  Assault', status:  'Complete' },
  { title: 'Hollow Nest   Sweep', status:  'Pending' },
  { title: 'Training  Session', status:   'Stable' },
];

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', pb: 4 }}>
        <Stack spacing={4}>
          <Paper sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
            <Typography variant="overline" sx={{ color: 'warning.main', letterSpacing: 2 }}>Report Center</Typography>
            <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>Ichigo Battle Analytics</Typography>
            <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)' }}>
              Review your recent battles, power surges, and hollow activity. These reports help Ichigo sharpen his strategy and improve combat outcomes.
            </Typography>
          </Paper>

          <Grid container spacing={3}>
            {summaryCards.map((card) => (
              <Grid item xs={12} md={4} key={card.title}>
                <Card sx={{ bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>{card.title}</Typography>
                    <Typography variant="h4" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>{card.value}</Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(226,232,240,0.78)' }}>{card.subtitle}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>Trend Overview</Typography>
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, color: 'common.white' }}>Energy Output</Typography>
                <Typography sx={{ mt: 1, color: 'rgba(226,232,240,0.78)' }}>Weekly energy trends for Ichigo’s power output.</Typography>
                <Box sx={{ mt: 4, height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" />
                      <XAxis dataKey="name" stroke="rgba(148, 163, 184, 0.8)" />
                      <YAxis stroke="rgba(148, 163, 184, 0.8)" />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(249, 115, 22, 0.25)' }} />
                      <Line type="monotone" dataKey="energy" stroke="#fb923c" strokeWidth={3} dot={{ fill: '#fb923c' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>Recent Battle Reports</Typography>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  {battleReports.map((report) => (
                    <Paper key={report.title} sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 1)' }} elevation={0}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontWeight: 700, color: 'common.white' }}>{report.title}</Typography>
                        <Typography sx={{ color: 'warning.main' }}>{report.status}</Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default ReportsPage;
