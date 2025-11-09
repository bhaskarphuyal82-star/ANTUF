'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Chip,
  Divider,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  EmojiEvents as EventsIcon,
  School as SchoolIcon,
  Volunteer as VolunteerIcon,
  Campaign as CampaignIcon,
  LocalHospital as HealthIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const ActivitiesPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const activities = [
    {
      category: 'शैक्षिक / Education',
      icon: <SchoolIcon />,
      items: [
        {
          title: 'छात्रवृत्ति कार्यक्रम / Scholarship Program',
          description: 'विद्यार्थीहरूलाई शैक्षिक सहयोग',
          date: '२०२४',
          status: 'ongoing',
        },
        {
          title: 'शिक्षक तालिम / Teacher Training',
          description: 'शिक्षकहरूको क्षमता विकास',
          date: '२०२३-२०२४',
          status: 'completed',
        },
      ],
    },
    {
      category: 'सामाजिक / Social',
      icon: <VolunteerIcon />,
      items: [
        {
          title: 'रक्तदान कार्यक्रम / Blood Donation',
          description: 'वार्षिक रक्तदान शिविर',
          date: 'जेष्ठ २०८१',
          status: 'upcoming',
        },
        {
          title: 'स्वच्छता अभियान / Cleanliness Campaign',
          description: 'समुदाय सफाई कार्यक्रम',
          date: 'चैत्र २०८०',
          status: 'completed',
        },
      ],
    },
    {
      category: 'स्वास्थ्य / Health',
      icon: <HealthIcon />,
      items: [
        {
          title: 'स्वास्थ्य शिविर / Health Camp',
          description: 'निःशुल्क स्वास्थ्य परीक्षण',
          date: 'कार्तिक २०८१',
          status: 'planned',
        },
      ],
    },
    {
      category: 'जागरुकता / Awareness',
      icon: <CampaignIcon />,
      items: [
        {
          title: 'युवा सम्मेलन / Youth Conference',
          description: 'युवाहरूको क्षमता विकास',
          date: 'माघ २०८०',
          status: 'completed',
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'primary';
      case 'completed': return 'success';
      case 'upcoming': return 'warning';
      case 'planned': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ongoing': return 'जारी / Ongoing';
      case 'completed': return 'सम्पन्न / Completed';
      case 'upcoming': return 'आगामी / Upcoming';
      case 'planned': return 'योजनाबद्ध / Planned';
      default: return status;
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            color="inherit"
            onClick={() => router.push('/')}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            गृहपृष्ठ / Home
          </Link>
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            color="inherit"
            onClick={() => router.push('/pages')}
          >
            पृष्ठहरू / Pages
          </Link>
          <Typography color="text.primary">
            गतिविधि / Activities
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <EventsIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            हाम्रा गतिविधिहरू
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Our Activities
          </Typography>
        </Paper>

        {/* Tabs */}
        <Paper elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                fontWeight: 600,
              },
            }}
          >
            {activities.map((category, index) => (
              <Tab
                key={index}
                label={category.category}
                icon={category.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Paper>

        {/* Activities Grid */}
        {activities.map((category, categoryIndex) => (
          <Box
            key={categoryIndex}
            sx={{ display: activeTab === categoryIndex ? 'block' : 'none' }}
          >
            <Grid container spacing={3}>
              {category.items.map((activity, activityIndex) => (
                <Grid item xs={12} md={6} key={activityIndex}>
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                          {activity.title}
                        </Typography>
                        <Chip
                          label={getStatusLabel(activity.status)}
                          color={getStatusColor(activity.status)}
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {activity.description}
                      </Typography>
                      
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 2,
                          pt: 2,
                          borderTop: '1px solid #eee',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          📅 {activity.date}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* Summary */}
        <Paper elevation={2} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            गतिविधि सारांश / Activity Summary
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#667eea' }}>
                  15+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  कुल कार्यक्रम / Total Programs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#4caf50' }}>
                  10
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  सम्पन्न / Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#ff9800' }}>
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  जारी / Ongoing
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#2196f3' }}>
                  2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  योजनाबद्ध / Planned
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Note */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            bgcolor: '#e3f2fd',
            borderRadius: 2,
            borderLeft: 4,
            borderColor: '#2196f3',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            💡 <strong>जानकारी / Info:</strong> यो पृष्ठ निर्माणाधीन छ। थप गतिविधिहरू र तस्बिरहरू चाँडै थपिनेछन्।
            <br />
            This page is under construction. More activities and photos will be added soon.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ActivitiesPage;
