import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './redux/app/store'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme.tsx';
import './i18n'
import './index.css'
// const theme = createTheme({
//   typography: {
//     // subtitle1: {
//     //   fontSize: 12,
//     // },
//     h3: {
//       fontFamily: "montserrat medium"
//     },
//     // body1: {
//     //   fontWeight: 500,#233044
//     // },
//     button: {
//       fontFamily: "montserrat medium",
//       backgroundColor: '#F37021',
//       color: 'white',
//       border: 'none',
//       '&:hover': {
//         backgroundColor: '#233044'
//       }
//     },
//   }
// });
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
        {/* <ThemeProvider theme={theme}>
      <CssBaseline /> */}
      <ChakraProvider theme={theme}>
        {/* Hi */}
        <App />
      </ChakraProvider>
        {/* </ThemeProvider> */}
      </Provider>
    </React.StrictMode>,
)
