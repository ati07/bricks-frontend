import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import RdrAlert from '../../components/rdrAlert/RdrAlert'
import RdrApi from '../../components/rdrAlert/rdrApi'
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function RdrAlertPage() {
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
    <RdrApi>
      <RdrAlert/>
      {/* Hi */}
    </RdrApi>
    </ThemeProvider>
  )
}

export default RdrAlertPage