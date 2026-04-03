import { ThemeProvider } from '@mui/material'
import React from 'react'
import { theme } from '../../App';
import WorkProgress from '../../components/WorkProgress/WorkProgress'

function WorkProgressPage() {
  return (
    <ThemeProvider theme={theme}>
        {/* <UsersApi> */}
            <WorkProgress />
            {/* Hi */}
        {/* </UsersApi> */}
        </ThemeProvider>
  )
}

export default WorkProgressPage