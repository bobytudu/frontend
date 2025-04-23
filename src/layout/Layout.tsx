import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "layout/Topbar";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
      <Box sx={{ 
        flexGrow: 1, 
        mt: '64px', // height of Topbar (default MUI AppBar height)
        '@media (max-width: 600px)': {
          mt: '56px', // mobile height of Topbar
        }
      }}>
        <Outlet />
      </Box>
    </Box>
  );
}
