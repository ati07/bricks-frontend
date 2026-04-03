import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Chargebacks from '../../components/chargebacks/Chargebacks'
import ChargebacksApi from '../../components/chargebacks/chargebacksApi'
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import { useNavigate } from 'react-router-dom';
import NewChargebacks from '../../components/chargebacks/NewChargebacks';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function ChargebacksPage() {
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
        <ChargebacksApi>
          {/* <NewChargebacks/> */}
          <Chargebacks/>
          {/* Hi */}
          </ChargebacksApi>
    </ThemeProvider>
  )
}

export default ChargebacksPage