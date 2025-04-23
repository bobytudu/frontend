import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { DRAWER_WIDTH } from 'constants/layout';

interface ResponsiveDrawerProps {
  isMobile: boolean;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  children: React.ReactNode;
}

export default function ResponsiveDrawer({
  isMobile,
  mobileOpen,
  handleDrawerToggle,
  children
}: ResponsiveDrawerProps) {
  return (
    <Box
      component="nav"
      sx={{ 
        width: { md: DRAWER_WIDTH }, 
        flexShrink: { md: 0 },
        '& .MuiDrawer-paper': {
          position: 'relative',
          height: 'calc(100vh - 64px)',
          overflowX: 'hidden',
          '@media (max-width: 600px)': {
            height: 'calc(100vh - 56px)',
          }
        }
      }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              mt: '64px',
              height: 'calc(100% - 64px)',
              overflowX: 'hidden',
              '@media (max-width: 600px)': {
                height: 'calc(100% - 56px)',
                mt: '56px',
              }
            },
          }}
        >
          {children}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              position: 'relative',
              border: 'none',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {children}
        </Drawer>
      )}
    </Box>
  );
}