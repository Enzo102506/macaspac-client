import { useMemo, useState, useEffect } from 'react';
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
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleService';

const blankForm = {
  slug: '',
  title: '',
  paragraphs: '',
  status: 'active',
};

const statusOptions = ['All', 'active', 'inactive'];

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});

  // Fetch articles from API on component mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    loadArticles();
  }, []);

  const filteredRows = useMemo(() => {
    return articles.filter((article) => {
      const searchValue = searchText.trim().toLowerCase();
      const matchesSearch =
        !searchValue ||
        [article.slug, article.title]
          .join(' ')
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === 'All' || article.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchText, statusFilter]);

  const handleOpenModal = (article = null) => {
    if (article) {
      setEditingArticle(article);
      setForm({
        slug: article.slug,
        title: article.title,
        paragraphs: article.paragraphs?.join('\n') || '',
        status: article.status,
      });
    } else {
      setEditingArticle(null);
      setForm(blankForm);
    }
    setErrors({});
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingArticle(null);
    setForm(blankForm);
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    const hasValue = (value) => String(value || '').trim().length > 0;

    if (!hasValue(form.slug)) nextErrors.slug = 'Slug is required.';
    if (!hasValue(form.title)) nextErrors.title = 'Title is required.';
    if (!hasValue(form.paragraphs)) nextErrors.paragraphs = 'At least one paragraph is required.';
    if (!hasValue(form.status)) nextErrors.status = 'Status is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const paragraphsArray = form.paragraphs
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const nextArticle = {
      slug: form.slug.trim().toLowerCase(),
      title: form.title.trim(),
      paragraphs: paragraphsArray,
      status: form.status,
      isActive: form.status === 'active',
    };

    try {
      if (editingArticle) {
        await updateArticle(editingArticle._id, nextArticle);
        setArticles((prev) =>
          prev.map((article) =>
            article._id === editingArticle._id ? { ...article, ...nextArticle } : article
          )
        );
      } else {
        const { data } = await createArticle(nextArticle);
        setArticles((prev) => [...prev, data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving article:', error);
      setErrors({ submit: error.response?.data?.message || 'Error saving article' });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const article = articles.find((a) => a._id === id);
      if (article) {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        const updatedArticle = { ...article, status: newStatus, isActive: newStatus === 'active' };
        await deleteArticle(id);
        setArticles((prev) =>
          prev.map((a) =>
            a._id === id ? updatedArticle : a
          )
        );
      }
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  const columns = [
    {
      field: 'slug',
      headerName: 'Slug',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      flex: 0.8,
      minWidth: 100,
      valueGetter: (params) => params.row.paragraphs?.length || 0,
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 2,
      minWidth: 250,
      valueGetter: (params) => {
        const firstParagraph = params.row.paragraphs?.[0] || '';
        return firstParagraph.substring(0, 80) + (firstParagraph.length > 80 ? '...' : '');
      },
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value === 'active' ? 'Active' : 'Inactive'}
          color={params.value === 'active' ? 'success' : 'error'}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 160,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={() => handleOpenModal(row)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.status === 'active' ? 'warning' : 'success'}
            onClick={() => toggleStatus(row._id, row.status)}
          >
            {row.status === 'active' ? 'Disable' : 'Enable'}
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
              Article Registry
            </Typography>
            <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: 'common.white' }}>
              Article Management
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(226,232,240,0.78)' }}>
              Search, filter, and manage articles with powerful tools for content administration.
            </Typography>
          </Card>

          <Card sx={{ p: 3, bgcolor: 'rgba(15, 23, 42, 0.88)', border: '1px solid rgba(249, 115, 22, 0.18)' }} elevation={0}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-end" justifyContent="space-between">
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flex={1}>
                <TextField
                  fullWidth
                  label="Search by slug or title"
                  variant="filled"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  InputProps={{
                    sx: { bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' },
                  }}
                />
                <FormControl sx={{ minWidth: 140 }}>
                  <Select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    displayEmpty
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status === 'All' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Button variant="contained" color="warning" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
                Add Article
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
                getRowId={(row) => row._id || row.id || Math.random()}
                sx={{
                  border: 'none',
                  color: 'rgba(255,255,255,0.95)',
                  bgcolor: 'rgba(15, 23, 42, 0.88)',
                  '& .MuiDataGrid-cell': {
                    fontSize: '0.875rem',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    bgcolor: 'rgba(249, 115, 22, 0.1)',
                    color: 'rgba(226,232,240,0.95)',
                    fontWeight: 700,
                  },
                  '& .MuiDataGrid-row:hover': {
                    bgcolor: 'rgba(249, 115, 22, 0.08)',
                  },
                }}
              />
            </Box>
          </Card>
        </Stack>
      </Box>

      {/* Add/Edit Modal */}
      <Dialog open={open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'rgba(15, 23, 42, 0.88)', color: 'common.white' }}>
          {editingArticle ? 'Edit Article' : 'Add New Article'}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: 'rgba(15, 23, 42, 0.88)', color: 'common.white', pt: 3 }}>
          {errors.submit && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {errors.submit}
            </Typography>
          )}
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleInputChange}
              error={!!errors.slug}
              helperText={errors.slug}
              disabled={!!editingArticle}
              placeholder="article-slug"
              variant="filled"
              InputProps={{
                sx: { bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' },
              }}
            />
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="Article Title"
              variant="filled"
              InputProps={{
                sx: { bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' },
              }}
            />
            <TextField
              fullWidth
              label="Paragraphs"
              name="paragraphs"
              value={form.paragraphs}
              onChange={handleInputChange}
              error={!!errors.paragraphs}
              helperText={errors.paragraphs || 'One paragraph per line'}
              multiline
              rows={6}
              placeholder="First paragraph&#10;Second paragraph&#10;Third paragraph"
              variant="filled"
              InputProps={{
                sx: { bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' },
              }}
            />
            <FormControl fullWidth error={!!errors.status}>
              <Select
                name="status"
                value={form.status}
                onChange={handleInputChange}
                variant="filled"
                sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ bgcolor: 'rgba(15, 23, 42, 0.88)' }}>
          <Button onClick={handleCloseModal} sx={{ color: 'common.white' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="warning">
            {editingArticle ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashArticleListPage;
