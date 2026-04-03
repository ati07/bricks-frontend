import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import EthocaAlert from '../../components/ethocaAlert/EthocaAlert'
import EthocaApi from '../../components/ethocaAlert/ethocaApi'
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function EthocaAlertPage() {
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
    <EthocaApi>
      <EthocaAlert/>
      {/* Hi */}
      </EthocaApi>
      </ThemeProvider>
  )
}

export default EthocaAlertPage