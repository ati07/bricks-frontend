import React, { useEffect } from 'react';
// import { useValue } from '../context/ContextProvider';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../redux/snackbar/snackbarSlice';
import { closeLoader } from '../redux/loader/loaderSlice';
// import { storeRoom } from '../actions/room';
// import { logout } from '../actions/user';

const useCheckToken = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     const decodedToken:any = jwtDecode(JSON.parse(localStorage.getItem('user')??'').token);
  //     if (decodedToken.exp * 1000 < new Date().getTime()) {
  //       dispatch(openSnackbar({ open: true, severity: 'info', message: "Session is expired" }))
  //       navigate('/login')
  //       localStorage.removeItem('user')
  //       dispatch(closeLoader())
  //       localStorage.removeItem('user')
  //     }
  //   }
  // }, []);
};

export default useCheckToken;
