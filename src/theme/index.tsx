import PropTypes from 'prop-types'
import { useMemo } from 'react'
// @mui
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
//
import palette, { PaletteType } from './palette'
import shadows from './shadows'
import typography from './typography'
import GlobalStyles from './globalStyles'
import customShadows from './customShadows'
import componentsOverride, { ComponentsOverridesProps } from './overrides'

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node
}

interface ThemeOptionTypes {
  palette: PaletteType
  shape: { borderRadius: number }
  typography: any
  shadows: any
  customShadows: any
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeOptions: ThemeOptionTypes = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows()
    }),
    []
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme as ComponentsOverridesProps)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
