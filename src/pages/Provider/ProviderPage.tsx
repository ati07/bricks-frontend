import React from 'react'
import Provider from '../../components/Provider/Provider'
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function ProviderPage() {
  return (
    <ThemeProvider theme={theme}>
        {/* <RdrApi> */}
        <Provider/>
    
          {/* Hi */}
        {/* </RdrApi> */}
    </ThemeProvider>
    )
    
}

export default ProviderPage