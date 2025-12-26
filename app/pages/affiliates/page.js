'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  Divider,
  Link,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as WebsiteIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function AffiliatesPage() {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/affiliates');
      const data = await response.json();

      if (data.success) {
        setAffiliates(data.data);
      } else {
        setError('Failed to load affiliates');
      }
    } catch (err) {
      console.error('Error fetching affiliates:', err);
      setError('Failed to load affiliates');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Transport: '#2196f3',
      Textile: '#e91e63',
      Hospitality: '#ff9800',
      Construction: '#795548',
      Healthcare: '#4caf50',
      Education: '#9c27b0',
      Agriculture: '#8bc34a',
      Technology: '#00bcd4',
      Banking: '#607d8b',
    };
    return colors[category] || '#667eea';
  };

  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
        {/* Header Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 8,
            mb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                textAlign: 'center',
                mb: 2,
              }}
            >
              हाम्रा सम्बद्ध संगठनहरू
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'rgba(255,255,255,0.95)',
                textAlign: 'center',
                mb: 2,
              }}
            >
              Our Affiliates
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                textAlign: 'center',
                maxWidth: '900px',
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              ANTUF सँग सम्बद्ध विभिन्न क्षेत्रका श्रमिक संगठनहरू - एकताबद्ध भएर श्रमिक अधिकारको संरक्षण र सामाजिक न्याय स्थापनामा समर्पित
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {error && !loading && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && affiliates.length > 0 && (
            <>
              {/* Stats Section */}
              <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {affiliates.length}
                    </Typography>
                    <Typography variant="body1">सम्बद्ध संगठन</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      465K+
                    </Typography>
                    <Typography variant="body1">कुल सदस्य</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      77
                    </Typography>
                    <Typography variant="body1">जिल्ला समिति</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      9
                    </Typography>
                    <Typography variant="body1">उद्योग क्षेत्र</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Affiliates Grid */}
              <Grid container spacing={4}>
                {affiliates.map((affiliate) => (
                  <Grid item xs={12} md={6} key={affiliate._id}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 8,
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        {/* Category Badge */}
                        <Chip
                          label={affiliate.categoryNp}
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            bgcolor: getCategoryColor(affiliate.category),
                            color: 'white',
                            fontWeight: 600,
                            zIndex: 1,
                          }}
                        />

                        {/* Logo/Header */}
                        <Box
                          sx={{
                            height: 120,
                            background: `linear-gradient(135deg, ${getCategoryColor(affiliate.category)} 0%, ${getCategoryColor(affiliate.category)}dd 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                          }}
                        >
                          <BusinessIcon sx={{ fontSize: 60, color: 'white', opacity: 0.9 }} />
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        {/* Name */}
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            color: '#1f2937',
                          }}
                        >
                          {affiliate.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#6b7280',
                            mb: 2,
                            fontStyle: 'italic',
                          }}
                        >
                          {affiliate.nameEn}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#4b5563',
                            mb: 2,
                            lineHeight: 1.6,
                          }}
                        >
                          {affiliate.description}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* Info Grid */}
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <PeopleIcon sx={{ fontSize: 18, color: getCategoryColor(affiliate.category) }} />
                              <Box>
                                <Typography variant="caption" sx={{ display: 'block', color: '#6b7280' }}>
                                  सदस्य संख्या
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {affiliate.members}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <BusinessIcon sx={{ fontSize: 18, color: getCategoryColor(affiliate.category) }} />
                              <Box>
                                <Typography variant="caption" sx={{ display: 'block', color: '#6b7280' }}>
                                  स्थापना
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {affiliate.established}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Contact Info */}
                        <Paper
                          elevation={0}
                          sx={{
                            bgcolor: '#f9fafb',
                            p: 2,
                            borderRadius: 2,
                            mt: 2,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <LocationIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                            <Typography variant="caption" sx={{ color: '#4b5563' }}>
                              {affiliate.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <PhoneIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                            <Typography variant="caption" sx={{ color: '#4b5563' }}>
                              {affiliate.phone}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <EmailIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                            <Typography variant="caption" sx={{ color: '#4b5563' }}>
                              {affiliate.email}
                            </Typography>
                          </Box>
                          {affiliate.website && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <WebsiteIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                              <Link
                                href={`http://${affiliate.website}`}
                                target="_blank"
                                sx={{
                                  fontSize: '0.75rem',
                                  color: getCategoryColor(affiliate.category),
                                  textDecoration: 'none',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  },
                                }}
                              >
                                {affiliate.website}
                              </Link>
                            </Box>
                          )}
                        </Paper>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Call to Action */}
          <Paper
            elevation={3}
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              सम्बद्ध हुन चाहनुहुन्छ?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
              तपाईंको संगठन ANTUF सँग सम्बद्ध भई श्रमिक अधिकारको संयुक्त आवाज बन्न चाहनुहुन्छ भने हामीलाई सम्पर्क गर्नुहोस्।
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              📧 info@antuf.org.np | 📞 +977-1-4567890
            </Typography>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
