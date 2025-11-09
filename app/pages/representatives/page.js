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
      name: 'श्री जगतबहादुर सिम्खडा',
      nameEn: 'Mr. Jagat Bahadur Simkhada',
      position: 'अध्यक्ष',
      positionEn: 'President',
      email: 'president@antuf.org.np',
      phone: '+977-1-4567890',
      location: 'काठमाडौं',
      image: 'https://res.cloudinary.com/dfu758f7t/image/upload/v1762660632/antuf-president-300x300_m0nuve.png',
      bio: 'श्रमिक अधिकारका लागि समर्पित नेतृत्व',
    },
    {
      id: 2,
      name: 'श्री जयबहादुर कार्की',
      nameEn: 'Mr. Jay Bahadur Karki',
      position: 'वरिष्ठ उपाध्यक्ष',
      positionEn: 'Senior Vice President',
      email: 'svp@antuf.org.np',
      phone: '+977-1-4567891',
      location: 'काठमाडौं',
      image: '/images/representatives/karki.jpg',
      bio: 'श्रमिक संगठन र अधिकारमा दीर्घ अनुभव',
    },
    {
      id: 3,
      name: 'श्री धनबहादुर बि.क.',
      nameEn: 'Mr. Dhan Bahadur B.K.',
      position: 'उपाध्यक्ष',
      positionEn: 'Vice President',
      email: 'vp1@antuf.org.np',
      phone: '+977-1-4567892',
      location: 'काठमाडौं',
      image: '/images/representatives/bk.jpg',
      bio: 'श्रमिक कल्याण र विकासमा प्रतिबद्ध',
    },
    {
      id: 4,
      name: 'श्री सोनलाल शाह',
      nameEn: 'Mr. Sonalal Shah',
      position: 'उपाध्यक्ष',
      positionEn: 'Vice President',
      email: 'vp2@antuf.org.np',
      phone: '+977-1-4567893',
      location: 'काठमाडौं',
      image: '/images/representatives/shah.jpg',
      bio: 'सामाजिक न्याय र समानताका लागि सक्रिय',
    },
    {
      id: 5,
      name: 'श्रीमती उषा देवकोटा',
      nameEn: 'Mrs. Usha Devkota',
      position: 'उपाध्यक्ष',
      positionEn: 'Vice President',
      email: 'vp3@antuf.org.np',
      phone: '+977-1-4567894',
      location: 'काठमाडौं',
      image: '/images/representatives/devkota.jpg',
      bio: 'महिला श्रमिक अधिकारमा अग्रणी भूमिका',
    },
    {
      id: 6,
      name: 'श्री सोमबहादुर थापा',
      nameEn: 'Mr. Som Bahadur Thapa',
      position: 'उपाध्यक्ष',
      positionEn: 'Vice President',
      email: 'vp4@antuf.org.np',
      phone: '+977-1-4567895',
      location: 'काठमाडौं',
      image: '/images/representatives/thapa.jpg',
      bio: 'श्रम कानून र नीति निर्माणमा योगदान',
    },
    {
      id: 7,
      name: 'श्री अर्जुन छन्त्याल',
      nameEn: 'Mr. Arjun Chantyal',
      position: 'उपाध्यक्ष',
      positionEn: 'Vice President',
      email: 'vp5@antuf.org.np',
      phone: '+977-1-4567896',
      location: 'काठमाडौं',
      image: '/images/representatives/chantyal.jpg',
      bio: 'श्रमिक एकता र संगठनमा समर्पित',
    },
    {
      id: 8,
      name: 'श्री शालिकराम काफ्ले',
      nameEn: 'Mr. Shalikram Kafle',
      position: 'महासचिव',
      positionEn: 'General Secretary',
      email: 'secretary@antuf.org.np',
      phone: '+977-1-4567897',
      location: 'काठमाडौं',
      image: '/images/representatives/kafle.jpg',
      bio: 'संगठनात्मक विकास र समन्वयमा निपुण',
    },
    {
      id: 9,
      name: 'श्री राजकुमार लामा',
      nameEn: 'Mr. Raj Kumar Lama',
      position: 'उपमहासचिव',
      positionEn: 'Deputy General Secretary',
      email: 'dgs1@antuf.org.np',
      phone: '+977-1-4567898',
      location: 'काठमाडौं',
      image: '/images/representatives/lama.jpg',
      bio: 'श्रमिक सेवा र अधिकारमा अनुभवी',
    },
    {
      id: 10,
      name: 'श्रीमती बिष्णु थापा मगर',
      nameEn: 'Mrs. Bishnu Thapa Magar',
      position: 'उपमहासचिव',
      positionEn: 'Deputy General Secretary',
      email: 'dgs2@antuf.org.np',
      phone: '+977-1-4567899',
      location: 'काठमाडौं',
      image: '/images/representatives/magar.jpg',
      bio: 'महिला सशक्तिकरण र अधिकारमा समर्पित',
    },
    {
      id: 11,
      name: 'श्री प्रकाश श्रेष्ठ',
      nameEn: 'Mr. Prakash Shrestha',
      position: 'उपमहासचिव',
      positionEn: 'Deputy General Secretary',
      email: 'dgs3@antuf.org.np',
      phone: '+977-1-4567900',
      location: 'काठमाडौं',
      image: '/images/representatives/shrestha.jpg',
      bio: 'श्रमिक संगठन र परिचालनमा दक्ष',
    },
    {
      id: 12,
      name: 'श्री भूपाल सापकोटा',
      nameEn: 'Mr. Bhupal Sapkota',
      position: 'उपमहासचिव',
      positionEn: 'Deputy General Secretary',
      email: 'dgs4@antuf.org.np',
      phone: '+977-1-4567901',
      location: 'काठमाडौं',
      image: '/images/representatives/sapkota.jpg',
      bio: 'श्रम नीति र कार्यान्वयनमा विशेषज्ञ',
    },
    {
      id: 13,
      name: 'श्रीमती लालकुमारी पुन',
      nameEn: 'Mrs. Lal Kumari Pun',
      position: 'सचिव',
      positionEn: 'Secretary',
      email: 'sec1@antuf.org.np',
      phone: '+977-1-4567902',
      location: 'काठमाडौं',
      image: '/images/representatives/pun.jpg',
      bio: 'श्रमिक कल्याणमा सक्रिय योगदान',
    },
    {
      id: 14,
      name: 'श्री सोम तामाङ',
      nameEn: 'Mr. Som Tamang',
      position: 'सचिव',
      positionEn: 'Secretary',
      email: 'sec2@antuf.org.np',
      phone: '+977-1-4567903',
      location: 'काठमाडौं',
      image: '/images/representatives/tamang.jpg',
      bio: 'श्रमिक अधिकार र संरक्षणमा प्रतिबद्ध',
    },
    {
      id: 15,
      name: 'श्री नरहरिनाथ योगी',
      nameEn: 'Mr. Naraharinath Yogi',
      position: 'सचिव',
      positionEn: 'Secretary',
      email: 'sec3@antuf.org.np',
      phone: '+977-1-4567904',
      location: 'काठमाडौं',
      image: '/images/representatives/yogi.jpg',
      bio: 'श्रमिक हित र विकासमा समर्पित',
    },
    {
      id: 16,
      name: 'श्री घनश्याम ठकुरी',
      nameEn: 'Mr. Ghanshyam Thakuri',
      position: 'कोषाध्यक्ष',
      positionEn: 'Treasurer',
      email: 'treasurer@antuf.org.np',
      phone: '+977-1-4567905',
      location: 'काठमाडौं',
      image: '/images/representatives/thakuri.jpg',
      bio: 'वित्तीय व्यवस्थापन र पारदर्शितामा विशेषज्ञ',
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
