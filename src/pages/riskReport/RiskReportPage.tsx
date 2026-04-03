import React from 'react'
import RiskReport from '../../components/riskReport/RiskReport'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../App'

function RiskReportPage() {
  return (
    // <div>Hi</div>
    <ThemeProvider theme={theme}>
    <RiskReport/>
    </ThemeProvider>
  )
}

export default RiskReportPage