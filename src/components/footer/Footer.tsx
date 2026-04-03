import { Typography,Box,ButtonBase,Link } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box style={{display: 'flex',width: '100%',height: '50px',position:'relative',bottom:0,
    justifyContent: 'center',
    alignItems: 'center'}}>
    <Typography variant="body1" color="textSecondary" fontWeight="400" align="center" margin='5px'>
    Verdeazul Properties © {new Date().getFullYear()} All Right Reserved
        {/* <Link color="inherit" href="https://www.jiitms.com/">
         
        </Link>{' '} */}
        
        {'.'}
      </Typography>
      <Link style={{cursor:"pointer"}}>Support</Link>
      </Box>
  )
}

export default Footer