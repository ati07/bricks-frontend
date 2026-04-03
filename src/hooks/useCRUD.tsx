import React from 'react'
import { openSnackbar } from '../redux/snackbar/snackbarSlice'
import { closeLoader } from '../redux/loader/loaderSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function useCRUD() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleError = (err: any) => {
    // console.log('err', err)
    dispatch(closeLoader())

    if (err.status === 401 || err.status === 403) {
      localStorage.removeItem('user')
      navigate('/login')
      dispatch(openSnackbar({ open: true, severity: 'error', message: err.data.message }))
      // dispatch(closeLoader())
      return
    }

    if (err.status === 'FETCH_ERROR') {
      return dispatch(openSnackbar({ open: true, severity: 'error', message: err?.error?.split(':')[1] }))
    }

    if (err.status) {
      return dispatch(openSnackbar({ open: true, severity: 'error', message: err.data.message }))
    }

    // if (err.status === 404 || err.status === 500 || err.status === 400) {
    //   return dispatch(openSnackbar({ open: true, severity: 'error', message: err.data.message }))
    // }

    if (err.error) {
      dispatch(openSnackbar({ open: true, severity: 'error', message: err.error.split(':')[1] }))
      // dispatch(closeLoader())
      return
    }
    dispatch(openSnackbar({ open: true, severity: 'error', message: err.error }))
  }
  return { handleError }
}

export default useCRUD