import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@fontsource/roboto'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '@/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
  </CssVarsProvider>
)
