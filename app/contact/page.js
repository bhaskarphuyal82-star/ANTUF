"use client";

import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  TextField, 
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
  Snackbar
} from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: "#2f7d32" }} />,
      title: "Email Us",
      content: "info@tutorialsmaterial.com",
      description: "Send us your queries anytime"
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: "#2f7d32" }} />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9:00 AM - 6:00 PM EST"
    },

    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: "#2f7d32" }} />,
      title: "Support Hours",
      content: "24/7 Online Support",
      description: "We're here to help you learn"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Navbar />
      
      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "40vh",
          background: "linear-gradient(135deg, #2f7d32 0%, #1b5e20 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/images/pic2.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: "700",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              textShadow: "2px 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              maxWidth: "600px",
              mx: "auto",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              fontWeight: "300",
              textShadow: "1px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Get in touch with us. We're here to help you succeed in your learning journey.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Contact Information Cards */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: "#333", 
              mb: 6, 
              textAlign: "center", 
              fontWeight: "700",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 4,
                backgroundColor: "#2f7d32",
                borderRadius: 2,
              }
            }}
          >
            Get In Touch
          </Typography>
          
          <Grid container spacing={4}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    border: "2px solid #f0f0f0",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 16px 48px rgba(47, 125, 50, 0.15)",
                      borderColor: "#2f7d32",
                    }
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {info.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "700", mb: 1, color: "#333" }}>
                    {info.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#2f7d32", mb: 1, fontWeight: "600" }}>
                    {info.content}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {info.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Form and Map Section */}
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 6, border: "1px solid #e0e0e0", borderRadius: 3 }}>
              <Typography variant="h4" sx={{ color: "#333", fontWeight: "700", mb: 4 }}>
                Send us a Message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#2f7d32",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#2f7d32",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#2f7d32",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#2f7d32",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#2f7d32",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#2f7d32",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#2f7d32",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#2f7d32",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#2f7d32",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#2f7d32",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#2f7d32",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#2f7d32",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        backgroundColor: "#2f7d32",
                        color: "#fff",
                        px: 4,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "#1b5e20",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 24px rgba(47, 125, 50, 0.3)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e0e0", borderRadius: 3, height: "fit-content" }}>
              <Typography variant="h5" sx={{ color: "#333", fontWeight: "700", mb: 3 }}>
                Quick Contact
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
                  General Inquiries
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  📧 info@tutorialsmaterial.com
                </Typography>
               
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
                  Support Team
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  📧 support@tutorialsmaterial.com
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Available 24/7 for technical assistance
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
                  Business Partnerships
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  📧 partnerships@tutorialsmaterial.com
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  For corporate training and collaborations
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  p: 3, 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: 2,
                  border: "1px solid #e9ecef"
                }}
              >
                <Typography variant="h6" sx={{ color: "#333", fontWeight: "600", mb: 2 }}>
                  Response Time
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call our support line.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: "#333", 
              fontWeight: "700", 
              mb: 4, 
              textAlign: "center" 
            }}
          >
            Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
                  How can I enroll in a course?
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                  You can browse our course catalog, select the course you're interested in, and click "Enroll Now". 
                  Follow the payment process to get instant access to the course materials.
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
                  Do you offer refunds?
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                  Yes, we offer a 30-day money-back guarantee for all our courses. Please check our refund policy 
                  for detailed terms and conditions.
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
                  Can I access courses on mobile?
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                  Absolutely! Our platform is fully responsive and optimized for mobile devices. You can learn 
                  anytime, anywhere from your smartphone or tablet.
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
                  Do you provide certificates?
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                  Yes, upon successful completion of a course, you'll receive a certificate of completion that you 
                  can add to your professional profile and resume.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Thank you for your message! We'll get back to you within 24 hours.
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default ContactUs;
