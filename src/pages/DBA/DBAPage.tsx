import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
// import MerchantApi from '../../components/dba/DBAApi'
// import Merchants from '../../components/dba/DBA'
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import { useNavigate } from 'react-router-dom';
import DBA from '../../components/DBA/DBA';
import DBAApi from '../../components/DBA/DBAApi';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function DBAPage() {
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
    <DBAApi>
      <DBA/>
      {/* Hi */}
    </DBAApi>
    </ThemeProvider>
  )
}

export default DBAPage