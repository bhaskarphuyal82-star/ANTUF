// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material";
// import { fetchSubCategories } from "@/slice/subcategorySlice";

// const ScrollableTabs = () => {
//   const router = useRouter();
//   const [value, setValue] = useState(0);
//   const [subcategories, setSubCategories] = useState([]);

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleChange = (event, newValue) => {
//     console.log(newValue);
//     setValue(newValue);

//     const selectedSlug = subcategories[newValue]?.slug;
//     if (selectedSlug) {
//       router.push(`/${selectedSlug.toLowerCase()}`);
//     }
//   };

//   useEffect(() => {
//     fetchSubCategories();
//   }, []);

//   const fetchSubCategories = async () => {
//     try {
//       const response = await fetch(`${process.env.API}/subcategory`);
//       const data = await response.json();
//       console.log("data:-----", data);
//       setSubCategories(data);
//     } catch (error) {
//       console.log("error during fetching", error);
//     }
//   };
//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: "#1c1c1c",
//           color: "#fff",
//           padding: "10px 0",
//         }}
//       >
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant="scrollable"
//           scrollButtons
//           allowScrollButtonsMobile
//           aria-label="scrollable force tabs example"
//           sx={{
//             "& .MuiTabs-indicator": {
//               display: "none",
//             },
//             "& .MuiTabs-scrollButton": {
//               color: "white",
//               "&:hover": {
//                 color: "#00ff00",
//               },
//               "& svg": {
//                 fontSize: "3rem",
//               },
//             },
//           }}
//         >
//           {subcategories.map((tab, index) => (
//             <Tab
//               key={index}
//               label={tab.name}
//               sx={{
//                 textTransform: "none",
//                 fontSize: isSmallScreen ? "14px" : "16px", // Increased font size
//                 fontWeight: 600,
//                 "&.Mui-selected": {
//                   color: "#00ff00 !important", // Force white for the selected tab
//                 },
//                 color: value === index ? "#fff" : "#fff", // Active tab is white, others are gray
//                 "&:hover": {
//                   color: "#00ff00", // Green text on hover
//                 },
//               }}
//             />
//           ))}
//         </Tabs>
//       </Box>
//     </>
//   );
// };
'use client';

import React from 'react';
import { Box, Button, IconButton, Typography, AvatarGroup, Avatar } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1'; // For sickle approximation
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ScrollableTabs = () => {
  const router = useRouter();
  // Placeholder portraits (use actual images in production)
  const portraits = ['/path/to/lenin.jpg', '/path/to/marx.jpg', '/path/to/mao.jpg', '/path/to/stalin.jpg'];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {/* Top Banner Slogan */}


      {/* Main Header */}


      {/* Navigation Menu */}
      <Box
        sx={{

          justifyContent: "center",


        }}

      >


        <Box
          sx={{
            backgroundColor: 'error.main',
            py: 0.5,
            px: 3,
            display: 'flex',
            height: 50,
            alignItems: 'center',
            justifyContent: "center",
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>

            <IconButton
              onClick={() => router.push('/')}
              sx={{
                color: "white",
                display: { xs: "none", md: "flex" },
                padding: "12px",
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: 'scale(1.1)',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '2rem'
                }
              }}
            >
              <HomeIcon />
            </IconButton>

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
                px: { xs: 1.5, md: 2 },
                py: 1,
                borderRadius: 2,
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >


              हाम्रो बारेमा
            </Button>

            <Button
              onClick={() => router.push('/pages')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
                px: { xs: 1.5, md: 2 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              📄 सबै पृष्ठहरू
            </Button>

            <Button
              onClick={() => router.push('/activities')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '13px', sm: '14px', md: '15px' },
                px: { xs: 1.5, md: 2.5 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              गतिविधि
            </Button>

            <Button
              onClick={() => router.push('/organization')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '13px', sm: '14px', md: '15px' },
                px: { xs: 1.5, md: 2.5 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              संगठन
            </Button>

            <Button
              onClick={() => router.push('/representatives')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '13px', sm: '14px', md: '15px' },
                px: { xs: 1.5, md: 2.5 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              जनप्रतिनिधि
            </Button>

            <Button
              onClick={() => router.push('/history')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '13px', sm: '14px', md: '15px' },
                px: { xs: 1.5, md: 2.5 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              इतिहास
            </Button>

            <Button
              onClick={() => router.push('/documents')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '13px', sm: '14px', md: '15px' },
                px: { xs: 1.5, md: 2.5 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              दस्तावेज
            </Button>

            <Button
              onClick={() => router.push('/downloads')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '13px', sm: '14px', md: '15px' },
                px: { xs: 1.5, md: 2.5 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              डाउनलोड
            </Button>

            <Button
              onClick={() => router.push('/contact')}
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '13px', sm: '14px', md: '15px' },
                px: { xs: 1.5, md: 2.5 },
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: 'white',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-2px)',
                  '&::before': {
                    transform: 'translateX(0)',
                  },
                },
              }}
            >
              सम्पर्क
            </Button>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                router.push('/pages/about');
              }}
              sx={{
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                }
              }}
            >
              INTRODUCTION
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                }
              }}
            >
              HISTORY
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                }
              }}
            >
              ORGANIZATION
            </MenuItem>
          </Menu>

        </Box>
      </Box>
    </>
  );
};



export default ScrollableTabs;
