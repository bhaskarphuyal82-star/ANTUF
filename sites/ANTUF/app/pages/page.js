'use client';

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Fade,
} from '@mui/material';
import {
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  MenuBook as MenuBookIcon,
  Group as GroupIcon,
  Phone as PhoneIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  Business as BusinessIcon,
  EmojiEvents as EventsIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import staticPages from './index';

const iconMap = {
  '📖': <MenuBookIcon />,
  '👥': <GroupIcon />,
  '📞': <PhoneIcon />,
  '💝': <FavoriteIcon />,
  '📚': <HistoryIcon />,
  '🏢': <BusinessIcon />,
  '🎯': <EventsIcon />,
  '📄': <DescriptionIcon />,
};

const StaticPagesIndex = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = staticPages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (path) => {
    router.push(path);
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
          <Typography color="text.primary">
            पृष्ठहरू / Pages
          </Typography>
        </Breadcrumbs>

        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            color: 'white',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
            }}
          >
            स्थिर पृष्ठहरू
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 3,
            }}
          >
            Static Pages
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              opacity: 0.95,
            }}
          >
            ANTUF संगठनसँग सम्बन्धित सबै महत्त्वपूर्ण पृष्ठहरू एउटै ठाउँमा
            <br />
            Access all important pages related to ANTUF organization in one place
          </Typography>
        </Paper>

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="पृष्ठ खोज्नुहोस् / Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
            }}
          />
        </Box>

        {/* Results Count */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${filteredPages.length} पृष्ठहरू / ${filteredPages.length} Pages`}
            color="primary"
            variant="outlined"
          />
          {searchQuery && (
            <Chip
              label={`"${searchQuery}" को लागि खोजी गरिँदैछ`}
              color="secondary"
              variant="outlined"
              onDelete={() => setSearchQuery('')}
            />
          )}
        </Box>

        {/* Pages Grid */}
        {filteredPages.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPages.map((page, index) => (
              <Grid item xs={12} sm={6} md={4} key={page.id}>
                <Fade in={true} timeout={300 + index * 100}>
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleCardClick(page.path)}
                      sx={{ height: '100%', p: 2 }}
                    >
                      <CardContent>
                        {/* Icon */}
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            color: 'white',
                          }}
                        >
                          {iconMap[page.icon] || page.icon}
                        </Box>

                        {/* Title */}
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: '#333',
                            mb: 1,
                            lineHeight: 1.4,
                          }}
                        >
                          {page.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                          }}
                        >
                          {page.description}
                        </Typography>

                        {/* Status Indicator */}
                        <Box sx={{ mt: 2 }}>
                          {['about', 'contact', 'donation', 'history', 'representatives'].includes(page.id) ? (
                            <Chip
                              label="उपलब्ध / Available"
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              label="आगामी / Coming Soon"
                              size="small"
                              color="warning"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              bgcolor: 'white',
              borderRadius: 2,
            }}
          >
            <SearchIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.secondary">
              कुनै पृष्ठ फेला परेन
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No pages found matching your search
            </Typography>
          </Paper>
        )}

        {/* Footer Info */}
        <Paper
          elevation={0}
          sx={{
            mt: 6,
            p: 3,
            bgcolor: 'white',
            borderRadius: 2,
            borderLeft: 4,
            borderColor: '#667eea',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            ℹ️ जानकारी / Information
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            यी सबै पृष्ठहरू ANTUF संगठनका विभिन्न पक्षहरूको बारेमा जानकारी प्रदान गर्दछन्।
          </Typography>
          <Typography variant="body2" color="text.secondary">
            These pages provide information about various aspects of the ANTUF organization.
            Click on any card to view detailed information.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default StaticPagesIndex;
