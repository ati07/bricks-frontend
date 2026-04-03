import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
// import RdrAlert from '../../components/rdrAlert/RdrAlert'
// import RdrApi from '../../components/rdrAlert/rdrApi'
import { setglobaltempData } from '../../redux/features/globaltemp/globaltempSlice';
import Users from '../../components/users/Users';
import UsersApi from '../../components/users/UsersApi';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function UsersPage() {
    const dispatch = useDispatch()
    // console.log("object");
    dispatch(setglobaltempData({}))
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (!localStorage.getItem('user')) {
    //         // dispatch(setopenlogin(true))
    //         navigate('/login')
    //     }
    // }, [])
    return (
        <ThemeProvider theme={theme}>
        {/* <UsersApi> */}
            <Users />
            {/* Hi */}
        {/* </UsersApi> */}
        </ThemeProvider>
    )
}

export default UsersPage