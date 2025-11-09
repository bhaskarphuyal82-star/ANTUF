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
import CardContent from '@mui/material/CardContent';
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
          backgroundColor: "#212121",
        }}
      >
        <Grid container spacing={isSmallScreen ? 3 : 4}>
          <Grid item xs={12} sm={4}>
            <Typography variant={isSmallScreen ? "body1" : "h6"} fontWeight="bold" sx={{ color: "green" }}>
              Short Description of ANTUF
            </Typography>

            <Typography sx={{ mt: 2, fontSize: isSmallScreen ? "14px" : "16px" }}>
              All Nepal Federation of Trade Unions(ANTUF)</Typography>
            <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}> is the largest trade union in Nepal with more</Typography>
            <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>than 4, 15,000 members. This umbrella for industry-wise</Typography>
            <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>  national trade union federations was established in 2007</Typography>
            <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}> with the motto of promoting and protecting the rights of</Typography>
            <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}> workers within and beyond the nation.</Typography>


            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                gap: 2,
                justifyContent: "start",
                alignItems: isSmallScreen ? "flex-start" : "center",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ maxWidth: isSmallScreen ? "120px" : "150px", height: "auto" }}
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                style={{ maxWidth: isSmallScreen ? "120px" : "150px", height: "auto" }}
              />
            </Box>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "white", padding: isSmallScreen ? "8px" : "12px" }}>
                <Facebook fontSize={isSmallScreen ? "small" : "medium"} />
              </IconButton>
              <IconButton sx={{ color: "white", padding: isSmallScreen ? "8px" : "12px" }}>
                <Instagram fontSize={isSmallScreen ? "small" : "medium"} />
              </IconButton>
              <IconButton sx={{ color: "white", padding: isSmallScreen ? "8px" : "12px" }}>
                <LinkedIn fontSize={isSmallScreen ? "small" : "medium"} />
              </IconButton>
              <IconButton sx={{ color: "white", padding: isSmallScreen ? "8px" : "12px" }}>
                <YouTubeIcon fontSize={isSmallScreen ? "small" : "medium"} />
              </IconButton>
            </Box>
          </Grid>

          {loading ? (
            <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress sx={{ color: "green" }} />
            </Grid>
          ) : (
            formatteddata.map((section, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    display: "block",
                    color: "green",
                    textDecoration: "none",
                    fontSize: isSmallScreen ? "16px" : "18px",
                    fontStyle: "normal",
                    letterSpacing: "0.5px",
                    lineHeight: "1.6",
                    wordSpacing: "1px",
                    cursor: "pointer",
                    "&:hover": { color: "#7CFC00" },
                    mb: 1,
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
                      fontSize: isSmallScreen ? "14px" : "16px",
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
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "green",
                fontSize: isSmallScreen ? "16px" : "18px",
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
                fontSize: isSmallScreen ? "14px" : "16px",
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
                fontSize: isSmallScreen ? "14px" : "16px",
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
                fontSize: isSmallScreen ? "14px" : "16px",
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
                fontSize: isSmallScreen ? "14px" : "16px",
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
                fontSize: isSmallScreen ? "14px" : "16px",
                "&:hover": { color: "green" },
                mb: 0.5,
              }}
            >
              Contact Us
            </Typography>
          </Grid>
        </Grid>

        {/* Google Maps Location Section */}
        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #444" }}>
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "green",
              textAlign: "center",
              mb: 3,
            }}
          >
            Our Location / हाम्रो स्थान
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: isSmallScreen ? "100%" : "800px",
                height: isSmallScreen ? "300px" : "450px",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d56525.06391095446!2d85.334246!3d27.692066!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f2dc69b5b5%3A0x458dbd5c96ec655e!2sALL%20NEPAL%20FEDERATION%20OF%20TRADE%20UNIONS!5e0!3m2!1sen!2sus!4v1762664560747!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ANTUF Location Map"
              />
            </Box>
          </Box>
        </Box>

        {/* Copyright Section */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid #444",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#ccc", fontSize: isSmallScreen ? "12px" : "14px" }}>
            © {new Date().getFullYear()} All Nepal Federation of Trade Unions(ANTUF). All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
