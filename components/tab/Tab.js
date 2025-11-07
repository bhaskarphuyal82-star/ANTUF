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
          
          justifyContent:"center",
        

        }}

      >


        <Box
          sx={{
            backgroundColor: 'error.main',
            py: 0.5,
            px: 3,
            display: 'flex',
            height:50,
            alignItems: 'center',
            justifyContent:"center",
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
                      <IconButton
              sx={{
                color: "white",
                display: { xs: "none", md: "flex" },
                padding: "12px",
                '&:hover': {
                  backgroundColor: "rgba(255, 0, 0, 0.2)"
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '2rem' // This makes the icon itself larger
                }
              }}
            >
              <HomeIcon />
            </IconButton>{/* Home icon */}
               <Button
        id="basic-button"
        color='white'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        ABOUT US
      </Button>
        
            <Button className="nav-button" size="small">होम</Button>
            <Button className="nav-button" size="small">गतिविधि</Button>
            <Button className="nav-button" size="small">संगठन</Button>
            <Button className="nav-button" size="small">जनप्रतिनिधि</Button>
            <Button className="nav-button" size="small">इतिहास</Button>
            <Button className="nav-button" size="small">दस्तावेज</Button>
            <Button className="nav-button" size="small">डाउनलोड</Button>
            <Button className="nav-button" size="small">सम्पर्क</Button>
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
            router.push('/about');
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
