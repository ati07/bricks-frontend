import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import { useNavigate } from 'react-router-dom';
import MerchantApi from '../../components/merchant/MerchantApi';
import Merchant from '../../components/merchant/Merchant';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function MerchantPage() {
  const dispatch = useDispatch()
  console.log("Mobject");
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
    <MerchantApi>
      <Merchant/>
      {/* Hi */}
    </MerchantApi>
    </ThemeProvider>
  )
}

export default MerchantPage