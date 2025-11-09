"use client";
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Person as PersonIcon,
  Article as BlogIcon,
  Event as CalendarIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
  Contacts as ContactsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const stats = [
  { title: 'Profile', count: '3,685', icon: PersonIcon, color: '#8B5CF6', bgColor: '#EDE9FE' },
  { title: 'Blog', count: '256', icon: BlogIcon, color: '#F59E0B', bgColor: '#FEF3C7' },
  { title: 'Calendar', count: '932', icon: CalendarIcon, color: '#3B82F6', bgColor: '#DBEAFE' },
  { title: 'Email', count: '$348K', icon: EmailIcon, color: '#EF4444', bgColor: '#FEE2E2' },
  { title: 'Chats', count: '96', icon: ChatIcon, color: '#10B981', bgColor: '#D1FAE5' },
  { title: 'Contacts', count: '48', icon: ContactsIcon, color: '#8B5CF6', bgColor: '#EDE9FE' },
];

const revenueData = [
  { month: '1/6/24', value: 2.5 },
  { month: '7/6/24', value: -1.5 },
  { month: '14/6/24', value: 3.0 },
  { month: '19/6/24', value: -2.0 },
  { month: '20/6/24', value: 3.5 },
  { month: '23/6/24', value: -1.0 },
  { month: '31/6/24', value: 2.0 },
];

export default function AdminDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('March 2023');

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        {/* Header Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card 
                sx={{ 
                  background: stat.bgColor,
                  boxShadow: 'none',
                  borderRadius: 3,
                  height: '100%'
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <stat.icon />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={stat.color}>
                    {stat.count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Revenue Updates Chart */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Revenue Updates
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overview of Profit
                  </Typography>
                </Box>
                <FormControl size="small">
                  <Select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    sx={{ minWidth: 150 }}
                  >
                    <MenuItem value="March 2023">March 2023</MenuItem>
                    <MenuItem value="April 2023">April 2023</MenuItem>
                    <MenuItem value="May 2023">May 2023</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Revenue Chart */}
              <Box sx={{ position: 'relative', height: 300 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '100%', px: 2 }}>
                  {revenueData.map((data, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 60 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: `${Math.abs(data.value) * 40}px`,
                          background: data.value > 0 
                            ? 'linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%)'
                            : 'linear-gradient(180deg, #3B82F6 0%, #1E40AF 100%)',
                          borderRadius: '8px 8px 0 0',
                          mb: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {data.month}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Stats Below Chart */}
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#3B82F6'
                      }}
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Earnings
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        $63,489.50
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Earnings this month
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      $48,820
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Expenses this month
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      $26,498
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="contained" sx={{ textTransform: 'none', borderRadius: 2 }}>
                  View Full Report
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right Side Stats */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Yearly Breakup */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Yearly Breakup
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
                    <Typography variant="h3" fontWeight="bold">
                      $36,358
                    </Typography>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="h6" color="white" fontWeight="bold">
                        60%
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TrendingUpIcon sx={{ color: '#10B981', fontSize: 20 }} />
                    <Typography variant="body2" color="#10B981" fontWeight="500">
                      +9% last year
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#3B82F6' }} />
                      <Typography variant="body2">2022</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#E5E7EB' }} />
                      <Typography variant="body2">2023</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Monthly Earnings */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Monthly Earnings
                    </Typography>
                    <IconButton 
                      size="small"
                      sx={{
                        bgcolor: '#EFF6FF',
                        color: '#3B82F6',
                        '&:hover': { bgcolor: '#DBEAFE' }
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                    $6,820
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 20 }} />
                    <Typography variant="body2" color="#EF4444" fontWeight="500">
                      +9% last year
                    </Typography>
                  </Box>
                  {/* Simple Wave Line */}
                  <Box sx={{ height: 60, position: 'relative' }}>
                    <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none">
                      <path
                        d="M 0 30 Q 50 10, 100 30 T 200 30 T 300 30"
                        stroke="#60A5FA"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
