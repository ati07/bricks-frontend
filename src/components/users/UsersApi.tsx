import React from 'react'
import { useGetDataQuery } from '../../redux/ApiHandler/ThemeApi'
import { useDispatch } from 'react-redux'
import { setApiData, setClientsData, setCommonData, setMerchantsData } from '../../redux/features/common/commonSlice'
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice'

function UsersApi(props: any) {
  const api = useGetDataQuery('/user')
  const dispatch = useDispatch()
  dispatch(openLoader({ open: true }))
  if (api.isSuccess) {
    // console.log("api",api);
    let rl = JSON.parse(localStorage.getItem('user') ?? '').role
    let name: any;
    if (rl === 'Client' || rl === 'User') {
      name = JSON.parse(localStorage.getItem('user') ?? '').client
    }
    // if(){
    //   name =JSON.parse(localStorage.getItem('user') ?? '').client
    // }
    dispatch(setCommonData(api.data.result.map((i: any) => {
      if (rl === 'Admin') {
        return { id: i._id, ...i }
      }
      if (i.client === name && i.role !== 'Client') {
        return { id: i._id, ...i }
      }

    }).filter((i: any) => { if (i !== null) return i })
    ))
    // dispatch(setMerchantsData(api.data.merchants.map((i:any)=>i.merchant)))
    dispatch(setClientsData(api.data.clients.map((i: any) => {
      if (rl === 'Admin') {
        return i.company
      }
      if (i.name === name) {
        return i.company
      }

    }).filter((i: any) => { if (i !== null) return i })

    ))
    dispatch(setApiData({...api.data}))
    dispatch(closeLoader())
  }
  return (
    <div>{api.isSuccess ? props.children : ''}</div>
  )
}

export default UsersApi