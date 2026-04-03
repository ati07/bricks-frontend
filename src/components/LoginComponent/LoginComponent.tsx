import { Close, Send } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PasswordField from './PasswordField';
// import './login.css'
import './login1.css'
import loginImg from '../../assets/images/loginImage.png'
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../redux/snackbar/snackbarSlice';
import { useNavigate } from 'react-router-dom';
import { useUserMutation } from '../../redux/ApiHandler/ThemeApi';
import logo from '../../assets/images/whitelogo.png'
import {setloginData, setopenlogin } from '../../redux/features/loginSlice/loginSlice';
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice';
export const collectFormData = (item: any) => {
    var form_data = new FormData();
    for (var key in item) {
        form_data.append(key, item[key]);
    }
    return form_data
}
const Login = () => {
    const [title, setTitle] = useState('Login');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user] = useUserMutation()
    const [isRegister, setIsRegister] = useState(false);
    const [open, setOpen] = useState(true)
    const nameRef: any = useRef('');
    const emailRef: any = useRef('');
    const passwordRef: any = useRef('');
    const confirmPasswordRef: any = useRef('');

    const handleClose = () => {
        // dispatch({ type: 'CLOSE_LOGIN' });
        setOpen(false)
    };

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        dispatch(openLoader({ open: true }))

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        // if (!isRegister) return login({ email, password }, dispatch);
        if(isRegister){
            if (password !== confirmPassword){
               return dispatch(openSnackbar({ open: true, severity: 'error', message: 'Password Not Match' }))
            }
            await user({
                endpoint:'/user/register',
                data:JSON.stringify({ name:name, email:email, password:password })
            }).then((response:any)=>{
                // console.log("response",response)
                if(response.data.success){
                    dispatch(setloginData(response.data.result))
                    dispatch(closeLoader())

                }else{
                dispatch(openSnackbar({ open: true, severity: 'error', message: "Something went wrong" }))

                }
            })
            .catch((err:any)=>{
                dispatch(openSnackbar({ open: true, severity: 'error', message: err.message }))
            })
        }else{
            let formData = new FormData();
            console.log('hitlogin')
            // await user({
            //     endpoint:'/user/login',
            //     data:JSON.stringify({ email:email, password:password })
            // }).then((response:any)=>{
            //     console.log('.',response);
            //     if(response.error){
            //         dispatch(openSnackbar({ open: true, severity: 'error', message: response.error.data.message }))
            //         dispatch(closeLoader())
            //         return
            //     }
            //     if(response.data.success){
            //         dispatch(setloginData(response.data.result))
            //         dispatch(setopenlogin(false))
            //         dispatch(closeLoader())

            //         localStorage.setItem('user', JSON.stringify(response.data.result))
            //         navigate('/dashboard')
            //         return
            //         // console.log("responseLogin",response)
            //     }else{
            //     dispatch(openSnackbar({ open: true, severity: 'error', message: response.error.data.message }))
            //     dispatch(closeLoader())
            //     return


            //     }

                
            // })
            // .catch((err:any)=>{
            //     dispatch(openSnackbar({ open: true, severity: 'error', message: err.message }))
            //     dispatch(closeLoader())

            // })
            if (email === 'admin@gmail.com'
                        && password === 'admin123') {
                        setOpen(false)
                        localStorage.setItem("login", JSON.stringify({
                            email: 'admin@chargebackprolatam.com',
                            password: 'admin123'
                        }))
                        navigate('/dashboard')
                    } else {
                        dispatch(openSnackbar({ open: true, severity: 'error', message: 'Invalid Credential' }))
                    }
        }
        
    };

    useEffect(() => {
        isRegister ? setTitle('Register') : setTitle('Login');
    }, [isRegister]);
    //   onClose={handleClose}
    return (
        <div id="kt_body" className=" quick-panel-right demo-panel-right offcanvas-right header-fixed header-mobile-fixed subheader-enabled aside-enabled aside-fixed aside-minimize-hoverable">

       
        <div className="d-flex flex-column flex-root">
            <div className="login login-2 login-signin-on d-flex flex-column flex-column-fluid position-relative overflow-hidden login-v2-background-image" id="kt_login">
               
                <div className="login-header py-10 flex-column-auto">
                   
                    <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between pl-md-12 ml-0">
                        <div className="flex-column-auto py-5 py-md-0">
                            {/* <img src={logo} alt=""/> */}
                        </div>
                    </div>
                </div>
                <div className="login-body d-flex flex-column-fluid align-items-stretch justify-content-center">
                   
                    <div className="container row">
                        <div className="col-lg-6 d-flex login-form-wrapper">
                            <div className="login-form login-signin">
                                
                                <form className="form w-xxl-550px rounded-lg pt-5 p-15 p-sm-20 fv-plugins-bootstrap fv-plugins-framework login-v2-container" 
                                // action="/login_check" 
                                // method="post" 
                                onSubmit={handleSubmit}
                                id="kt_login_signin_form"
                                >
                                    <input type="hidden" name="_csrf_token" value="l2Sld1ehAChVLC_DMdSkTvetjq7N6v9wzIlPM_PLW_M"/>
                                    <div style={{textAlign:'center',margin:'15px'}}>
                                        <img src={logo} width={250} height={30} alt=""/>
                                    </div>
                                    
                                    <div className="pb-5 pt-lg-10 pt-5">
                                        <h3>Sign in to your account</h3>
                                    </div>
                                    <div className="form-group validated fv-plugins-icon-container">
                                        <input ref={emailRef} className="form-control form-control-solid h-auto p-6 rounded-lg " type="text" placeholder="Username" name="_username" />
                                    </div>
                                    <div  className="form-group fv-plugins-icon-container">
                                        <input ref={passwordRef} className="form-control form-control-solid h-auto p-6 rounded-lg" type="password" placeholder="Password" name="_password" />
                                    </div>
                                    <div className="pb-lg-0 pb-5">
                                        <span></span>
                                        <button type="submit" className="btn btn-primary btn-login font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3" name="_submit" id="kt_login_signin_submit">Sign In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="login-footer py-10 flex-column-auto">
                    <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between">
                        <div className="font-size-h6 font-weight-bolder order-2 order-md-1 py-2 py-md-0"></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        // <Dialog open={open} sx={{ backgroundColor: '#000' }} >
        //     <DialogTitle>
        //         {title}
        //         {/* <IconButton
        //   sx={{
        //     position: 'absolute',
        //     top: 8,
        //     right: 8,
        //     color: (theme) => theme.palette.grey[500],
        //   }}
        //   onClick={handleClose}
        // >
        //   <Close />
        // </IconButton> */}
        //     </DialogTitle>
        //     <form onSubmit={handleSubmit}>
        //         <DialogContent dividers>
        //             <DialogContentText>
        //                 Please fill your information in the fields below:
        //             </DialogContentText>
        //             {isRegister && (
        //                 <TextField
        //                     autoFocus
        //                     margin="normal"
        //                     variant="standard"
        //                     id="name"
        //                     label="Name"
        //                     type="text"
        //                     fullWidth
        //                     inputRef={nameRef}
        //                     inputProps={{ minLength: 2 }}
        //                     required
        //                 />
        //             )}
        //             <TextField
        //                 autoFocus={!isRegister}
        //                 margin="normal"
        //                 variant="standard"
        //                 id="email"
        //                 label="Email"
        //                 type="email"
        //                 fullWidth
        //                 inputRef={emailRef}
        //                 required
        //             />
        //             <PasswordField {...{ passwordRef }} />
        //             {isRegister && (
        //                 <PasswordField
        //                     passwordRef={confirmPasswordRef}
        //                     id="confirmPassword"
        //                     label="Confirm Password"
        //                 />
        //             )}
        //         </DialogContent>
        //         <DialogActions sx={{ px: '19px' }}>
        //             <Button type="submit" variant="contained" endIcon={<Send />}>
        //                 Submit
        //             </Button>
        //         </DialogActions>
        //     </form>
        //     <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        //         {isRegister
        //             ? 'Do you have an account? Sign in now '
        //             : "Don't you have an account? Create one now "}
        //         <Button onClick={() => setIsRegister(!isRegister)}>
        //             {/* Login */}
        //             {isRegister ? 'Login' : 'Register'}
        //         </Button>
        //     </DialogActions>
        //     {/* <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        //         <GoogleOneTapLogin />
        //     </DialogActions> */}
        // </Dialog>
    );
};

export default Login;
