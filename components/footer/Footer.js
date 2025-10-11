"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [categorydata, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchcatewithsubcatedata = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.API}/homepage/catewithsubcate`
      );
      const data = await response.json();
      console.log("Footer data-----", data);
      setCategoryData(data || []);
    } catch (error) {
      console.log("Error fetching cat with sub cat", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcatewithsubcatedata();
  }, []);

  const formatteddata = categorydata.reduce((acc, item) => {
    const categoryName = item.categoryId.name;
    const categorySlug = item.categoryId.slug;
    const subcategoryName = item.subcategoryId.name;
    const subcategorySlug = item.subcategoryId.slug;
    let category = acc.find((c) => c.name === categoryName);
    if (!category) {
      category = {
        name: categoryName,
        slug: categorySlug,
        subcategories: [],
      };
      acc.push(category);
    }
    let subcategory = category.subcategories.find(
      (sc) => sc.name === subcategoryName
    );

    if (!subcategory) {
      subcategory = {
        name: subcategoryName,
        slug: subcategorySlug,
      };
      category.subcategories.push(subcategory);
    }
    return acc;
  }, []);

  console.log("formatted data-----", formatteddata);

  return (
    <>
      <Box
        sx={{
          bgColor: "#212121",
          color: "white",
          py: 4,
          px: isSmallScreen ? 2 : 8,
        }}
      >
        <Grid container spacing={4}>
          <Grid item sx={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "green" }}>
              Tutorialsmaterial

            </Typography>

            <Typography sx={{ mt: 2 }}>
              Corporate & Communications Address B-123 
            </Typography>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                gap: 2,
                justifyContent: "start",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ maxWidth: "150px", height: "auto" }}
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                style={{ maxWidth: "150px", height: "auto" }}
              />
            </Box>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "white" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>

          {loading ? (
            <Grid item sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress sx={{ color: "green" }} />
            </Grid>
          ) : (
            formatteddata.map((section, index) => (
              <Grid item xs={12} sm={4} md={2} key={index}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    display: "block",
                    color: "green",
                    textDecoration: "none",
                    fontSize: isSmallScreen ? "18px" : "20px",
                    fontStyle: "normal",
                    letterSpacing: "0.5px",
                    lineHeight: "1.6",
                    wordSpacing: "1px",
                    cursor: "pointer",
                    "&:hover": { color: "green" },
                    mb: 0.5,
                  }}
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  onClick={() => router.push(`/${section?.slug}`)}
                >
                  {section?.name}
                </Typography>
                {section.subcategories.map((link, linkIndex) => (
                  <Typography
                    key={linkIndex}
                    onClick={() => router.push(`/${link?.slug}`)}
                    sx={{
                      cursor: "pointer",
                      display: "block",
                      color: "white",
                      textDecoration: "none",
                      fontSize: isSmallScreen ? "16px" : "18px",
                      fontStyle: "normal",
                      "&:hover": { color: "green" },
                      mb: 0.5,
                    }}
                  >
                    {link.name}
                  </Typography>
                ))}
              </Grid>
            ))
          )}

          {/* Legal Links Section */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "green",
                fontSize: isSmallScreen ? "18px" : "20px",
                mb: 1,
              }}
            >
              Legal
            </Typography>
            <Typography
              onClick={() => router.push("/terms")}
              sx={{
                cursor: "pointer",
                display: "block",
                color: "white",
                textDecoration: "none",
                fontSize: isSmallScreen ? "16px" : "18px",
                "&:hover": { color: "green" },
                mb: 0.5,
              }}
            >
              Terms & Conditions
            </Typography>
            <Typography
              onClick={() => router.push("/privacy")}
              sx={{
                cursor: "pointer",
                display: "block",
                color: "white",
                textDecoration: "none",
                fontSize: isSmallScreen ? "16px" : "18px",
                "&:hover": { color: "green" },
                mb: 0.5,
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              onClick={() => router.push("/refund")}
              sx={{
                cursor: "pointer",
                display: "block",
                color: "white",
                textDecoration: "none",
                fontSize: isSmallScreen ? "16px" : "18px",
                "&:hover": { color: "green" },
                mb: 0.5,
              }}
            >
              Refund Policy
            </Typography>
            <Typography
              onClick={() => router.push("/about")}
              sx={{
                cursor: "pointer",
                display: "block",
                color: "white",
                textDecoration: "none",
                fontSize: isSmallScreen ? "16px" : "18px",
                "&:hover": { color: "green" },
                mb: 0.5,
              }}
            >
              About Us
            </Typography>
            <Typography
              onClick={() => router.push("/contact")}
              sx={{
                cursor: "pointer",
                display: "block",
                color: "white",
                textDecoration: "none",
                fontSize: isSmallScreen ? "16px" : "18px",
                "&:hover": { color: "green" },
                mb: 0.5,
              }}
            >
              Contact Us
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid #444",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            © {new Date().getFullYear()} Tutorials Material. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
