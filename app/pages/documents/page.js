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
  Breadcrumbs,
  Link,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const DocumentsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    {
      id: 1,
      title: 'संस्थाको विधान / Organization Constitution',
      type: 'PDF',
      size: '2.5 MB',
      date: '२०८०/०१/०१',
      category: 'constitution',
    },
    {
      id: 2,
      title: 'वार्षिक प्रतिवेदन २०८० / Annual Report 2080',
      type: 'PDF',
      size: '5.2 MB',
      date: '२०८०/१२/३०',
      category: 'report',
    },
    {
      id: 3,
      title: 'सदस्यता फारम / Membership Form',
      type: 'PDF',
      size: '500 KB',
      date: '२०७९/०६/१५',
      category: 'form',
    },
    {
      id: 4,
      title: 'आर्थिक विवरण २०८० / Financial Statement 2080',
      type: 'PDF',
      size: '1.8 MB',
      date: '२०८०/१२/३०',
      category: 'financial',
    },
    {
      id: 5,
      title: 'कार्यक्रम प्रस्ताव ढाँचा / Program Proposal Template',
      type: 'DOC',
      size: '350 KB',
      date: '२०७९/०८/२०',
      category: 'template',
    },
    {
      id: 6,
      title: 'नियमावली / Rules and Regulations',
      type: 'PDF',
      size: '1.2 MB',
      date: '२०८०/०३/१५',
      category: 'rules',
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryLabel = (category) => {
    const labels = {
      constitution: 'विधान',
      report: 'प्रतिवेदन',
      form: 'फारम',
      financial: 'आर्थिक',
      template: 'ढाँचा',
      rules: 'नियम',
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      constitution: 'primary',
      report: 'success',
      form: 'info',
      financial: 'warning',
      template: 'secondary',
      rules: 'error',
    };
    return colors[category] || 'default';
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
            दस्तावेज / Documents
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
          <DescriptionIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            महत्त्वपूर्ण दस्तावेजहरू
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Important Documents
          </Typography>
        </Paper>

        {/* Search Bar */}
        <Paper elevation={2} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="दस्तावेज खोज्नुहोस् / Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <Grid container spacing={3}>
            {filteredDocuments.map((doc) => (
              <Grid item xs={12} md={6} key={doc.id}>
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
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        {doc.type === 'PDF' ? (
                          <PdfIcon sx={{ fontSize: 30 }} />
                        ) : (
                          <FileIcon sx={{ fontSize: 30 }} />
                        )}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: 600, fontSize: '1rem' }}
                        >
                          {doc.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={getCategoryLabel(doc.category)}
                            size="small"
                            color={getCategoryColor(doc.category)}
                          />
                          <Chip
                            label={doc.type}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid #eee',
                      }}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          📅 {doc.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          📦 {doc.size}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      >
                        डाउनलोड
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
            <SearchIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.secondary">
              कुनै दस्तावेज फेला परेन
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No documents found matching your search
            </Typography>
          </Paper>
        )}

        {/* Info Note */}
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
            📌 <strong>नोट / Note:</strong> यो पृष्ठ निर्माणाधीन छ। वास्तविक दस्तावेजहरू चाँडै उपलब्ध गराइनेछ।
            <br />
            This page is under construction. Actual documents will be available soon.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default DocumentsPage;
