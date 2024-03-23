import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import theme from '@/theme.ts'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        dialogProps: { maxWidth: 'xs' },
        confirmationButtonProps: {
          color: 'info',
          variant: 'outlined'
        },
        cancellationButtonProps: {
          color: 'inherit'
        }
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
        limit={5}
        theme="colored"
      />
    </ConfirmProvider>
  </CssVarsProvider>
)
