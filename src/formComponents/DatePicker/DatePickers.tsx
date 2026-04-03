import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
// import { setmerchantData } from '../../redux/features/common/commonSlice';
import { useDispatch } from 'react-redux';
import { setglobaltempDataKey } from '../../redux/features/globaltemp/globaltempSlice';
import Box from '@mui/material/Box';
import './date.css'

export default function DatePickers({ props, dataHandle, disable }: any) {
  const dispatch = useDispatch()
  const handleChange = (newValue: any) => {
   
    // dataHandle(props.key, newValue.toISOString().split('T')[0])newValue.toISOString().split('T')[0]
    

    if(props.key==='file_date'){
     const date = new Date(newValue as string);
    // Add 7 days to specified date
      date.setDate(date.getDate() + 7);
      // console.log('date',date.toISOString().split('T')[0])
       dispatch(setglobaltempDataKey({
        key:props.key, 
        value:newValue.toISOString().split('T')[0]
      }))
      return dispatch(setglobaltempDataKey({
        key:'due_date', 
        value:date.toISOString().split('T')[0]
      }))

    }
    dispatch(setglobaltempDataKey({ key: props.key, value: newValue.toISOString().split('T')[0] }))


    // console.log("newValue",newValue.toISOString().split('T')[0]);

  }
  return (
    <Box className='date' sx={{ minWidth: 120,marginTop:"-8px" }} component='div'>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker']}  >
          <DatePicker label={props.title}
            value={dayjs(props.value)}
            onChange={handleChange} 
            disabled={props.disabled ?? disable}
            className='datePicker'
            // style={{borderRadius:'10px'}}
            // disabled={props.disabled ?? false}
          // style={{paddingTop:'0px'}}
          />

        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}