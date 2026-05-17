import { useRef, useState, useMemo } from 'react';
import usersData from '../../assets/data/users.json';
import DashboardLayout from '../../layouts/DashLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';

const summaryCards = [
  { title: 'Spirit Pressure', value: 'Peak', subtitle: 'Ichigo is burning bright.' },
  { title: 'Battle Success', value: '68%', subtitle: 'Current combat victory rate.' },
  { title: 'Hollow Sightings', value: '22', subtitle: 'Encounters tracked this month.' },
];

const lineData = [
  { name: 'Mon', energy: 72 },
  { name: 'Tue', energy: 88 },
  { name: 'Wed', energy: 95 },
  { name: 'Thu', energy: 84 },
  { name: 'Fri', energy: 91 },
  { name: 'Sat', energy: 98 },
  { name: 'Sun', energy: 93 },
];

const barData = [
  { category: 'Hollows', value: 28 },
  { category: 'Arrancars', value: 14 },
  { category: 'Quincy', value: 18 },
  { category: 'Training', value: 40 },
];

const pieData = [
  { name: 'Completed', value: 68, color: '#fb923c' },
  { name: 'In Progress', value: 22, color: '#f97316' },
  { name: 'Idle', value: 10, color: '#c2410c' },
];

const reportRows = [
  { id: 1, mission: 'Soul Society Rescue', detail: 'High-risk hollow purge', status: 'Completed' },
  { id: 2, mission: 'Hollow Nest Sweep', detail: 'Karakura defense patrol', status: 'Active' },
  { id: 3, mission: 'Training Session', detail: 'Zanpakuto endurance drill', status: 'Scheduled' },
  { id: 4, mission: 'Reiatsu Scan', detail: 'Detect hollow surges', status: 'Completed' },
];

