import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

interface BorderedBoxProps extends BoxProps {
  // borderBottom?: boolean
  showBorder?: boolean;
}

export default function BorderedBox({
  children,
  showBorder = true,
  ...props
}: BorderedBoxProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: !showBorder ? "none" : "1px solid rgba(0,0,0,0.1)",
        ...props,
      }}
    >
      {children}
    </Box>
  );
}
