import { alpha } from '@mui/material/styles'
import { ComponentsOverridesProps } from '.'

// ----------------------------------------------------------------------

export default function Button(theme: ComponentsOverridesProps) {
  return {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#C52E33",
          color: "#fff",
          '&:hover': {
            backgroundColor: "#C52E33",
          },
        },
      },
      defaultProps: {
        variant: 'contained',
        color: "primary"
      }
    }
  }
}
