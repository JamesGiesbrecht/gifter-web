import { createTheme, Theme } from '@mui/material/styles'
import { red, pink, teal } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

// Edit this function for global theme overrides
const getTheme = (colorScheme: PaletteMode): Theme => {
  const defaultTheme = createTheme({ palette: { mode: colorScheme } })
  return createTheme({
    mixins: {
      header: {
        height: 50,
      },
      drawer: {
        width: 250,
        hidden: { mdDown: true },
        hiddenBreakpoint: defaultTheme.breakpoints.down('md'),
        visibleBreakpoint: defaultTheme.breakpoints.up('md'),
      },
    },
    palette: {
      mode: colorScheme,
      primary: teal,
      secondary: pink,
      error: red,
    },
  })
}

export default getTheme
