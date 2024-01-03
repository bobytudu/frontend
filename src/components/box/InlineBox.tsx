import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

export default function InlineBox({ children, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...props,
      }}
    >
      {children}
    </Box>
  );
}
