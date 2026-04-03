import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'
import { BrowserRouter, BrowserRouter as Router, Route, Routes, useNavigate, Navigate, } from "react-router-dom";
import DialogBox from './assets/DialogBox';
import Loader from './assets/Loader';
import SnackBarComponent from './assets/SnackBarComponent';
import MainLayout from './components/layout/MainLayout';
import Login from './components/LoginComponent/LoginComponent';
import { RootState } from './redux/app/store';
import { setopenlogin } from './redux/features/loginSlice/loginSlice';
import { routes } from './routes';
import appRoutes from './routes/appRoutes';
import ChakraLayout from './components/layout/ChakraLayout';
import SignIn from './components/LoginComponent/SignIn';
// import { appRoutes } from './routestes/routes';
export const theme = createTheme({
  typography: {
    // subtitle1: {
    //   fontSize: 12,#233044
    // },
    h3: {
      fontFamily: "DM Sans",
    },
    body1: {
      fontWeight: 500,
      fontFamily: "DM Sans",
    },
    button: {
      fontFamily: "DM Sans",
      backgroundColor: '#F37021',
      color: 'white',
      border: 'none',
      '&:hover': {
        backgroundColor: '#233044'
      }
    }
  }
});
function App() {
  const [count, setCount] = useState(0)
  const [open,setOpen] = useState(false)
  const login = useSelector((state: RootState) => state.login)
  const loader = useSelector((state: RootState) => state.loader)
  const [role,setRole] = useState('')
  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     // dispatch(setopenlogin(true))
  //     navigate('/login')
  //   }else{
  //     setRole(JSON.parse(localStorage.getItem('user')??'').role ?? '')
  //   }
  // }, [])
  const notAccess = ['clients']
  const filterRoutes = localStorage.getItem('user') ? appRoutes.filter((route:any)=> JSON.parse(localStorage.getItem('user')??'').role ==='Admin' ? route : notAccess.includes(route.state) ? null : route) : appRoutes
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />}/>
        {/* <Route path="/" element={<Navigate from='/' to='/dashboard' />}/> */}
        <Route path="/" element={<ChakraLayout/> }>
          {routes(filterRoutes,'User')}
        </Route>
      </Routes>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogBox />
      <SnackBarComponent/>
      {/* <ChakraLayout/> <ChakraLayout/>*/}
      {/* {login.openLogin && <Login />} */}
      {/* <MainLayout /> */}
      {loader.open && <Loader/>}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
