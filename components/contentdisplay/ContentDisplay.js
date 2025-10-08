import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent } from "@mui/material";

import Footer from "@/components/footer/Footer";
import Accordionleft from "@/components/categorysingle/Accordion";
import Centerads from "@/components/categorysingle/Centerads";

import Content from "@/components/categorysingle/Content";
import Title from "@/components/categorysingle/Title";
import SimilarReads from "@/components/categorysingle/SimilarReads";
import Advertisement from "@/components/categorysingle/Advertisement";
import Advertisementtop from "@/components/categorysingle/Advertisementtop";

// import { useSession } from "next-auth/react";
import Advertisementbottom from "@/components/categorysingle/Advertisementbottom";

// import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default function ContentLayout({ content, loading }) {
  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: "#212121", color: "#fff", minHeight: "100vh", width: "100%" }}>

        <Grid container spacing={3}>
  <Grid size="auto">
    <Grid item xs={12} md={2.5}>
            <Box sx={{ position: "sticky", top: "20px", height: "fit-content" }}>
              <Accordionleft />
            </Box>
          </Grid>
  </Grid>
  <Grid size={7}>
     <Box sx={{ p: 2 }}>
              <Centerads />
              <Title content={content} loading={loading} />
              <Content content={content} loading={loading} />
              <SimilarReads />
            </Box>
  </Grid>
  <Grid size="grow">
        <Box sx={{ position: "sticky", top: "20px", height: "fit-content" }}>
              <Card sx={{ bgcolor: "#1a1a1a", color: "#fff", border: "1px solid #333" }}>
                <CardContent sx={{ p: 1 }}>
                  <Advertisement />
                  <Box sx={{ mt: 2 }}>
                    <Advertisementtop />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Advertisementbottom />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Advertisement />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Advertisementtop />
                  </Box>
                </CardContent>
              </Card>
            </Box>
  </Grid>
</Grid>

        {/* Floating Menu Icon for Mobile */}
        {/* <Footer /> */}
      </Box>
      <Footer />
    </>
  );
}