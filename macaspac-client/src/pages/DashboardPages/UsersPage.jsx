import { useMemo, useState } from 'react';
import DashboardLayout from '../../layouts/DashLayout';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const initialUsers = [
  {
    id: 1,
    firstName: 'Ichigo',
    lastName: 'Kurosaki',
    email: 'ichigo@karakura.dev',
    username: 'ichigo123',
    contactNumber: '09171234567',
    age: '17',
    gender: 'male',
    role: 'Leader',
    status: 'Active',
    isActive: true,
  },
  {
    id: 2,
    firstName: 'Rukia',
    lastName: 'Kuchiki',
    email: 'rukia@soulreaper.dev',
    username: 'rukia',
    contactNumber: '09181234567',
    age: '18',
    gender: 'female',
    role: 'Support',
    status: 'On Duty',
    isActive: true,
  },
  {
    id: 3,
    firstName: 'Orihime',
    lastName: 'Inoue',
    email: 'orihime@karakura.dev',
    username: 'orihime',
    contactNumber: '09191234567',
    age: '16',
    gender: 'female',
    role: 'Healer',
    status: 'Guarding',
    isActive: false,
  },
  {
    id: 4,
    firstName: 'Chad',
    lastName: 'Yasutora',
    email: 'chad@karakura.dev',
    username: 'chad',
    contactNumber: '09201234567',
    age: '17',
    gender: 'male',
    role: 'Shield',
    status: 'Ready',
    isActive: true,
  },
];

const roles = ['Leader', 'Support', 'Healer', 'Shield', 'Observer'];
const genders = ['male', 'female', 'other'];
const statusOptions = ['All', 'Active', 'Inactive'];

