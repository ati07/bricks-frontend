import React from 'react'
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/app/store';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DialogBox() {

    const DialogBoxState = useSelector((state: RootState) => state.dialogBox)

    return (
        <Dialog
            open={DialogBoxState.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='sm' fullWidth={true}
        >
            <DialogContent >
                <DialogContentText id="alert-dialog-description" component='div'>
                    <Typography variant="h6" style={{fontFamily: 'DM Sans'}}>
                        {DialogBoxState.message}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button  style={{
                    fontFamily: 'DM Sans',
                        borderRadius: '16px', backgroundColor: '#422afb',
                        color: '#ffffff'
                    }} className='add_btn' onClick={DialogBoxState.secondaryAction}>{DialogBoxState.btnSecondaryText}</Button>
                <Button  style={{
                    fontFamily: 'DM Sans',
                        borderRadius: '16px', backgroundColor: '#422afb',
                        color: '#ffffff'
                    }} className='add_btn' onClick={DialogBoxState.primaryAction}>
                    {DialogBoxState.btnPrimaryText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}