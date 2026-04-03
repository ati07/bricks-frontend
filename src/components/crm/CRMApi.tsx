import React, { useEffect } from 'react'
import { useGetDataQuery } from '../../redux/ApiHandler/ThemeApi'
import { useDispatch } from 'react-redux'
import { setApiData, setClientsData, setCommonData, setDbasFilterData, setMerchantsData, setMerchantsFilterData } from '../../redux/features/common/commonSlice'
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice'
import { useNavigate } from 'react-router-dom'
import { openSnackbar } from '../../redux/snackbar/snackbarSlice'
import useCRUD from '../../hooks/useCRUD'

function CRMApi(props: any) {
    const api: any = useGetDataQuery('/crm')
    const dispatch = useDispatch()
    const { handleError } = useCRUD()
    useEffect(() => {
        if ((api.status === 'rejected') || (api.data?.status === 'fulfilled' && api.data?.success === false)) {
            handleError(api?.error)

        }
        if (api.isSuccess) {
            dispatch(setCommonData(api.data.result.map((i: any,j:number) => {
                return { id: i._id, contact: i?.contacts.filter((k:any,l:number)=>k?.check)?.[0]?.contact, position: i?.contacts.filter((k:any,l:number)=>k?.check)[0]?.position, email: i?.contacts.filter((k:any,l:number)=>k?.check)[0]?.email, ...i }
            }))) 

        } else {
            dispatch(setCommonData([] as any))
        }
    }, [api])
  return (
    <div>{props.children}</div>
  )
}

export default CRMApi