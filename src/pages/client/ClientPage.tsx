import React, { useEffect } from 'react'
import Client from '../../components/client/Client'
import { useDispatch } from 'react-redux';
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import ClientApi from '../../components/client/ClientApi';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function ClientPage() {
    const dispatch = useDispatch()
  console.log("object");
  dispatch(setglobaltempData({}))
  // const navigate = useNavigate()
  // useEffect(()=>{
  //   if (!localStorage.getItem('user')) {
  //     // dispatch(setopenlogin(true))
  //     navigate('/login')
  //   }
  // },[])
  return (
    <ThemeProvider theme={theme}>
    {/* <ClientApi> */}
        <Client/>
        {/* Hi */}
    {/* </ClientApi> */}
    </ThemeProvider>
  )
}

export default ClientPage