const reportColumns = [
  { field: 'mission', headerName: 'Mission', flex: 1, minWidth: 180 },
  { field: 'detail', headerName: 'Detail', flex: 1.5, minWidth: 220 },
  { field: 'status', headerName: 'Status', flex: 0.8, minWidth: 140 },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  // Users search & filter (Enhancement 2)
  const [users, setUsers] = useState(usersData || []);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  // (Users managed on Users page)

  const columnsUsers = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 130 },
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 130 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 180 },
    { field: 'username', headerName: 'Username', flex: 1, minWidth: 120 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 120 },
    { field: 'gender', headerName: 'Gender', width: 110 },
    { field: 'isActive', headerName: 'Active', width: 100, valueGetter: (params) => (params?.row?.isActive ? 'Active' : 'Inactive') },
  ];

  const filteredUsers = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter && u.role !== roleFilter) return false;
      if (genderFilter && u.gender !== genderFilter) return false;
      if (statusFilter) {
        if (statusFilter === 'active' && !u.isActive) return false;
        if (statusFilter === 'inactive' && u.isActive) return false;
      }
      if (!q) return true;
      return [u.firstName, u.lastName, u.email, u.username].some((field) => String(field).toLowerCase().includes(q));
    });
  }, [users, searchText, roleFilter, genderFilter, statusFilter]);
  

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ichigo Battle Report</title>
        ${headMarkup}
        <style>
          body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #090b12; color: #eef2ff; }
          .report-shell { padding: 24px; }
          .report-header { margin-bottom: 24px; border-bottom: 1px solid rgba(249, 115, 22, 0.3); }
          .report-header h1 { font-size: 32px; margin: 0 0 12px; }
          .report-header p { margin: 0; color: #fbbf24; }
          .report-content { margin-top: 24px; }
          .MuiCard-root, .MuiPaper-root, .MuiDataGrid-root { box-shadow: none !important; background: transparent !important; }
          .MuiDataGrid-cell, .MuiDataGrid-columnHeader, .MuiDataGrid-footerContainer { color: #eef2ff !important; }
          .MuiDataGrid-columnHeaders { background: rgba(30, 41, 59, 0.95) !important; }
          .MuiDataGrid-virtualScroller { background: rgba(15, 23, 42, 0.7) !important; }
        </style>
      </head>
      <body>
        <main class="report-shell">
          <header class="report-header">
            <h1>Ichigo Battle Report</h1>
            <p>Generated on ${exportedAt}</p>
          </header>
          <section class="report-content">
            ${printContent.outerHTML}
          </section>
        </main>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <DashboardLayout>
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', pb: 4 }}>
        <Stack spacing={4}>
          <Card sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
              <Box>
                <Typography variant="overline" sx={{ color: 'warning.main', letterSpacing: 2 }}>Report Center</Typography>
                <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>Ichigo Battle Analytics</Typography>
                <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)' }}>
                  Review recent missions, energy spikes, and hollow activity across the Soul Reaper campaign.
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="warning"
                onClick={handlePrint}
                sx={{
                  minWidth: 160,
                  height: 44,
                  px: 4,
                  fontSize: '0.95rem',
                  ml: 'auto',
                  borderRadius: '12px',
                  boxShadow: 'none',
                  textTransform: 'none',
                }}
              >
                Export Report
              </Button>
            </Stack>
          </Card>

          <Box ref={printRef}>
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

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} lg={6}>
                <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                  <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>Energy Trend</Typography>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, color: 'common.white' }}>Reiatsu Output</Typography>
                  <Typography sx={{ mt: 1, color: 'rgba(226,232,240,0.78)' }}>Weekly comparison of Ichigo’s energy flow.</Typography>
                  <Box sx={{ mt: 4, height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
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
              <Grid item xs={12} lg={6}>
                <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                  <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>Mission Breakdown</Typography>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, color: 'common.white' }}>Tactical Focus</Typography>
                  <Typography sx={{ mt: 1, color: 'rgba(226,232,240,0.78)' }}>Mission types and progress across the latest cycle.</Typography>
                  <Box sx={{ mt: 4, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" />
                        <XAxis dataKey="category" stroke="rgba(148, 163, 184, 0.8)" />
                        <YAxis stroke="rgba(148, 163, 184, 0.8)" />
                        <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(249, 115, 22, 0.25)' }} />
                        <Bar dataKey="value" fill="#fb923c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={5}>
                <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                  <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>Status Share</Typography>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, color: 'common.white' }}>Mission Completion</Typography>
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie data={pieData} innerRadius={68} outerRadius={104} dataKey="value" stroke="transparent">
                          {pieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(249, 115, 22, 0.25)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={7}>
                <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
                  <Typography variant="subtitle2" sx={{ color: 'warning.main', letterSpacing: 1.5 }}>User Directory</Typography>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, color: 'common.white' }}>Manage Users</Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2, mb: 2 }}>
                    <TextField
                      placeholder="Search by firstName, lastName, email, or username"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1, flex: 1 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 140, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }}>
                      <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Role</InputLabel>
                      <Select value={roleFilter} label="Role" onChange={(e) => setRoleFilter(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        {[...new Set(users.map((u) => u.role))].map((r) => (
                          <MenuItem key={r} value={r}>{r}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 140, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }}>
                      <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Gender</InputLabel>
                      <Select value={genderFilter} label="Gender" onChange={(e) => setGenderFilter(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        {[...new Set(users.map((u) => u.gender))].map((g) => (
                          <MenuItem key={g} value={g}>{g}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 140, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1 }}>
                      <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Status</InputLabel>
                      <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  <Box sx={{ mt: 1, height: 380, width: '100%' }}>
                    <DataGrid
                      rows={Array.isArray(filteredUsers) ? filteredUsers : []}
                      columns={columnsUsers}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      disableSelectionOnClick
                      sx={{
                        border: 'none',
                        color: 'rgba(255,255,255,0.95)',
                        bgcolor: 'rgba(15, 23, 42, 0.88)',
                        '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderWrapper': {
                          backgroundColor: 'rgba(30, 41, 59, 0.95) !important',
                          color: 'rgba(226, 232, 240, 0.95) !important',
                          borderBottom: '1px solid rgba(249,115,22,0.06) !important',
                        },
                        '& .MuiDataGrid-columnSeparator': {
                          color: 'rgba(255,255,255,0.06) !important',
                        },
                        '& .MuiDataGrid-virtualScroller': {
                          bgcolor: 'rgba(15, 23, 42, 0.75)',
                        },
                        '& .MuiDataGrid-row:hover': {
                          bgcolor: 'rgba(248, 113, 30, 0.12)',
                        },
                      }}
                    />
                  </Box>

                  
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default ReportsPage;
