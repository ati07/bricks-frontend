import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';
import Properties from '../../components/Properties/Properties';
// import Properties from '../../components/Properties/Properties';


function PropertiesPage() {
  return (
    <ThemeProvider theme={theme}>
        <Properties/>
    </ThemeProvider>
  )
}

export default PropertiesPage