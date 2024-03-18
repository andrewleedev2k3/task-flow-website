import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
declare module '@mui/material/styles' {
  interface Theme {
    app: {
      appBarHeight: string
      boardBarHeight: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    app?: {
      appBarHeight?: string
      boardBarHeight?: string
    }
  }
}

const theme = extendTheme({
  app: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#000'
        }
      }
    }
  }
})

export default theme
