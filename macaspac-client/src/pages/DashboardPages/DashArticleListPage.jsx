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
  imageUrl: '',
  paragraphs: '',
  status: 'active',
};

const statusOptions = ['All', 'draft', 'published'];

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
        const normalized = Array.isArray(data)
          ? data.map((article) => ({
              ...article,
              category: article.category || 'General',
              paragraphs: Array.isArray(article.paragraphs) ? article.paragraphs : [],
            }))
          : [];
        setArticles(normalized);
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
        [article.slug, article.title, article.category]
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
        imageUrl: article.imageUrl || '',
        paragraphs: article.paragraphs?.join('\n') || '',
        status: article.status === 'published' ? 'active' : 'inactive',
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
      category: 'General',
      imageUrl: form.imageUrl.trim(),
      paragraphs: paragraphsArray,
      status: form.status === 'active' ? 'published' : 'draft',
      isVisible: form.status === 'active',
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
        setArticles((prev) => [
          ...prev,
          {
            ...data,
            paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : [],
          },
        ]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving article:', error);
      setErrors({ submit: error.response?.data?.message || 'Error saving article' });
    }
  };

  const toggleStatus = async (id, currentVisibility) => {
    try {
      const article = articles.find((a) => a._id === id);
      if (article) {
        const updatedArticle = { ...article, isVisible: !currentVisibility };
        await updateArticle(id, updatedArticle);
        setArticles((prev) =>
          prev.map((a) =>
            a._id === id ? updatedArticle : a
          )
        );
      }
    } catch (error) {
      console.error('Error updating article visibility:', error);
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
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 140,
      valueGetter: (params) => params?.row?.category || 'General',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value === 'published' ? 'Published' : 'Draft'}
          color={params.value === 'published' ? 'success' : 'warning'}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'isVisible',
      headerName: 'Visible',
      flex: 0.8,
      minWidth: 110,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'success' : 'default'}
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
            color={row.isVisible ? 'warning' : 'success'}
            onClick={() => toggleStatus(row._id, row.isVisible)}
          >
            {row.isVisible ? 'Hide' : 'Show'}
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
                  '& .MuiDataGrid-cell': { fontSize: '0.875rem' },
                  '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderWrapper': {
                    backgroundColor: 'rgba(30, 41, 59, 0.95) !important',
                    color: 'rgba(226, 232, 240, 0.95) !important',
                    borderBottom: '1px solid rgba(249,115,22,0.06) !important',
                  },
                  '& .MuiDataGrid-columnSeparator': { color: 'rgba(255,255,255,0.06) !important' },
                  '& .MuiDataGrid-virtualScroller': { bgcolor: 'rgba(15, 23, 42, 0.75)' },
                  '& .MuiDataGrid-row:hover': { bgcolor: 'rgba(248, 113, 30, 0.12)' },
                  '& .MuiDataGrid-footerContainer': { bgcolor: 'rgba(30, 41, 59, 0.95)', borderTop: '1px solid rgba(249, 115, 22, 0.15)' },
                  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': { outline: 'none' },
                  '& .MuiDataGrid-row.Mui-selected, & .Mui-selected': { bgcolor: 'rgba(249, 115, 22, 0.12) !important' },
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
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleInputChange}
              placeholder="https://..."
              variant="filled"
              InputProps={{
                sx: { bgcolor: 'rgba(255,255,255,0.05)', color: 'common.white' },
              }}
            />
            <TextField
              fullWidth
              label="Content paragraphs"
              name="paragraphs"
              value={form.paragraphs}
              onChange={handleInputChange}
              error={!!errors.paragraphs}
              helperText={errors.paragraphs || 'Enter each paragraph on a new line.'}
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
            Save Article
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashArticleListPage;
