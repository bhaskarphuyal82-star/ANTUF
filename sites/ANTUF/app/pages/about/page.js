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
            ABOUT US
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

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, fontSize: "1.1rem", color: "white" }}>
            Our Activities/Campaigns: Despite increasing number of trade union in Nepal a large section of the workforce is still subjected to unfair pay, exploitation and discrimination. In this context, ANTUF has been continuously advocating for workers’ rights. Furthermore, it has been intensifying its capacity building activities like trainings, workshops, interactions, orientations, seminars, conferences and discussions across the county. ANTUF has been meticulously striving to safeguard the rights of workers, conducting multi-dimensional programs. The programs include activities like the formation and mobilization of joint OSH committees at workplaces, development of position papers on social security for decent work and democratic labor market and so on. Some of the principal activities are as follows:

            Social Dialogue: Social dialogue on occupational health and safety is key to institutionalize labors’ agenda that eventually leads to the overall prosperity of both workers and the nation. The existing labor acts and regulations in Nepal have some provisions for social security for government employees; however, the informal economy workers are excluded from the formal system of social protection. Whereas the need for broad-based social protection is increasing day by day not only for wage laborers but also for the self-employed, the poor marginalized and socially excluded groups. With globalization and privatization gaining increasing prominence, social protection has become the need of the hour. To uplift living standards of workers through social security provisions, long term planning and vision of a comprehensive social security system has become more important.

            With the purpose of promoting trade union movement to ensure complete social security in Nepal, ANTUF has been rigorously holding regular consultation and dialogue with stakeholders such as political parties, employers, government bodies, etc. demanding for the ratification and implementation of the ILO conventions. The continuous initiation of social dialogue initiated by ANTUF has resulted in some visible changes in implementing basic schemes of social security in some sectors of both formal and informal economies. ANTUF further envisages intensifying right-based social dialogue in days to come to establish a democratic market in Nepal.

            Lobbying and Advocacy: Large mass of workers are still subjected to low pay, far below the minimum wage determined by the government. An effective political lobbying in this situation can be one of the most effective strategies to address the workers’ concerns. Considering the need of this hour, ANTUF has been constantly lobbying and advocating for the protection and promotion of their rights. It has been organizing different events like campaigns, rallies, and media programs to press government, employers and political parties to draw their attention to the legislation and implementation of Labor Act and Social Security Bill. ANTUF intends to intensify similar lobbying and advocacy campaigns in collaboration with major national stakeholders in the future as well.

            Awareness Programs: Safe working environment is a basic need for especially informal economy workers. Unfortunately, in Nepal, a large number of workers are unaware about the use of safety measures which sometimes lead to major workplace accidents. Consequently, many workers suffer serious injuries, physical disability and even death due to the lack of required awareness on occupational health. Thus with the purpose of bringing about awareness among the workers on their occupational health and safety, ANTUF organizes awareness campaigns from time to time. In particular, ANTUF has conducted several OSH awareness trainings/orientations to empower the existing OSH committees throughout the nation. It has also been pressing both employers and the government to implement OHS policy to ensure safe working environment in all workplace settings. The initiative taken by ANTUF has brought about many positive changes in workplace environment and saved life of thousands of workers.

            Capacity Building Training: The capacity building training can substantially empower the workers not only to perform their duty swiftly but also to fight for their rights according to changing trends in the labor market. ANTUF has been conducting capacity building programs such as training on the development of LIS, formation of OSH Policy Guidelines, organizing training (OT), on the CBA and the Training of Trainers (ToT) in different corners of the nation, with the participation of a large number of workers from both formal and informal sectors. These programs are facilitated by trade union expert/leaders where participants are encouraged to actively get involved in floor discussion, group work and presentation. Such programs have directly benefitted hundred of trade union leaders/activists across the nation.

            Networking: Networking plays an instrumental role in maintaining uniformity of understanding about the trade union issues and formulating common strategies to get the labor agendas addressed. Effective networking and coordination among the union leaders helps to integrate efforts against unscrupulous employers. ANTUF has developed the culture of networking at national and international levels to foster communication, mutual cooperation and coordination among trade unions and their solidarity centers across the globe. Through regular networking, the unions are brought at the common table to discuss effective strategies to fight the age-old injustice meted out to the workers by their employers. This has helped to some extent in ensuring social security of workers and a democratic labor market in Nepal.

            Mediation and Negotiation: ANTUF has been playing a key role in minimizing antagonism and increasing harmony among the leaders/activists of the trade unions in Nepal. It has made a significant contribution at maintaining an enhanced level of coordination among the unionists and potential stakeholders through its proactive mediation strategy. The idea of single unionism has been pushed ahead simultaneously and unions have become committed towards joint policy issues of the workers. The result is that, a major chunk of central level as well as plant level leaderships have been involved in collaborative efforts to create more coherence in the policies and strategies for the common goal of entire workforce. ANTUF has been playing an important role in facilitating the tri-partite negotiation process for settling the contentious issues in an amicable manner. It has helped the concerned parties/entities to peacefully settle the existing disputes between workers and employers on several occasions.


          </Typography>


        </Box>

        {/* Contact Information */}

      </Container>

      <Footer />
    </>
  );
};

export default AboutUs;
