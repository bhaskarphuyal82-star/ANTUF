// app/dashboard/sliders/page.jsx
"use client";
import SliderTable from "@/components/dashboard/admin/slider/list/SliderTable";

import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { fetchSliders } from "@/slice/sliderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
 import Sidebar from "@/components/sidebar/SideBar";   
    

const SlidersPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sliders, loading, error } = useSelector((state) => state.sliders);

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  if (error) {
    console.error('Error loading sliders:', error);
  }

 

  const handleEdit = (id) => {
    router.push(`/dashboard/admin/slider/edit/${id}`);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          
          gap: 2,
          width: "100%",
        }}
      >
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
       
            mt:5
          }}
        >
          Sliders Management
        </Typography>
        <Box sx={{ width: "90%", display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "darkred"
              }
            }}
            onClick={() => router.push("/dashboard/admin/slider/create")}
          >
            Add New Slider
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          Loading...
        </Box>
      ) : (
        <SliderTable
          sliders={sliders}
          onEdit={handleEdit}
        />
      )}
      <Sidebar />
    </Box>
  );
};

export default SlidersPage;