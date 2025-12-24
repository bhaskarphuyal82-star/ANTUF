import { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent } from "@mui/material";
import Accordionleft from "@/components/articlesingle/Accordion";
import Advertisement from "@/components/articlesingle/Advertisement";
import Advertisementtop from "@/components/articlesingle/Advertisementtop";
import Advertisementbottom from "@/components/articlesingle/Advertisementbottom";
import Centerads from "@/components/articlesingle/Centerads";



import Content from "@/components/articlesingle/Content";
import Title from "@/components/articlesingle/Title";
import SimilarReads from "@/components/articlesingle/SimilarReads";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


export default function ArticleLayout({ content, loading }) {
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    if (!content || loading) return;

    // Check if content is a full curriculum or a single lecture
    if (content.sections && Array.isArray(content.sections) && content.sections.length > 0) {
      // It's a full curriculum, get the first lecture from the first section
      const firstSection = content.sections[0];
      if (firstSection && firstSection.lectures && firstSection.lectures.length > 0) {
        const firstLecture = firstSection.lectures[0];
        setDisplayContent({
          ...firstLecture,
          curriculumTitle: content.title,
          curriculumSlug: content.slug,
          sectionTitle: firstSection.title
        });
      }
    } else {
      // It's a simple article without sections
      setDisplayContent(content);
    }
  }, [content, loading]);
  return (
    <>
      <Navbar />

      <Box sx={{ bgcolor: "#212121", color: "#fff", minHeight: "100vh", width: "100%" }}>
        <Grid 
          container 
          spacing={1} 
          justifyContent="center"
        >
          {/* <Grid size="auto">
            <Grid item xs={12} md={2.5}>
              <Box sx={{ position: "sticky", top: "20px", height: "fit-content" }}>
                <Accordionleft curriculum={content} />
              </Box>
            </Grid>
          </Grid> */}
          <Grid item xs={12} md={10} lg={10}>
            <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
              {/* <Centerads /> */}
              <Title content={displayContent} loading={loading || !displayContent} />
              <Content content={displayContent} loading={loading || !displayContent} />
              <SimilarReads currentTitle={displayContent?.title} />
            </Box>
          </Grid>
          {/* <Grid size="grow">
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
  </Grid> */}

        </Grid>

      </Box>
      <Footer />
    </>
  )
}