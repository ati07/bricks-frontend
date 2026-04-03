import React, { useEffect } from 'react'
import Client from '../../components/client/Client'
import { useDispatch } from 'react-redux';
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import ClientApi from '../../components/client/ClientApi';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';
import Inventory from '../../components/Inventory/Inventory';

function InventoryPage() {
  return (
    <ThemeProvider theme={theme}>
        <Inventory/>
    
    </ThemeProvider>
  )
}

export default InventoryPage