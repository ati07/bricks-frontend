import React from 'react'
import { useGetDataQuery } from '../../redux/ApiHandler/ThemeApi'
import { useDispatch } from 'react-redux'
import { setApiData, setClientsData, setCommonData, setMerchantsData } from '../../redux/features/common/commonSlice'
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice'

function ClientApi(props:any) {
    const api = useGetDataQuery('/client')
    const dispatch = useDispatch()
    dispatch(openLoader({ open: true }))

    if(api.isSuccess){
        // console.log("api",api);
        dispatch(setCommonData(api.data.result.map((i:any)=>{
            return {id:i._id,...i}
        })))
        dispatch(setMerchantsData(api.data.merchants.map((i:any)=>i.merchant)))
        dispatch(setClientsData(api.data.merchants.map((i:any)=>i.company)))
        dispatch(setApiData({...api.data}))
        dispatch(closeLoader())

    }
  return (
    <div>{api.isSuccess ?props.children:''}</div>
  )
}

export default ClientApi