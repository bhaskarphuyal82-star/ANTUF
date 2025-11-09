'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowForward as ArrowForwardIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
 import Sidebar from "@/components/sidebar/SideBar";   
import Profile from "@/components/admin/image/ImageComponent";
export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCourses: 0,
    totalEvents: 0,
    totalArticles: 0,
    recentUsers: [],
    recentOrders: [],
    revenueData: [],
  });

  useEffect(() => {
  
  }, [session, status, router]);

  useEffect(() => {
    
      fetchDashboardData();
    
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalUsers: 1248,
        totalRevenue: 45231.89,
        totalOrders: 532,
        totalCourses: 24,
        totalEvents: 12,
        totalArticles: 156,
        recentUsers: [
          { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: '2024-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: '2024-01-14' },
          { id: 3, name: 'Ram Sharma', email: 'ram@example.com', joinedAt: '2024-01-13' },
        ],
        recentOrders: [
          { id: 1, user: 'John Doe', course: 'Web Development', amount: 99.99, status: 'completed', date: '2024-01-15' },
          { id: 2, user: 'Jane Smith', course: 'Data Science', amount: 149.99, status: 'pending', date: '2024-01-14' },
          { id: 3, user: 'Ram Sharma', course: 'Digital Marketing', amount: 79.99, status: 'completed', date: '2024-01-13' },
        ],
        revenueData: [
          { month: 'Jan', revenue: 4200, growth: 12 },
          { month: 'Feb', revenue: 5100, growth: 21 },
          { month: 'Mar', revenue: 4800, growth: 14 },
          { month: 'Apr', revenue: 6300, growth: 31 },
          { month: 'May', revenue: 5900, growth: -6 },
          { month: 'Jun', revenue: 7200, growth: 22 },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };




  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      trend: 15.3,
      trendUp: true,
      color: '#10b981',
      bgColor: '#dcfce7',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      trend: 23.5,
      trendUp: true,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: <CartIcon sx={{ fontSize: 40 }} />,
      trend: 8.2,
      trendUp: true,
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      trend: -2.1,
      trendUp: false,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', pb: 4 }}>

      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          pt: 4,
          pb: 8,
          mb: -4,
        }}
      >
        <Container maxWidth="xl">
                <Profile/>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Welcome back,  Here's what's happening today.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: stat.bgColor,
                        color: stat.color,
                        width: 64,
                        height: 64,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Chip
                      icon={stat.trendUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      label={`${Math.abs(stat.trend)}%`}
                      color={stat.trendUp ? 'success' : 'error'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color={stat.color}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component={Link}
                href="/dashboard/admin/events"
                fullWidth
                variant="outlined"
                startIcon={<EventIcon />}
                sx={{
                  py: 1.5,
                  justifyContent: 'flex-start',
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  '&:hover': {
                    borderColor: '#2563eb',
                    bgcolor: '#eff6ff',
                  },
                }}
              >
                Manage Events
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component={Link}
                href="/dashboard/admin/create"
                fullWidth
                variant="outlined"
                startIcon={<SchoolIcon />}
                sx={{
                  py: 1.5,
                  justifyContent: 'flex-start',
                  borderColor: '#10b981',
                  color: '#10b981',
                  '&:hover': {
                    borderColor: '#059669',
                    bgcolor: '#d1fae5',
                  },
                }}
              >
                Manage Courses
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component={Link}
                href="/dashboard/admin/create/post"
                fullWidth
                variant="outlined"
                startIcon={<ArticleIcon />}
                sx={{
                  py: 1.5,
                  justifyContent: 'flex-start',
                  borderColor: '#f59e0b',
                  color: '#f59e0b',
                  '&:hover': {
                    borderColor: '#d97706',
                    bgcolor: '#fef3c7',
                  },
                }}
              >
                View Articles
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                component={Link}
                href="/dashboard/admin/orders"
                fullWidth
                variant="outlined"
                startIcon={<CartIcon />}
                sx={{
                  py: 1.5,
                  justifyContent: 'flex-start',
                  borderColor: '#8b5cf6',
                  color: '#8b5cf6',
                  '&:hover': {
                    borderColor: '#7c3aed',
                    bgcolor: '#ede9fe',
                  },
                }}
              >
                View Orders
              </Button>
            </Grid>
          </Grid>
        </Card>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Revenue Overview */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Revenue Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monthly revenue statistics
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    size="small"
                  >
                    Export
                  </Button>
                </Box>

                {/* Revenue Chart */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 300 }}>
                  {stats.revenueData.map((item, index) => {
                    const height = (item.revenue / 8000) * 250;
                    return (
                      <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 80 }}>
                        <Typography variant="caption" fontWeight="bold" color="success.main" sx={{ mb: 1 }}>
                          ${(item.revenue / 1000).toFixed(1)}k
                        </Typography>
                        <Paper
                          elevation={3}
                          sx={{
                            width: '100%',
                            height: `${height}px`,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '8px 8px 0 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                              opacity: 0.8,
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                          {item.month}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {/* Revenue Stats */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Earnings
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        $63,489.50
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        This Month
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" color="success.main">
                        $48,820
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Expenses
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" color="error.main">
                        $26,498
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Side Stats */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Events Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#dbeafe', color: '#3b82f6', mr: 2, width: 56, height: 56 }}>
                        <EventIcon sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total Events
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {stats.totalEvents}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      component={Link}
                      href="/dashboard/admin/events"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{ mt: 1 }}
                    >
                      View all events
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Articles Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#fef3c7', color: '#f59e0b', mr: 2, width: 56, height: 56 }}>
                        <ArticleIcon sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total Articles
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {stats.totalArticles}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      component={Link}
                      href="/dashboard/admin/post"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{ mt: 1 }}
                    >
                      Manage articles
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Active Users Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#dcfce7', color: '#10b981', mr: 2, width: 56, height: 56 }}>
                        <PeopleIcon sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Active Users
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          842
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Activity Rate
                        </Typography>
                        <Typography variant="caption" fontWeight="bold">
                          67.5%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={67.5}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          bgcolor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Activity Tables */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Recent Users */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Users
                  </Typography>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Joined</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.recentUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          sx={{
                            '&:hover': { bgcolor: '#f9fafb' },
                            transition: 'background-color 0.2s',
                          }}
                        >
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.joinedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  component={Link}
                  href="/dashboard/admin/alluser"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 2 }}
                >
                  View all users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Orders
                  </Typography>
                  <IconButton size="small">
                    <VisibilityIcon />
                  </IconButton>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.recentOrders.map((order) => (
                        <TableRow
                          key={order.id}
                          sx={{
                            '&:hover': { bgcolor: '#f9fafb' },
                            transition: 'background-color 0.2s',
                          }}
                        >
                          <TableCell>{order.user}</TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">${order.amount}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              color={order.status === 'completed' ? 'success' : 'warning'}
                              size="small"
                              sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  component={Link}
                  href="/dashboard/admin/orders"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 2 }}
                >
                  View all orders
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
        <Sidebar />
    </Box>
  );
}
