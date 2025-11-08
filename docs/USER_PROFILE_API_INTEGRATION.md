# User Profile API - Integration Guide

## Overview

This guide shows how to integrate the User Profile API into your Next.js/React application with complete examples.

---

## File Locations

```
API Routes:
├── /app/api/user/profile/route.js                    # User endpoints
├── /app/api/admin/users/profile/route.js            # Admin list/update/delete
└── /app/api/admin/users/[userId]/profile/route.js   # Admin get/update/delete by ID

Components:
└── /components/admin/user/UserManagement.js          # Full user management UI

Pages:
└── /app/dashboard/admin/alluser/page.js             # Admin users page

Models:
└── /models/user.js                                   # User schema

Documentation:
├── USER_PROFILE_API_GUIDE.md                         # Complete guide
├── USER_PROFILE_API_QUICK_REF.md                     # Quick reference
└── USER_PROFILE_API_TROUBLESHOOTING.md              # Troubleshooting
```

---

## 1. User Profile Hook

Create a reusable hook for user profile management:

```javascript
// hooks/useUserProfile.js
import { useState, useEffect } from 'react';

export function useUserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile
  const fetchProfile = async (userId = null) => {
    setLoading(true);
    setError(null);
    try {
      const url = userId 
        ? `/api/user/profile?userId=${userId}`
        : '/api/user/profile';
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch profile');
      
      const data = await response.json();
      setUser(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const data = await response.json();
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    fetchProfile,
    updateProfile
  };
}
```

**Usage:**
```javascript
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProfilePage() {
  const { user, loading, error, fetchProfile, updateProfile } = useUserProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateProfile({
      phone: '9841234567',
      bio: 'Updated bio'
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <form onSubmit={handleUpdate}>
        {/* form fields */}
      </form>
    </div>
  );
}
```

---

## 2. Admin Users Hook

Create a hook for admin user management:

```javascript
// hooks/useAdminUsers.js
import { useState } from 'react';

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users with filters
  const fetchUsers = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('page', filters.page || 1);
      params.append('limit', filters.limit || 20);
      if (filters.search) params.append('search', filters.search);
      if (filters.role) params.append('role', filters.role);
      if (filters.isActive) params.append('isActive', filters.isActive);

      const response = await fetch(`/api/admin/users/profile?${params}`);
      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data.data || []);
      setPagination(data.pagination);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get single user
  const getUser = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/profile`);
      if (!response.ok) throw new Error('Failed to fetch user');
      const data = await response.json();
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (userId, updates) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update user');
      const data = await response.json();
      
      // Update local state
      setUsers(users.map(u => u._id === userId ? data.data : u));
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/profile`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete user');
      
      // Remove from local state
      setUsers(users.filter(u => u._id !== userId));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    pagination,
    loading,
    error,
    fetchUsers,
    getUser,
    updateUser,
    deleteUser
  };
}
```

**Usage:**
```javascript
import { useAdminUsers } from '@/hooks/useAdminUsers';

export default function AdminUsers() {
  const { users, fetchUsers, updateUser, deleteUser } = useAdminUsers();

  useEffect(() => {
    fetchUsers({ role: 'user', page: 1 });
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user._id}>
          <h3>{user.name}</h3>
          <button onClick={() => updateUser(user._id, { role: 'admin' })}>
            Make Admin
          </button>
          <button onClick={() => deleteUser(user._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 3. User Avatar Component

Create a reusable avatar component:

```javascript
// components/UserAvatar.js
import { Avatar } from '@mui/material';

const getInitials = (name) => {
  return name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
};

