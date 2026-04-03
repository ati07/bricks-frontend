import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
function Loader() {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100000 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader