"use client";

import { Box } from "@mui/material";
import Sidebar from "@/components/user/sidebar/Sidebar";
import Profile from "@/components/user/profile/Profile";
import UserInfoPrintCard from "@/components/user/profile/UserInfoPrintCard";
import UserCardOrderWidget from "@/components/user/profile/UserCardOrderWidget";
import UserOrderTracking from "@/components/user/profile/UserOrderTracking";

const ProfileCreate = () => {
  return (
    <>
    
      <Profile />
     
     
      <Sidebar />
    </>
  );
};

export default ProfileCreate;