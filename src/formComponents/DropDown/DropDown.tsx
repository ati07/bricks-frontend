import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
// import { setmerchantData } from '../../redux/features/common/commonSlice';

import { setglobaltempDataKey } from '../../redux/features/globaltemp/globaltempSlice';
import { RootState } from '../../redux/app/store';
import { setMerchantsData } from '../../redux/features/common/commonSlice';

export default function DropDown({ props, dataHandle, disable }: any) {
  const common = useSelector((state: RootState) => state.commonData)
  const dispatch = useDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    // if (props.key === "client" && (props.component ? props.component !== 'users' : true)) {
    //   // dispatch(setMerchantsData(common.apiData.merchants.map((i: any) => {
    //   //   if (i.client === event.target.value) {
    //   //     return i.merchant
    //   //   }
    //   // }).filter((i: any) => { if (i !== null) return i })
    //   // ))
    //   // console.log('mer',)
    //   // common.apiData.clients.map((i: any) => {
    //   //   if (i.company === event.target.value) {
    //   //     console.log('i.merchant', i.merchant)
    //   //     dispatch(setMerchantsData(i.merchant))
    //   //     // return i.merchant.join()
    //   //     return null
    //   //   }
    //   // })
    //   // dispatch(setMerchantsData(common.apiData.clients.map((i: any) => {
    //   //   if (i.company === event.target.value) {
    //   //     return i.merchant.join()
    //   //   }
    //   // }).filter((i: any) => { if (i !== null) return i })
    //   // ))
    // }
    dispatch(setglobaltempDataKey({ key: props.key, value: event.target.value }))

  };
  console.log("props",props)
  return (
    <Box sx={{ minWidth: 120}} component='div'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
          error={props.error}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={props.title}
          onChange={handleChange}
          disabled={props.disable || disable}
          MenuProps={{ disableScrollLock: true }}
        >
          {props.options && props.options.map((i: any, j: number) => <MenuItem key={j} value={i} style={{ fontSize: '12px' }}>{i}</MenuItem>)}

        </Select>
      </FormControl>
    </Box>
  );
}