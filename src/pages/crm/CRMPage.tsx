import React, { useEffect } from 'react'
import CRMApi from '../../components/crm/CRMApi'
import { useNavigate } from 'react-router-dom'
import CRM from '../../components/crm/CRM'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../App';


function CRMPage(props: any) {
    // const navigate = useNavigate()
    
    // useEffect(() => {
    //     if (!localStorage.getItem('user')) {
    //         navigate('/login')
    //     }
    // }, [])
    return (
        <ThemeProvider theme={theme}>
        {/* <CRMApi> */}
            <CRM/>
        {/* </CRMApi> */}
        </ThemeProvider>
    )
}

export default CRMPage