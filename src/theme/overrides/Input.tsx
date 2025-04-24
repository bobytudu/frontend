import { alpha } from '@mui/material/styles'
import { ComponentsOverridesProps } from '.'

// ----------------------------------------------------------------------

export default function Input(theme: ComponentsOverridesProps) {
  return {
    MuiTextField: {
      defaultProps: {
        size: 'small'
      },
    },
  };
}
