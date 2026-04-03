import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setglobaltempDataKey } from '../../redux/features/globaltemp/globaltempSlice';

function Input({props,dataHandle,disable}:any) {
  // console.log("propsInp",props);
  // const [user] = useUserMutation()
  const [value,setValue] =useState('')
  // let value = props.value
  // const globaltemp = useSelector((state:RootState)=>state.globaltemp)
   const dispatch = useDispatch()
   const mccData:any = {
    5045:'2',5399:'2',5499:'2',5734:'2',5735:'2',5815:'2',5817:'2',5818:'2',5964:'2',5968:'2',5969:'2',5999:'2',7299:'2',7321:'2',7399:'2',8699:'2',8999:'2',
    4816:'3',5122:'3',5816:'3',5912:'3',5962:'3',5966:'3',5967:'3',5993:'3',6051:'3',7273:'3',7995:'3'    
    }
  const handleChange=(event:any)=>{
    
    setValue(event.target.value)

  }
  const onBlur=(event:any)=>{
    // if(props.key==='mcc' && props.form==='DBA'){
    //   dispatch(setglobaltempDataKey({key:props.key, value:event.target.value}))
    //   return dispatch(setglobaltempDataKey(
    //     {key:'rdrtier', 
    //      value:mccData?.[event.target.value] ?? '1'}))
    // }
    if(props.key==="met2"){

      let sqrtft = (event.target.value) * 10.7639
      console.log("sqrtft",sqrtft)
      dispatch(setglobaltempDataKey({key:'unitArea', value:sqrtft.toFixed(2)}))
    }
    dispatch(setglobaltempDataKey({key:props.key, value:event.target.value}))

  }
  useEffect(()=>{
    setValue(props.value)
  },[props.value])
  return (
    <Box sx={{ minWidth: 120 }} component='div'>
      <TextField 
      error={props.error}
      type={props.type}
      value={value} 
      id="standard-basic" 
      label={props.title} 
      variant="outlined" 
      onChange={handleChange} 
      fullWidth
      onBlur={onBlur}
      // defaultValue={props.value}
      disabled={props.disable || disable} />
    </Box>
  )
}

export default Input