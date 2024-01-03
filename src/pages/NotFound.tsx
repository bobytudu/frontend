import { Typography } from '@mui/material'
import Page from 'components/Page'
import React from 'react'
import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <Page title="Not Found" description="Not Found">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <pre
          style={{
            padding: 8,
            background: "rgba(0,0,0,0.2)",
            borderRadius: 8,
            border: "2px solid rgba(0,0,0,0.5)",
          }}
        >
          {location.pathname}
        </pre>
        <Typography variant="h3">
          Sorry!! The page you're trying to access is not available
        </Typography>
      </div>
    </Page>
  );
}
