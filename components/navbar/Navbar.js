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
import { useRouter } from "next/navigation";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import TranslateIcon from "@mui/icons-material/Translate";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
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
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
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
              width: 250,
              backgroundColor: "#1A1A1A",
              height: "100%",
              color: "red",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
           

            <List>
              {menuItems.map((item, index) => (
                <div key={index}>
                  <ListItem 
                    sx={{ 
                      textAlign: "left",
                      cursor: "pointer",
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                    onClick={() => router.push(item.path)}
                  >
                    <Box>
                      <Typography sx={{ p: 1, fontWeight: 600, color: 'white' }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ px: 1, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                        {item.titleEn}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#a3a3c2",
                    }}
                  />
                </div>
              ))}
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
