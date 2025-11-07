// import Image from "next/image";
"use client";
import { Typography,Box,Grid } from "@mui/material";
import Profile from "@/components/admin/image/ImageComponent";

import Sidebar from "@/components/sidebar/SideBar";
import AdminSidebar from "@/components/dashboard/admin/Admin";
import { useState, useEffect } from 'react';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
const stats = [
    { title: 'User', count: 120 },
    { title: 'Active Listings', count: 80 },
    { title: 'Pending Listings', count: 20 },
    { title: 'Total Reviews', count: 250 },
    { title: 'Total Listings', count: 120 },
    { title: 'Active Listings', count: 80 },
    { title: 'Pending Listings', count: 20 },
    { title: 'Total Reviews', count: 250 },
    { title: 'Total Listings', count: 120 },
    { title: 'Active Listings', count: 80 },
    { title: 'Pending Listings', count: 20 },
    { title: 'Total Reviews', count: 250 },
    { title: 'Total Listings', count: 120 },
    { title: 'Active Listings', count: 80 },
    { title: 'Pending Listings', count: 20 },
    { title: 'Total Reviews', count: 250 },
    { title: 'Total Listings', count: 120 },
    { title: 'Active Listings', count: 80 },
    { title: 'Pending Listings', count: 20 },
    { title: 'Total Reviews', count: 250 },
        { title: 'Total Listings', count: 120 },
    { title: 'Active Listings', count: 80 },
    { title: 'Pending Listings', count: 20 },
    { title: 'Total Reviews', count: 250 },

];
export default function Home() {
      const [colors, setColors] = useState([]);

    useEffect(() => {
        setColors(stats.map(() => getRandomColor()));
    }, []);
  return (
    <>
      <Profile />
      <div style={{ textAlign: "center", margin: "30px" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: "2.5rem",
            letterSpacing: "1px",
            lineHeight: "1.4",
            textTransform: "uppercase",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)", // Subtle text shadow for modern feel
            backgroundImage: "linear-gradient(45deg, #FF6F61, #FF8C00)", // Gradient effect
            backgroundClip: "text", // Make gradient fill text
            color: "transparent",
            display: "inline-block",
          }}
        >
          Admin Dashboard
        </Typography>
        <Box sx={{ flexGrow: 2, padding: 2,px:10 ,display: "inline-block", }}>
            <Grid container spacing={2}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box
                            sx={{
                                backgroundColor: colors[index],
                                boxShadow: 3,
                                borderRadius: 1,
                                padding: 6,
                                textAlign: 'center',
                            }}
                        >

                            <Typography variant="h6" component="div">
                                {stat.count}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {stat.title}
                            </Typography>

                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
      </div>


      <Sidebar />
      {/* <AdminSidebar/> */}
    </>
  );
}
