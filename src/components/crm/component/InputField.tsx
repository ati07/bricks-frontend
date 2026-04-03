import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import React from 'react'

function InputField({value,onBlur,start,sign,onChange}:any) {
    return (
        <FormControl  sx={{ m: 1,marginBottom:'17px' }} variant="standard">
            {/* <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel> */}
            {start?<Input
            sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                         display: "none",
                                       },
               "& input[type=number]": {
                                         MozAppearance: "textfield",
                                       },
               }}
                type='number'
                size="small"
                id="standard-adornment-amount"
                value={value}
                startAdornment={<InputAdornment position="start">{sign}</InputAdornment>}
                onChange={onChange}
                onBlur={onBlur}
            />:
            <Input
            sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                         display: "none",
                                       },
               "& input[type=number]": {
                                         MozAppearance: "textfield",
                                       },
               }}
                type='number'
                size="small"
                id="standard-adornment-amount"
                value={value}
                endAdornment={<InputAdornment position="end">{sign}</InputAdornment>}
                onChange={onChange}
                onBlur={onBlur}
                />
                
            }
        </FormControl>
    )
}

export default InputField