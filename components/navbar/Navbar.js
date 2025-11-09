"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import TapNav from "@/components/navbar/topnav/topnav"
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useRouter } from "next/navigation";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import TranslateIcon from "@mui/icons-material/Translate";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import Page from "@/components/loginmodal/Page";
import { useSession } from "next-auth/react";
import Tabs from "@/components/tab/Tab";
const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const menuItems = [
    { title: "हाम्रो बारेमा", titleEn: "About Us", path: "/pages/about" },
    { title: "सम्बद्ध संगठन", titleEn: "Affiliates", path: "/pages/affiliates" },
    { title: "जनप्रतिनिधि", titleEn: "Representatives", path: "/pages/representatives" },
    { title: "कार्यक्रम", titleEn: "Events", path: "/events" },
    { title: "सम्पर्क", titleEn: "Contact", path: "/pages/contact" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <TapNav />
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "#fff",
          height: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 4, md: 6 }, // Add horizontal padding that increases with screen size
            gap: 2 // Add gap between elements
          }}
        >
          {/* Left Side (Menu Items for larger screens) */}
          <Box
            sx={{
              // display: { xs: "none", md: "flex" },
              flex: 1,
              alignItems: "center",
              gap: 3
            }}
          >

            <Box

              display="flex"
              alignItems="center"


              sx={{
                position: 'relative',
                cursor: "pointer",
                display: { xs: "none", md: "flex" },
                "&:hover": {
                  "& .menu-text": {
                    color: "rgba(255, 255, 255, 0.85)"
                  },
                  "& .arrowIcon": {
                    transform: "rotate(180deg)",
                    color: "rgba(255, 255, 255, 0.85)"
                  }
                }
              }}
            >
              <img
                onClick={() => router.push("/")}
                src="/antuf-final-logo-5.png"
                alt="Logo"
                style={{
                  height: "100px",
                  maxWidth: "100%",
                  width: "auto",
                  cursor: "pointer",
                  objectFit: "contain",

                }}
              />


            </Box>
            <Box
              sx={{
                position: 'relative',
                cursor: "pointer",
                display: { xs: "flex", md: "none" },
              }}

            >
              <img
                onClick={() => router.push("/")}
                src="/mobile.jpg"
                alt="Logo"
                style={{
                  height: "90px",
                  maxWidth: "90%",
                  width: "auto",
                  cursor: "pointer",
                  objectFit: "contain",

                }}
              />
            </Box>

          </Box>

          {/* {centered logo} */}


          {/* {display right side menu item on larger device} */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
              ml: 10
            }}
          >
            <IconButton
              sx={{
                color: "#00796B",
                display: { xs: "none", md: "flex" },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "00796B",
                display: { xs: "none", md: "flex" },
                '&:hover': {
                  backgroundColor: 'rgba(231, 9, 9, 0.1)'
                }
              }}
            >
              <NotificationsActiveIcon />
            </IconButton>
            <IconButton
              sx={{
                color: "00796B",
                display: { xs: "none", md: "flex" },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <TranslateIcon />
            </IconButton>
            <Box
              sx={{
                display: { xs: "flex", sm: "flex", md: "flex" },
                width: "100%",
                justifyContent: { xs: "flex-start", sm: "space-between", md: "flex-start" },
                alignItems: "center",
                gap: { xs: 2, sm: 4 }
              }}
            >

              {status === "authenticated" ? (
                session?.user?.image && (
                  <img
                    src={session?.user?.image || "https://res.cloudinary.com/dfu758f7t/image/upload/v1761664833/logo_mklloi.jpg"} // Fallback for default avatar
                    alt="User Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      cursor: "pointer",

                    }}
                    onClick={() =>
                      router.push(
                        session?.user?.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard/user"
                      )
                    }
                  />
                )
              ) : (
                <Page />
              )}

              {/* Hamburger Icon for Small Devices */}
              <Box
                sx={{
                  justifyContent: "end"
                }}
              >
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{
                    display: {
                      xs: "block", md: "none",
                      color: "black",
                      padding: 3,
                      alignItems: "center"


                    }
                  }}
                  onClick={toggleDrawer(true)}
                >

                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>


        {/* drawer for small device */}

        <Drawer open={drawerOpen} onClose={toggleDrawer(false)} anchor="left">
          <Box
            sx={{
              width: 280,
              backgroundColor: "#9B2C2C",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            role="presentation"
          >
            {/* Header with Logo and Close Button */}
            <Box
              sx={{
                backgroundColor: "#F5F5F5",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "2px solid #9B2C2C",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#9B2C2C",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }}>🚩</Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "#DC143C", fontWeight: 700, fontSize: "0.9rem" }}>
                    अखिल नेपाल ट्रेड युनियन महासंघ
                  </Typography>
                  <Typography sx={{ color: "#DC143C", fontSize: "0.75rem" }}>
                    (ANTUF)
                  </Typography>
                </Box>
              </Box>
              <IconButton 
                onClick={toggleDrawer(false)}
                sx={{ color: "#DC143C" }}
              >
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>✕</Typography>
              </IconButton>
            </Box>

            {/* Social Icons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                py: 3,
                borderBottom: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <IconButton sx={{ 
                bgcolor: "rgba(0,0,0,0.3)", 
                color: "white",
                '&:hover': { bgcolor: "rgba(0,0,0,0.5)" }
              }}>
                <Typography sx={{ fontSize: "1.2rem" }}>f</Typography>
              </IconButton>
              <IconButton sx={{ 
                bgcolor: "rgba(0,0,0,0.3)", 
                color: "white",
                '&:hover': { bgcolor: "rgba(0,0,0,0.5)" }
              }}>
                <Typography sx={{ fontSize: "1.2rem" }}>📷</Typography>
              </IconButton>
              <IconButton sx={{ 
                bgcolor: "rgba(0,0,0,0.3)", 
                color: "white",
                '&:hover': { bgcolor: "rgba(0,0,0,0.5)" }
              }}>
                <Typography sx={{ fontSize: "1.2rem" }}>▶</Typography>
              </IconButton>
            </Box>

            {/* Menu Items */}
            <List sx={{ flex: 1, overflowY: "auto", py: 0 }}>
              {/* गृहपृष्ठ / Home */}
              <ListItem 
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/");
                  toggleDrawer(false)(e);
                }}
                sx={{ 
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem" }}>
                  गृहपृष्ठ
                </Typography>
              </ListItem>

              {/* हाम्रो बारेमा / About */}
              <ListItem 
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/pages/about");
                  toggleDrawer(false)(e);
                }}
                sx={{ 
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem" }}>
                  हाम्रो बारेमा
                </Typography>
              </ListItem>

              {/* गतिविधि / Activities */}
              <Box>
                <ListItem 
                  component="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(0);
                  }}
                  sx={{ 
                    py: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem", flex: 1 }}>
                    गतिविधि
                  </Typography>
                  <KeyboardArrowDownIcon 
                    sx={{ 
                      color: 'white',
                      transform: expandedItems[0] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }} 
                  />
                </ListItem>
                {expandedItems[0] && (
                  <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <ListItem 
                      component="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/pages/activities");
                        toggleDrawer(false)(e);
                      }}
                      sx={{ pl: 4, py: 1.5, cursor: 'pointer' }}
                    >
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: "0.95rem" }}>
                        सबै गतिविधि
                      </Typography>
                    </ListItem>
                    <ListItem 
                      component="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/events");
                        toggleDrawer(false)(e);
                      }}
                      sx={{ pl: 4, py: 1.5, cursor: 'pointer' }}
                    >
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: "0.95rem" }}>
                        कार्यक्रम
                      </Typography>
                    </ListItem>
                  </Box>
                )}
              </Box>

              {/* संगठन / Organization */}
              <Box>
                <ListItem 
                  component="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(1);
                  }}
                  sx={{ 
                    py: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem", flex: 1 }}>
                    संगठन
                  </Typography>
                  <KeyboardArrowDownIcon 
                    sx={{ 
                      color: 'white',
                      transform: expandedItems[1] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }} 
                  />
                </ListItem>
                {expandedItems[1] && (
                  <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <ListItem 
                      component="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/pages/organization");
                        toggleDrawer(false)(e);
                      }}
                      sx={{ pl: 4, py: 1.5, cursor: 'pointer' }}
                    >
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: "0.95rem" }}>
                        संगठन संरचना
                      </Typography>
                    </ListItem>
                    <ListItem 
                      component="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/pages/affiliates");
                        toggleDrawer(false)(e);
                      }}
                      sx={{ pl: 4, py: 1.5, cursor: 'pointer' }}
                    >
                      <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: "0.95rem" }}>
                        सम्बद्ध संगठन
                      </Typography>
                    </ListItem>
                  </Box>
                )}
              </Box>

              {/* जनप्रतिनिधि / Representatives */}
              <ListItem 
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/pages/representatives");
                  toggleDrawer(false)(e);
                }}
                sx={{ 
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem" }}>
                  जनप्रतिनिधि
                </Typography>
              </ListItem>

              {/* इतिहास / History */}
              <ListItem 
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/pages/history");
                  toggleDrawer(false)(e);
                }}
                sx={{ 
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem" }}>
                  इतिहास
                </Typography>
              </ListItem>

              {/* दस्तावेज / Documents */}
              <ListItem 
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/pages/documents");
                  toggleDrawer(false)(e);
                }}
                sx={{ 
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem" }}>
                  दस्तावेज
                </Typography>
              </ListItem>

              {/* डाउनलोड / Downloads */}
              <ListItem 
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/downloads");
                  toggleDrawer(false)(e);
                }}
                sx={{ 
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem" }}>
                  डाउनलोड
                </Typography>
              </ListItem>

              {/* सम्पर्क / Contact */}
              <ListItem 
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/pages/contact");
                  toggleDrawer(false)(e);
                }}
                sx={{ 
                  py: 2,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: "1.1rem" }}>
                  सम्पर्क
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Drawer>

      </AppBar>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Tabs />
      </Box>
    </>
  );
};

export default Navbar;
