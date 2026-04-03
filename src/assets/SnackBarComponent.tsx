import React, { useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { closeSnackbar, SnackBar } from '../redux/snackbar/snackbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/app/store';
import { Button, IconButton, Stack } from '@mui/material';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';

function TransitionDown(props:any) {
    return <Slide {...props} direction="down" />;
  }
function SnackBarComponent() {

    const snackbarState = useSelector((state: RootState) => state.snackbar)

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeSnackbar())
    }
    // To hide snackbar after specific time
    useEffect(() => {
        const timeOut = setTimeout(() => {
            snackbarState.open && dispatch(closeSnackbar())
        }, 3000)

        return () => clearTimeout(timeOut);
    }, [snackbarState.open])
    // snackbarState.open
    return (
        <Stack spacing={2} sx={{ maxWidth: '500px' }}>
            <Snackbar 
             TransitionComponent={TransitionDown} 
             anchorOrigin={{ vertical: "top", horizontal: "center" }} 
             key={snackbarState.severity} 
             open={snackbarState.open} 
             style={{top:'70px'}}
             
             >
                <Alert 
                variant='filled' 
                className='upload-alert' 
                severity={snackbarState.severity} 
                onClose={handleClose} 
                style={{display:"flex",alignItems:"center",borderRadius:"40px"}}
                action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="medium"
                      onClick={() => {
                        handleClose()
                        // setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="medium"  style={{color:"white"}}/>
                    </IconButton>
                  }
                >
                    {snackbarState.message}
                </Alert>
            </Snackbar >
        </Stack>
    )
}

export default SnackBarComponent