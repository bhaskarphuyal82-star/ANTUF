'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import {
  Flag as FlagIcon,
  People as PeopleIcon,
  Gavel as GavelIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EventsIcon,
  MenuBook as BookIcon,
} from '@mui/icons-material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function HistoryPage() {
  const milestones = [
    {
      year: '२०४५ (1988)',
      title: 'संगठनको स्थापना / Organization Founded',
      description: 'नेपाल ट्रेड युनियन फेडरेशन (ANTUF) को स्थापना भएको थियो।',
      icon: <FlagIcon />,
      color: 'primary',
    },
    {
      year: '२०५० (1993)',
      title: 'राष्ट्रिय सम्मेलन / National Convention',
      description: 'पहिलो राष्ट्रिय सम्मेलन सफलतापूर्वक सम्पन्न भयो।',
      icon: <PeopleIcon />,
      color: 'success',
    },
    {
      year: '२०५८ (2001)',
      title: 'श्रमिक अधिकार संरक्षण / Workers Rights Protection',
      description: 'श्रमिक अधिकारको लागि ठूलो आन्दोलन सफल भयो।',
      icon: <GavelIcon />,
      color: 'error',
    },
    {
      year: '२०६३ (2006)',
      title: 'जनआन्दोलन सहभागिता / People\'s Movement Participation',
      description: 'ऐतिहासिक जनआन्दोलनमा महत्वपूर्ण भूमिका खेलेको।',
      icon: <TrendingUpIcon />,
      color: 'warning',
    },
    {
      year: '२०७२ (2015)',
      title: 'भूकम्प राहत कार्य / Earthquake Relief',
      description: 'विनाशकारी भूकम्पपछि श्रमिकहरूको राहत र पुनर्स्थापना।',
      icon: <EventsIcon />,
      color: 'info',
    },
    {
      year: '२०७८ (2021)',
      title: 'डिजिटल युग / Digital Era',
      description: 'डिजिटल प्रणालीमार्फत सेवा विस्तार र आधुनिकीकरण।',
      icon: <BookIcon />,
      color: 'secondary',
    },
  ];

  const achievements = [
    {
      title: 'सदस्य संख्या',
      value: '50,000+',
      description: 'देशभरका सक्रिय सदस्यहरू',
    },
    {
      title: 'सफल आन्दोलनहरू',
      value: '100+',
      description: 'श्रमिक अधिकारका लागि',
    },
    {
      title: 'प्रभावित श्रमिकहरू',
      value: '5,00,000+',
      description: 'प्रत्यक्ष लाभान्वित',
    },
    {
      title: 'जिल्ला समितिहरू',
      value: '77',
      description: 'सबै जिल्लामा उपस्थिति',
    },
  ];

  return (
    <>
      <Navbar />
      
      <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
        {/* Header Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 6,
            mb: 4,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 700,
                textAlign: 'center',
                mb: 2,
              }}
            >
              हाम्रो इतिहास
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
              }}
            >
              Our History & Journey
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {/* Achievements Stats */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                      }}
                    >
                      {achievement.value}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Timeline Section */}
          <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              महत्त्वपूर्ण माइलस्टोनहरू
            </Typography>

            <Timeline position="alternate">
              {milestones.map((milestone, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    <Chip
                      label={milestone.year}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                      }}
                    />
                  </TimelineOppositeContent>
                  
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={milestone.color} sx={{ p: 2 }}>
                      {milestone.icon}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      <Typography variant="h6" component="span" fontWeight={600}>
                        {milestone.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {milestone.description}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>

          {/* Vision Statement */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: 4,
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
              हाम्रो दृष्टिकोण
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9, lineHeight: 1.8 }}>
              नेपालका सबै श्रमिकहरूको अधिकार सुरक्षित गर्दै, सामाजिक न्याय र समानताको स्थापना गर्ने हाम्रो दृष्टिकोण रहेको छ। हामी श्रमिक वर्गको सशक्तिकरण र उनीहरूको जीवनस्तर सुधारमा प्रतिबद्ध छौं।
            </Typography>
          </Card>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
