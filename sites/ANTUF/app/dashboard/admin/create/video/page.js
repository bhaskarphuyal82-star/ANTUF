// app/dashboard/sliders/page.jsx
"use client";
import SliderTable from "@/components/dashboard/admin/video/list/videoTable";

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