'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function RepresentativesPage() {
  const representatives = [
    {
      id: 1,
      name: 'श्री राम प्रसाद शर्मा',
      nameEn: 'Ram Prasad Sharma',
      position: 'अध्यक्ष',
      positionEn: 'President',
      email: 'president@antuf.org.np',
      phone: '+977-1-4567890',
      location: 'काठमाडौं',
      image: '/images/representatives/president.jpg',
      bio: 'श्रमिक अधिकारका लागि २० वर्षभन्दा बढी समयदेखि सक्रिय',
    },
    {
      id: 2,
      name: 'सुश्री सीता देवी पौडेल',
      nameEn: 'Sita Devi Paudel',
      position: 'उपाध्यक्ष',
      positionEn: 'Vice President',
      email: 'vicepresident@antuf.org.np',
      phone: '+977-1-4567891',
      location: 'ललितपुर',
      image: '/images/representatives/vp.jpg',
      bio: 'महिला श्रमिक अधिकार तथा सामाजिक सुरक्षामा विशेषज्ञ',
    },
    {
      id: 3,
      name: 'श्री गोपाल बहादुर थापा',
      nameEn: 'Gopal Bahadur Thapa',
      position: 'महासचिव',
      positionEn: 'General Secretary',
      email: 'secretary@antuf.org.np',
      phone: '+977-1-4567892',
      location: 'भक्तपुर',
      image: '/images/representatives/secretary.jpg',
      bio: 'संगठनात्मक विकास र श्रमिक एकतामा अग्रणी भूमिका',
    },
    {
      id: 4,
      name: 'श्री कृष्ण बहादुर राई',
      nameEn: 'Krishna Bahadur Rai',
      position: 'कोषाध्यक्ष',
      positionEn: 'Treasurer',
      email: 'treasurer@antuf.org.np',
      phone: '+977-1-4567893',
      location: 'काठमाडौं',
      image: '/images/representatives/treasurer.jpg',
      bio: 'वित्तीय व्यवस्थापन र पारदर्शितामा प्रतिबद्ध',
    },
    {
      id: 5,
      name: 'सुश्री माया लामा',
      nameEn: 'Maya Lama',
      position: 'सदस्य',
      positionEn: 'Member',
      email: 'maya@antuf.org.np',
      phone: '+977-1-4567894',
      location: 'काभ्रे',
      image: '/images/representatives/member1.jpg',
      bio: 'सामुदायिक संगठन र सामाजिक परिचालनमा अनुभवी',
    },
    {
      id: 6,
      name: 'श्री विजय कुमार श्रेष्ठ',
      nameEn: 'Vijay Kumar Shrestha',
      position: 'सदस्य',
      positionEn: 'Member',
      email: 'vijay@antuf.org.np',
      phone: '+977-1-4567895',
      location: 'पोखरा',
      image: '/images/representatives/member2.jpg',
      bio: 'श्रम कानून र न्याय प्रणालीमा विशेषज्ञता',
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
              जनप्रतिनिधिहरू
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                mb: 1,
              }}
            >
              Our Representatives
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              ANTUF को नेतृत्व टोली - श्रमिक अधिकार र सामाजिक न्यायका लागि समर्पित
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {/* Representatives Grid */}
          <Grid container spacing={4}>
            {representatives.map((rep) => (
              <Grid item xs={12} sm={6} md={4} key={rep.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  {/* Profile Header */}
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      pt: 4,
                      pb: 8,
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Avatar
                      src={rep.image}
                      alt={rep.name}
                      sx={{
                        width: 120,
                        height: 120,
                        border: '5px solid white',
                        boxShadow: 3,
                      }}
                    />
                  </Box>

                  <CardContent sx={{ mt: -4, pt: 5 }}>
                    {/* Position Badge */}
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Chip
                        icon={<WorkIcon />}
                        label={rep.position}
                        color="primary"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      />
                    </Box>

                    {/* Name */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 0.5,
                        color: '#1f2937',
                      }}
                    >
                      {rep.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: 'center',
                        color: '#6b7280',
                        mb: 2,
                      }}
                    >
                      {rep.nameEn}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Bio */}
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: 'center',
                        color: '#6b7280',
                        mb: 3,
                        fontStyle: 'italic',
                        minHeight: 60,
                      }}
                    >
                      {rep.bio}
                    </Typography>

                    {/* Contact Info */}
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: '#f9fafb',
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <EmailIcon sx={{ fontSize: 18, color: '#667eea' }} />
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                          {rep.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <PhoneIcon sx={{ fontSize: 18, color: '#667eea' }} />
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                          {rep.phone}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon sx={{ fontSize: 18, color: '#667eea' }} />
                        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                          {rep.location}
                        </Typography>
                      </Box>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

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
              हामीसँग सम्पर्क राख्नुहोस्
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
              श्रमिक अधिकार र सेवासम्बन्धी जानकारीका लागि हामीलाई सम्पर्क गर्नुहोस्।
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
