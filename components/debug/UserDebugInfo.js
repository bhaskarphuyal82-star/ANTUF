"use client";

import { useSession } from "next-auth/react";
import { Box, Typography, Paper } from "@mui/material";

const UserDebugInfo = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (!session) {
    return <Typography>Not authenticated</Typography>;
  }

  return (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h6">Debug Info:</Typography>
      <Typography>Email: {session.user?.email}</Typography>
      <Typography>Role: {session.user?.role}</Typography>
      <Typography>Name: {session.user?.name}</Typography>
      <Typography>Status: {status}</Typography>
      <Typography>Is Admin: {session.user?.role === "admin" ? "Yes" : "No"}</Typography>
    </Paper>
  );
};

export default UserDebugInfo;