export default function UserAvatar({ user, size = 40 }) {
  const getColor = (name) => {
    const colors = ['#1976d2', '#dc3545', '#28a745', '#ffc107', '#17a2b8'];
    const index = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  return (
    <Avatar
      alt={user?.name || 'User'}
      src={user?.image || ''}
      sx={{
        width: size,
        height: size,
        bgcolor: getColor(user?.name),
        fontWeight: 'bold'
      }}
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    >
      {getInitials(user?.name)}
    </Avatar>
  );
}
```

**Usage:**
```javascript
import UserAvatar from '@/components/UserAvatar';

<UserAvatar user={user} size={50} />
```

---

## 4. Profile Edit Form

Create a reusable profile edit form:

```javascript
// components/ProfileEditForm.js
import { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';

export default function ProfileEditForm({ user, onSave, loading = false }) {
  const [formData, setFormData] = useState(user || {});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await onSave(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Profile updated successfully!</Alert>}

        <TextField
          label="Name"
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={loading}
        />

        <TextField
          label="Email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={loading}
        />

        <TextField
          label="Phone"
          value={formData.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          disabled={loading}
        />

        <TextField
          label="City"
          value={formData.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
          disabled={loading}
        />

        <TextField
          label="Bio"
          multiline
          rows={4}
          value={formData.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Stack>
    </form>
  );
}
```

**Usage:**
```javascript
import ProfileEditForm from '@/components/ProfileEditForm';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProfilePage() {
  const { user, loading, updateProfile } = useUserProfile();

  return (
    <ProfileEditForm
      user={user}
      onSave={updateProfile}
      loading={loading}
    />
  );
}
```

---

## 5. Using Existing Components

The application already has a fully built user management component:

```javascript
// Import the component
import UserManagement from '@/components/admin/user/UserManagement';

// Use in your page
export default function AdminUsersPage() {
  return <UserManagement />;
}
```

Navigate to `/dashboard/admin/alluser` to see it in action.

---

## 6. Complete Page Example

```javascript
// app/dashboard/profile/page.js
'use client';

import { useEffect, useState } from 'react';
import { Container, Box, Tabs, Tab, Paper, CircularProgress } from '@mui/material';
import ProfileEditForm from '@/components/ProfileEditForm';
import UserAvatar from '@/components/UserAvatar';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProfilePage() {
  const { user, loading, fetchProfile, updateProfile } = useUserProfile();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading && !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        {/* User Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <UserAvatar user={user} size={60} />
          <Box sx={{ ml: 2 }}>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Profile" />
          <Tab label="Settings" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ pt: 3 }}>
          {tab === 0 && (
            <ProfileEditForm
              user={user}
              onSave={updateProfile}
              loading={loading}
            />
          )}
          {tab === 1 && <div>Settings content here</div>}
        </Box>
      </Paper>
    </Container>
  );
}
```

---

## 7. Error Handling Best Practices

```javascript
import { useUserProfile } from '@/hooks/useUserProfile';

export default function SafeProfileComponent() {
  const { user, error, updateProfile } = useUserProfile();

  const handleUpdateWithErrorHandling = async (updates) => {
    try {
      await updateProfile(updates);
      // Show success message
      showNotification('Profile updated successfully', 'success');
    } catch (err) {
      // Handle specific errors
      if (err.message.includes('401')) {
        // Redirect to login
        window.location.href = '/login';
      } else if (err.message.includes('403')) {
        // Show permission error
        showNotification('You do not have permission', 'error');
      } else if (err.message.includes('Email already exists')) {
        // Show email conflict error
        showNotification('Email already in use', 'error');
      } else {
        // Show generic error
        showNotification(err.message, 'error');
      }
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {/* Form content */}
    </div>
  );
}
```

---

## 8. Caching and Performance

```javascript
// services/userService.js
class UserService {
  constructor() {
    this.cache = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes
  }

  async fetchProfile(userId = null) {
    const cacheKey = userId || 'current';
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    const url = userId
      ? `/api/user/profile?userId=${userId}`
      : '/api/user/profile';

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }

  invalidateCache(userId = null) {
    if (userId) {
      this.cache.delete(userId);
    } else {
      this.cache.clear();
    }
  }
}

export default new UserService();
```

**Usage:**
```javascript
import userService from '@/services/userService';

// Fetch with caching
const user = await userService.fetchProfile();

// Invalidate cache after update
userService.invalidateCache();
```

---

## 9. Testing

```javascript
// __tests__/useUserProfile.test.js
import { renderHook, act } from '@testing-library/react';
import { useUserProfile } from '@/hooks/useUserProfile';

describe('useUserProfile', () => {
  it('should fetch user profile', async () => {
    const { result } = renderHook(() => useUserProfile());

    await act(async () => {
      await result.current.fetchProfile();
    });

    expect(result.current.user).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it('should update profile', async () => {
    const { result } = renderHook(() => useUserProfile());

    await act(async () => {
      await result.current.updateProfile({ phone: '9841234567' });
    });

    expect(result.current.user.phone).toBe('9841234567');
  });
});
```

---

## Quick Checklist

- [ ] Import hooks or components as needed
- [ ] Ensure user is authenticated
- [ ] Handle loading and error states
- [ ] Validate input data before sending
- [ ] Display user-friendly error messages
- [ ] Cache results for better performance
- [ ] Implement proper error boundaries
- [ ] Add loading indicators
- [ ] Test API responses

---

## Common Patterns

### Fetch and Display
```javascript
useEffect(() => {
  fetchProfile();
}, []);
```

### Update with Validation
```javascript
const handleUpdate = async (data) => {
  if (!data.name) {
    setError('Name is required');
    return;
  }
  await updateProfile(data);
};
```

### List with Pagination
```javascript
const [page, setPage] = useState(1);

useEffect(() => {
  fetchUsers({ page });
}, [page]);
```

---

## Support

- Full Guide: `USER_PROFILE_API_GUIDE.md`
- Quick Ref: `USER_PROFILE_API_QUICK_REF.md`
- Troubleshooting: `USER_PROFILE_API_TROUBLESHOOTING.md`
- Component: `/components/admin/user/UserManagement.js`
