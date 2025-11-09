'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Divider,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  AccountTree as AccountTreeIcon,
  People as PeopleIcon,
  AssignmentInd as AssignmentIndIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const OrganizationPage = () => {
  const router = useRouter();

  const organizationStructure = [
    {
      title: 'अध्यक्ष / President',
      name: 'To be added',
      icon: <AssignmentIndIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'उपाध्यक्ष / Vice President',
      name: 'To be added',
      icon: <AssignmentIndIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'महासचिव / General Secretary',
      name: 'To be added',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'कोषाध्यक्ष / Treasurer',
      name: 'To be added',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    },
  ];

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
            संगठन / Organization
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
          <BusinessIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            संगठन संरचना
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Organization Structure
          </Typography>
        </Paper>

        {/* About Organization */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            <AccountTreeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            संगठनात्मक विवरण / Organizational Details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            ANTUF एक गैर-लाभकारी संस्था हो जसले शैक्षिक र सामाजिक विकासमा योगदान पुर्‍याउँछ।
            यो संगठन विभिन्न विभाग र समितिहरूद्वारा सञ्चालित छ।
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            ANTUF is a non-profit organization dedicated to educational and social development.
            The organization operates through various departments and committees to achieve its goals.
          </Typography>
        </Paper>

        {/* Organization Chart */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            नेतृत्व टोली / Leadership Team
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            {organizationStructure.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={1}
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: 'white',
                      }}
                    >
                      {member.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, fontSize: '1rem' }}
                    >
                      {member.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Departments */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            विभागहरू / Departments
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2}>
            {[
              'शिक्षा विभाग / Education Department',
              'युवा विभाग / Youth Department',
              'महिला विभाग / Women Department',
              'खेलकुद विभाग / Sports Department',
            ].map((dept, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: '#f9f9f9',
                    borderRadius: 1,
                    borderLeft: 4,
                    borderColor: '#667eea',
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    • {dept}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Note */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            bgcolor: '#fff3e0',
            borderRadius: 2,
            borderLeft: 4,
            borderColor: '#ff9800',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            📝 <strong>नोट / Note:</strong> यो पृष्ठ निर्माणाधीन छ। थप जानकारी चाँडै थपिनेछ।
            <br />
            This page is under construction. More information will be added soon.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrganizationPage;
