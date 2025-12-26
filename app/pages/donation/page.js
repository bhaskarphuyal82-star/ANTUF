'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Divider,
  Alert,
  InputAdornment,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  AccountBalance as BankIcon,
  CreditCard as CardIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function DonationPage() {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(null);

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000];

  useEffect(() => {
    fetchDonationPage();
  }, []);

  const fetchDonationPage = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/donation');
      const data = await response.json();

      if (data.success) {
        setPageData(data.data);
      } else {
        setError('Failed to load donation page');
      }
    } catch (err) {
      console.error('Error fetching donation page:', err);
      setError('Failed to load donation page');
    } finally {
      setLoading(false);
    }
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handleDonate = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  if (error || !pageData) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="error">{error || 'Failed to load donation page'}</Alert>
        </Container>
        <Footer />
      </>
    );
  }

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
            <FavoriteIcon sx={{ fontSize: 80, color: 'white', display: 'block', mx: 'auto', mb: 3 }} />
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                textAlign: 'center',
                mb: 2,
              }}
            >
              {pageData.headerTitle}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                mb: 2,
              }}
            >
              {pageData.headerTitleEn}
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
              {pageData.headerSubtitle}
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {showSuccess && (
            <Alert
              severity="success"
              icon={<CheckIcon />}
              sx={{ mb: 4, fontSize: '1.1rem' }}
            >
              धन्यवाद! तपाईंको दानको लागि हामी कृतज्ञ छौं। हामीले तपाईंको इमेलमा पुष्टिकरण पठाएका छौं।
            </Alert>
          )}

          <Grid container spacing={4}>
            {/* Donation Form */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  दान विवरण
                </Typography>

                {/* Donation Type */}
                <FormControl component="fieldset" sx={{ mb: 4 }}>
                  <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
                    दान प्रकार
                  </FormLabel>
                  <RadioGroup
                    row
                    value={donationType}
                    onChange={(e) => setDonationType(e.target.value)}
                  >
                    <FormControlLabel
                      value="one-time"
                      control={<Radio />}
                      label="एक पटक"
                    />
                    <FormControlLabel
                      value="monthly"
                      control={<Radio />}
                      label="मासिक"
                    />
                    <FormControlLabel
                      value="yearly"
                      control={<Radio />}
                      label="वार्षिक"
                    />
                  </RadioGroup>
                </FormControl>

                <Divider sx={{ my: 3 }} />

                {/* Amount Selection */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  रकम चयन गर्नुहोस्
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {predefinedAmounts.map((value) => (
                    <Grid item xs={6} sm={4} key={value}>
                      <Button
                        fullWidth
                        variant={amount === value ? 'contained' : 'outlined'}
                        onClick={() => handleAmountSelect(value)}
                        sx={{
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          ...(amount === value && {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          }),
                        }}
                      >
                        NPR {value.toLocaleString()}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {/* Custom Amount */}
                <TextField
                  fullWidth
                  label="कस्टम रकम"
                  placeholder="अन्य रकम प्रविष्ट गर्नुहोस्"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">NPR</InputAdornment>,
                  }}
                  sx={{ mb: 4 }}
                />

                <Divider sx={{ my: 3 }} />

                {/* Payment Method */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  भुक्तानी विधि
                </Typography>

                <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <Paper
                      elevation={paymentMethod === 'bank' ? 3 : 0}
                      sx={{
                        p: 2,
                        mb: 2,
                        border: paymentMethod === 'bank' ? '2px solid #667eea' : '1px solid #e5e7eb',
                        cursor: 'pointer',
                      }}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <FormControlLabel
                        value="bank"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <BankIcon sx={{ color: '#667eea' }} />
                            <Box>
                              <Typography variant="body1" fontWeight={600}>
                                बैंक ट्रान्सफर
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                सिधै बैंक खातामा जम्मा गर्नुहोस्
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </Paper>

                    <Paper
                      elevation={paymentMethod === 'card' ? 3 : 0}
                      sx={{
                        p: 2,
                        mb: 2,
                        border: paymentMethod === 'card' ? '2px solid #667eea' : '1px solid #e5e7eb',
                        cursor: 'pointer',
                      }}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CardIcon sx={{ color: '#667eea' }} />
                            <Box>
                              <Typography variant="body1" fontWeight={600}>
                                क्रेडिट/डेबिट कार्ड
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Visa, Mastercard, etc.
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </Paper>

                    <Paper
                      elevation={paymentMethod === 'esewa' ? 3 : 0}
                      sx={{
                        p: 2,
                        border: paymentMethod === 'esewa' ? '2px solid #667eea' : '1px solid #e5e7eb',
                        cursor: 'pointer',
                      }}
                      onClick={() => setPaymentMethod('esewa')}
                    >
                      <FormControlLabel
                        value="esewa"
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PaymentIcon sx={{ color: '#667eea' }} />
                            <Box>
                              <Typography variant="body1" fontWeight={600}>
                                eSewa / Khalti
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                मोबाइल वालेट प्रयोग गर्नुहोस्
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </Paper>
                  </RadioGroup>
                </FormControl>

                {/* Donor Information */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  तपाईंको विवरण
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="पूरा नाम" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="इमेल" type="email" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="फोन नम्बर" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="ठेगाना" />
                  </Grid>
                </Grid>

                {/* Donate Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<FavoriteIcon />}
                  onClick={handleDonate}
                  sx={{
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                    },
                  }}
                >
                  दान गर्नुहोस्
                </Button>
              </Card>
            </Grid>

            {/* Sidebar - Impact & Bank Details */}
            <Grid item xs={12} md={4}>
              {/* Impact Card */}
              <Card sx={{ mb: 3, p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  तपाईंको प्रभाव
                </Typography>
                {pageData.impactItems?.map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Chip label={`NPR ${item.amount}`} color="primary" size="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {item.description}
                    </Typography>
                  </Box>
                ))}
              </Card>

              {/* Bank Details */}
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}
              >
                <BankIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  बैंक विवरण
                </Typography>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 2, borderRadius: 2, mb: 1 }}>
                  <Typography variant="caption">बैंकको नाम</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {pageData.bankDetails?.bankName}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 2, borderRadius: 2, mb: 1 }}>
                  <Typography variant="caption">खाता नाम</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {pageData.bankDetails?.accountName}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 2, borderRadius: 2, mb: 1 }}>
                  <Typography variant="caption">खाता नम्बर</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {pageData.bankDetails?.accountNumber}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 2, borderRadius: 2 }}>
                  <Typography variant="caption">शाखा</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {pageData.bankDetails?.branch}
                  </Typography>
                </Box>
              </Paper>

              {/* Contact Info */}
              <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  सहयोग चाहियो?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pageData.helpText}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  📧 {pageData.contactEmail}
                </Typography>
                <Typography variant="body2">
                  📞 {pageData.contactPhone}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
