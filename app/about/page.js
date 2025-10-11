"use client";

import React from "react";
import { Box, Typography, Container, Paper, Grid, Card, CardContent, Avatar } from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportIcon from "@mui/icons-material/Support";

const AboutUs = () => {
  const stats = [
    { number: "10,000+", label: "Students Enrolled" },
    { number: "500+", label: "Courses Available" },
    { number: "50+", label: "Expert Instructors" },
    { number: "95%", label: "Success Rate" },
  ];

  const keyFeatures = [
    "Comprehensive educational portal spanning multiple domains",
    "Interview preparation with company-wise guides",
    "Hands-on coding challenges and practice problems",
    "Structured courses for high-demand technologies",
    "Content created by top mentors from renowned institutions",
    "Trusted platform with focus on clarity and accessibility"
  ];

  return (
    <>
      <Navbar />
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              color: "#2f7d32",
              fontWeight: "700",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            About Tutorials Material
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: "#2f7d32",
              mx: "auto",
              borderRadius: 2,
              mb: 4,
            }}
          />
        </Box>

        {/* Company Profile Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "600", mb: 3 }}>
            1. Company Profile and Brand:
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
            Tutorials Material is a comprehensive educational portal that empowers learners across domains—spanning 
            computer science, web development, programming languages, and professional development. With thousands of 
            registered users globally, and growing daily visitors, we provide a vast collection of tutorials, 
            interview guides, concept explainers, coding challenges, practice problems, and structured courses, 
            catering to both academic and professional needs.
          </Typography>
          
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
            We're especially known for our in-depth resources on interview preparation, helping learners land roles 
            at top tech companies with our curated content, mock interviews, and industry insights.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
            Our courses and learning paths for high-demand technologies like Web Development, Data Structures & 
            Algorithms, System Design, and Machine Learning are ideal for professionals aiming to level up or switch 
            domains. Our certifications ensure to add credibility and enhance our learners' career prospects.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
            Our content is created and curated by top mentors from renowned institutions and organizations, ensuring 
            quality and relevance. With a focus on clarity, accessibility, and impact, we help students and 
            professionals alike turn curiosity into expertise.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4, fontSize: "1.1rem", color: "white" }}>
            At Tutorials Material, we're more than just a platform—we're a community. A space to learn, grow, and 
            stay ahead in an ever-evolving world of education and technology.
          </Typography>

          {/* Key Features List */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
              Key Features:
            </Typography>
            {/* <Box component="ul" sx={{ pl: 3 }}>
              {keyFeatures.map((feature, index) => (
                <Typography 
                  key={index}
                  component="li" 
                  variant="body1" 
                  sx={{ 
                    mb: 1, 
                    color: "white", 
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    listStyleType: "disc"
                  }}
                >
                  {feature}
                </Typography>
              ))}
            </Box> */}
          </Box>

          {/* Statistics */}
          <Box sx={{ mb: 4, p: 3, backgroundColor: "#f8f9fa", borderRadius: 2, border: "1px solid #e9ecef" }}>
            {/* <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: "700", 
                        color: "#2f7d32",
                        fontSize: { xs: "1.5rem", md: "2rem" }
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", fontWeight: "500" }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid> */}
          </Box>
        </Box>

        {/* Corporate History, Mission, Vision Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "600", mb: 3 }}>
            2. Corporate History, Mission, Vision, and Motto:
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
              Corporate History:
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
              Founded in 2020 by a team of passionate educators and technology experts, Tutorials Material began as a 
              platform to simplify complex programming concepts and bridge the gap between theoretical knowledge and 
              practical application. Over the years, it has evolved into a comprehensive educational portal—supporting 
              learners in programming, web development, data science, and professional growth.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
              Mission:
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
              To empower learners across domains by providing accessible, high-quality educational content that bridges 
              the gap between theory and practical application—helping them excel in academics, careers, and beyond.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
              Vision:
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
              To be the most comprehensive, inclusive, and trusted learning platform—enabling individuals from all walks 
              of life to access knowledge, gain confidence, and succeed in their educational and career journeys.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "#2f7d32", fontWeight: "600", mb: 2 }}>
              Motto:
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1.1rem", color: "white" }}>
              <strong>"Learn, Practice, and Excel"</strong> - A commitment to lifelong learning, hands-on experience, 
              and achieving personal growth, no matter the field.
            </Typography>
          </Box>
        </Box>

        {/* Company Founder Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "600", mb: 3 }}>
            3. Company Leadership:
          </Typography>
          
          <Box sx={{ p: 4, backgroundColor: "#f8f9fa", borderRadius: 2, border: "1px solid #e9ecef" }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1.1rem", color: "black" }}>
              Our leadership team comprises visionary entrepreneurs and esteemed technology experts. Fueled by an 
              unwavering passion for coding and education, they laid the very foundation upon which Tutorials Material 
              stands today. Their indomitable spirit has been instrumental in our remarkable growth and success. As the 
              steadfast driving force behind the company, our leaders remain beacons of guidance and inspiration, 
              propelling the team to constantly challenge limits and craft transformative learning experiences.
            </Typography>
          </Box>
        </Box>

        {/* Contact Information */}
    
      </Container>

      <Footer />
    </>
  );
};

export default AboutUs;
