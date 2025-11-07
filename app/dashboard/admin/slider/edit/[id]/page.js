"use client";

import { useEffect, useState } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";
import Sidebar from "@/components/sidebar/SideBar";
import SliderForm from "@/components/dashboard/admin/slider/edit/SliderEditForm";

import { useParams, useRouter } from "next/navigation";
import { fetchSliderById, updateSlider } from "@/slice/sliderSlice";
import { useDispatch, useSelector } from "react-redux";

const EditSliderPage = () => {
  const { id } = useParams();

  const router = useRouter();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [sliderData, setSliderData] = useState(null);

  const { loading: updateLoading } = useSelector((state) => state.sliders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(fetchSliderById(id)).unwrap();

        setSliderData(data);
      } catch (error) {
        console.log("fAILED  TO FETCH  SLIDERS");

        router.push("/dashboard/admin/slider");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, dispatch, router]);

  const handleSubmit = async (values) => {
    try {
      await dispatch(
        updateSlider({
          id,
          sliderData: values,
        })
      ).unwrap();

      router.push("/dashboard/admin/slider/list");
    } catch (error) {
      console.log("Failed to update slider", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!sliderData) {
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">Slider not found</Typography>
      </Box>
    );
  }
  return (
    <Box>
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
        Edit  Slider
        </Typography>
      </div>



      <SliderForm
        initialValues={sliderData}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/slider/list")}
        loading={updateLoading}
      />
      <Sidebar/>
    </Box>
  );
};
export default EditSliderPage;