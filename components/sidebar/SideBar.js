import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import YouTubeIcon from '@mui/icons-material/YouTube';
import HelpIcon from "@mui/icons-material/Help";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation"; // Import useRouter
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import CategoryIcon from "@mui/icons-material/Category";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoneyIcon from "@mui/icons-material/Money";
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Link from '@mui/material/Link'; // Import Link component



import {
  drawerStyles,
  listItemStyles,
  listItemIconStyles,
  logoutIconStyles,
  appBarStyles,
  drawerMobileStyles,
  mainContentStyles,
} from "./sidebarStyles";

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin",
    },
    {
      text: "Chat",
      icon: <ChatIcon sx={{ fontSize: "32px" }} />,
       link: "/dashboard/admin/create/chat",
    },
   
    // {
    //   text: "Create Content & Courses",
    //   icon: <ChatIcon sx={{ fontSize: "32px" }} />,
    //   link: "/dashboard/admin/content/create",
    // },
     {
      text: "Articles",
      icon: <PostAddSharpIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/post",
    },
     {
      text: "Slider",
      icon: <BarChartIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/slider/list",
    },
    {
      text: "Video",
      icon: <YouTubeIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/video",
    },
    {
      text: "Card Order",
      icon: <BuildIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/orders",
    },
    {
      text: "Home",
      icon: <LiveHelpIcon sx={{ fontSize: "32px" }} />,
      link: "/",
    },
    {
      text: "Create Category",
      icon: <CategoryIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/category",
    },
    {
      text: "Create SubCategory",
      icon: <AcUnitIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/subcategory",
    },
    {
      text: "Create Category With SubCategory",
      icon: <AlignVerticalCenterIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/create/catewithsubcate",
    },
    
    {
      text: "All User",
      icon: <ManageAccountsIcon sx={{ fontSize: "32px" }} />,
      link: "/dashboard/admin/member",
    },
    {
      text: "Event",
      icon: <MoneyIcon sx={{ fontSize: "32px" }} />,
        link: "/dashboard/admin/events",
    },
  ];

  return (
    <Box sx={{ display: "flex " }}>
      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          sx={drawerStyles(isHovered)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  marginBottom: "10px",
                  padding: isHovered ? "10px 20px" : "10px 0",
                  cursor: "pointer",
                  ":hover": {
                    borderLeft: "19px solid blueviolet !important",
                  },
                  transition: "border-bottom 0.3s ease",
                }}
                onClick={() => router.push(item.link)} // Navigate using router.push
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: isHovered ? "50px" : "40px",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isHovered && (
                  <ListItemText
                    primary={item.text}
                    sx={{ marginLeft: "10px", fontSize: "18px" }}
                  />
                )}
              </ListItem>
            ))}
            {/* <SimpleTreeView>
        <TreeItem itemId="grid" label="Data Grid">
          <TreeItem itemId="grid-community" label= <Link href="/dashboard/admin/create/post"  rel="noopener">
                Articles
              </Link>
           />
          <TreeItem itemId="grid-pro"   label={
              <Link href="/dashboard/admin/create/content"  rel="noopener">
                Tutorial
              </Link>
            }/>
          <TreeItem itemId="grid-pr"   label={
              <Link href="/dashboard/admin/create/course"  rel="noopener">
              Courses
              </Link>
            }/>
        </TreeItem>
        <TreeItem itemId="pickers" label="Date and Time Pickers">
          <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
          <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
        </TreeItem>
        <TreeItem itemId="charts" label="Charts">
          <TreeItem itemId="charts-community" label="@mui/x-charts" />
        </TreeItem>
        <TreeItem itemId="tree-view" label="Tree View">
          <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
        </TreeItem>
      </SimpleTreeView> */}

            {/* Logout Item */}
            <ListItem
              sx={{
                marginBottom: "10px",
                padding: isHovered ? "10px 20px" : "10px 0",
                cursor: "pointer",
                ":hover": {
                  borderLeft: "19px solid blueviolet !important",
                },
                transition: "border-bottom 0.3s ease",
              }}
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: isHovered ? "50px" : "40px",
                  justifyContent: "center",
                  marginLeft: "20px",
                }}
              >
                <ExitToAppIcon sx={{ fontSize: "32px", color: "blueviolet" }} />
              </ListItemIcon>
              {isHovered && (
                <ListItemText
                  primary="Logout"
                  sx={{ marginLeft: "10px", fontSize: "18px" }}
                />
              )}
            </ListItem>
          </List>
        </Drawer>
      )}

      {isSmallScreen && (
        <AppBar position="fixed" sx={{ backgroundColor: "#1a1a1a" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon sx={{ fontSize: "32px" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: isSmallScreen ? "block" : "none",
          "& .MuiDrawer-paper": {
            width: 300,
            backgroundColor: "#1a1a1a",
            color: "white",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                router.push(item.link); // Navigate using router.push
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: "100px", xs: "0" },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
   
  );
};

export default Sidebar;
