'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  CircularProgress,
  Pagination,
  Stack,
  Alert,
  MenuItem,
  Avatar,
  Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

const getInitials = (name) => {
  return name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    bio: '',
    isActive: true,
    role: 'user',
  });

  const limit = 10;

  // Fetch users with filters
  const fetchUsers = async (pageNum = 1, search = '', role = '', active = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('page', pageNum);
      params.append('limit', limit);
      if (search) params.append('search', search);
      if (role) params.append('role', role);
      if (active) params.append('isActive', active);

      const url = `/api/admin/users/profile?${params.toString()}`;
      console.log('Fetching from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers.get('content-type'));

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = `Failed to fetch users: ${response.status} ${response.statusText}`;
        let responseText = '';
        
        if (contentType?.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.err || errorData.error || errorMessage;
          } catch (e) {
            console.error('Could not parse error response:', e);
            responseText = await response.text();
          }
        } else {
          responseText = await response.text();
          console.error('Non-JSON response received. First 500 chars:', responseText.substring(0, 500));
        }
        
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but got:', text.substring(0, 500));
        throw new Error('API returned non-JSON response. Check server logs.');
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      if (data.success) {
        setUsers(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, searchTerm, filterRole, filterActive);
  }, [page]);

  // Handle search
  const handleSearch = () => {
    setPage(1);
    fetchUsers(1, searchTerm, filterRole, filterActive);
  };

  // Handle filter
  const handleFilterChange = (field, value) => {
    setPage(1);
    if (field === 'role') setFilterRole(value);
    if (field === 'active') setFilterActive(value);
    if (field === 'role') fetchUsers(1, searchTerm, value, filterActive);
    if (field === 'active') fetchUsers(1, searchTerm, filterRole, value);
  };

  // Open edit dialog
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',
      bio: user.bio || '',
      isActive: user.isActive !== false,
      role: user.role || 'user',
    });
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      country: '',
      bio: '',
      isActive: true,
      role: 'user',
    });
  };

  // Update user
  const handleSaveUser = async () => {
    if (!editingUser) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${editingUser._id}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        setError(null);
        handleCloseDialog();
        fetchUsers(page, searchTerm, filterRole, filterActive);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error updating user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/profile`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      setError(null);
      fetchUsers(page, searchTerm, filterRole, filterActive);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>User Management</h2>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => fetchUsers(1, searchTerm, filterRole, filterActive)}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>

        {/* Error Alert */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Search and Filter */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Filter by Role"
              value={filterRole}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              size="small"
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Filter by Status"
              value={filterActive}
              onChange={(e) => handleFilterChange('active', e.target.value)}
              size="small"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Users Table */}
        <TableContainer component={Paper}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id} hover>
                      <TableCell>
                        <Avatar
                          alt={user.name}
                          src={user.image || ''}
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#1976d2',
                          }}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || '-'}</TableCell>
                      <TableCell>{user.city || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={user.role === 'admin' ? 'error' : 'default'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? 'Active' : 'Inactive'}
                          color={user.isActive ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditClick(user)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>
        )}
      </Stack>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User: {editingUser?.name}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
            />
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) => handleFormChange('city', e.target.value)}
            />
            <TextField
              fullWidth
              label="State"
              value={formData.state}
              onChange={(e) => handleFormChange('state', e.target.value)}
            />
            <TextField
              fullWidth
              label="Country"
              value={formData.country}
              onChange={(e) => handleFormChange('country', e.target.value)}
            />
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={3}
              value={formData.bio}
              onChange={(e) => handleFormChange('bio', e.target.value)}
            />
            <TextField
              select
              fullWidth
              label="Role"
              value={formData.role}
              onChange={(e) => handleFormChange('role', e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Status"
              value={formData.isActive}
              onChange={(e) => handleFormChange('isActive', e.target.value === 'true')}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
