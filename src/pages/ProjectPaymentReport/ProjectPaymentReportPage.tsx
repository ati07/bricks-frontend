import React from 'react'
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';
import ProjectPaymentReport from '../../components/ProjectPaymentReport/ProjectPaymentReport';

function ProjectPaymentReportPage() {
  return (
    <ThemeProvider theme={theme}>
        <ProjectPaymentReport/>
    </ThemeProvider>
  )
}

export default ProjectPaymentReportPage