import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';
// import Properties from '../../components/Properties/Properties';
import Legal from '../../components/Legal/Legal';
// import Properties from '../../components/Properties/Properties';


function LegalPage() {
  return (
    <ThemeProvider theme={theme}>
        <Legal/>
    </ThemeProvider>
  )
}

export default LegalPage