const blankForm = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  contactNumber: '',
  age: '',
  gender: 'male',
  role: 'Support',
  password: '',
  isActive: true,
};

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const filteredRows = useMemo(() => {
    return users.filter((user) => {
      const searchValue = searchText.trim().toLowerCase();
      const matchesSearch =
        !searchValue ||
        [user.firstName, user.lastName, user.email, user.username]
          .join(' ')
          .toLowerCase()
          .includes(searchValue);

      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
      const matchesStatus =
        statusFilter === 'All' || (statusFilter === 'Active' ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchText, roleFilter, genderFilter, statusFilter]);

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        contactNumber: user.contactNumber,
        age: user.age,
        gender: user.gender,
        role: user.role,
        password: '',
        isActive: user.isActive,
      });
    } else {
      setEditingUser(null);
      setForm(blankForm);
    }
    setErrors({});
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingUser(null);
    setForm(blankForm);
    setErrors({});
    setShowPassword(false);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    const hasValue = (value) => String(value || '').trim().length > 0;

    if (!hasValue(form.firstName)) nextErrors.firstName = 'First name is required.';
    if (!hasValue(form.lastName)) nextErrors.lastName = 'Last name is required.';
    if (!hasValue(form.age) || !/^[0-9]+$/.test(form.age)) nextErrors.age = 'Age must be a number.';
    if (!hasValue(form.contactNumber) || !/^[0-9]{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits.';
    }
    if (!hasValue(form.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!hasValue(form.username) || /\s/.test(form.username)) {
      nextErrors.username = 'Username is required and cannot contain spaces.';
    }
    if (!editingUser && (!hasValue(form.password) || form.password.length < 8)) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }
    if (!hasValue(form.role)) nextErrors.role = 'Role is required.';
    if (!hasValue(form.gender)) nextErrors.gender = 'Gender is required.';

    const emailAlreadyExists = users.some(
      (user) => user.email.toLowerCase() === form.email.trim().toLowerCase() && user.id !== editingUser?.id,
    );
    if (emailAlreadyExists) nextErrors.email = 'This email address already exists.';

    const usernameAlreadyExists = users.some(
      (user) => user.username.toLowerCase() === form.username.trim().toLowerCase() && user.id !== editingUser?.id,
    );
    if (usernameAlreadyExists) nextErrors.username = 'Username already exists.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const nextUser = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      username: form.username.trim(),
      contactNumber: form.contactNumber.trim(),
      age: form.age.trim(),
      status: form.isActive ? 'Active' : 'Inactive',
    };

    if (editingUser) {
      setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? { ...user, ...nextUser } : user)));
    } else {
      const nextId = users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
      setUsers((prev) => [...prev, { id: nextId, ...nextUser }]);
    }

    handleCloseModal();
  };

  const toggleActivation = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive, status: !user.isActive ? 'Active' : 'Inactive' } : user,
      ),
    );
  };

  const columns = [
    {
      field: 'fullName',
      headerName: 'Name',
      flex: 1,
      minWidth: 180,
      valueGetter: (params) => `${params?.row?.firstName || ''} ${params?.row?.lastName || ''}`,
    },
    { field: 'username', headerName: 'Username', flex: 1, minWidth: 140 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 140 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Typography sx={{ color: params.value === 'Active' ? 'success.main' : 'warning.main', fontWeight: 700 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.9,
      minWidth: 140,
      sortable: false,
      filterable: false,
      renderCell: ({ row } = {}) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" color="inherit" onClick={() => handleOpenModal(row)} startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleActivation(row.id)}
          >
            {row.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', pb: 4 }}>
        <Stack spacing={4}>
          <Card sx={{ p: 4, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
            <Typography variant="overline" sx={{ color: 'warning.main', letterSpacing: 2 }}>
              Ally Registry
            </Typography>
            <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>
              Ichigo Squad Profiles
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)' }}>
              Search, filter, and manage key Soul Reapers with rules that make adding new allies simple and safe.
            </Typography>
          </Card>

          <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-end" justifyContent="space-between">
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flex={1}>
                <TextField
                  fullWidth
                  label="Search by name, email, or username"
                  variant="filled"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  InputProps={{
                    sx: { bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' },
                  }}
                />
                <FormControl sx={{ minWidth: 140 }}>
                  <Select
                    value={roleFilter}
                    onChange={(event) => setRoleFilter(event.target.value)}
                    displayEmpty
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' }}
                  >
                    <MenuItem value="All">All Roles</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 140 }}>
                  <Select
                    value={genderFilter}
                    onChange={(event) => setGenderFilter(event.target.value)}
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' }}
                  >
                    <MenuItem value="All">All Genders</MenuItem>
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 140 }}>
                  <Select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Button variant="contained" color="warning" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
                Add Ally
              </Button>
            </Stack>
          </Card>

          <Card sx={{ p: 0, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
            <Box sx={{ height: 520, width: '100%' }}>
              <DataGrid
                rows={Array.isArray(filteredRows) ? filteredRows : []}
                columns={columns}
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
                  '& .MuiDataGrid-footerContainer': {
                    bgcolor: 'rgba(30, 41, 59, 0.95)',
                    borderTop: '1px solid rgba(249, 115, 22, 0.15)',
                  },
                }}
              />
            </Box>
          </Card>
        </Stack>

        <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="md">
          <DialogTitle>{editingUser ? 'Edit Ally' : 'Add Ally'}</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleInputChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleInputChange}
                  error={Boolean(errors.contactNumber)}
                  helperText={errors.contactNumber}
                />
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={form.age}
                  onChange={handleInputChange}
                  error={Boolean(errors.age)}
                  helperText={errors.age}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <Select
                    name="gender"
                    value={form.gender}
                    onChange={handleInputChange}
                    sx={{ bgcolor: 'rgba(255,255,255,0.04)', color: 'common.white' }}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                    sx={{ bgcolor: 'rgba(255,255,255,0.04)', color: 'common.white' }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password || 'At least 8 characters.'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Status</Typography>
                <Switch name="isActive" checked={form.isActive} onChange={handleInputChange} />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" color="warning" onClick={handleSubmit}>
              {editingUser ? 'Save Ally' : 'Create Ally'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default UsersPage;
