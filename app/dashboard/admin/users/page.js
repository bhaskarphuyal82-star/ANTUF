"use client";

import Sidebar from "@/components/sidebar/SideBar";
import UserManagement from "@/components/admin/users/UserManagement";

const UserManagementPage = () => {
  return (
    <>
      <Sidebar />
      <UserManagement />
    </>
  );
};

export default UserManagementPage;
