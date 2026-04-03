import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "../common/separator/Separator";
import DefaultAuth from "../layout/auth/Default";
// Assets
import illustration from "../../assets/img/auth/auth.png";
import loginImg from "../../assets/images/p2.jpeg";
// import loginImg from "../../assets/images/img6.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/snackbar/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { useUserMutation } from "../../redux/ApiHandler/ThemeApi";
// import logo from "../../assets/images/whitelogo.png";
import logo from '../../assets/images/logo.png';
import {
  setloginData,
  setopenlogin,
} from "../../redux/features/loginSlice/loginSlice";
import { closeLoader, openLoader } from "../../redux/loader/loaderSlice";

export const collectFormData = (item: any) => {
  var form_data = new FormData();
  for (var key in item) {
    form_data.append(key, item[key]);
  }
  return form_data;
};
function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useUserMutation();
  const [isRegister, setIsRegister] = useState(false);
  const [open, setOpen] = useState(true);
  const nameRef: any = useRef("");
  const emailRef: any = useRef("");
  const passwordRef: any = useRef("");
  const confirmPasswordRef: any = useRef("");

  const handleClose = () => {
    // dispatch({ type: 'CLOSE_LOGIN' });
    setOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(openLoader({ open: true }));

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    // if (!isRegister) return login({ email, password }, dispatch);
    if (isRegister) {
      if (password !== confirmPassword) {
        return dispatch(
          openSnackbar({
            open: true,
            severity: "error",
            message: "Password Not Match",
          })
        );
      }
      await user({
        endpoint: "/user/register",
        data: JSON.stringify({ name: name, email: email, password: password }),
      })
        .then((response: any) => {
          // console.log("response",response)
          if (response.data.success) {
            dispatch(setloginData(response.data.result));
            dispatch(closeLoader());
          } else {
            dispatch(
              openSnackbar({
                open: true,
                severity: "error",
                message: "Something went wrong",
              })
            );
          }
        })
        .catch((err: any) => {
          dispatch(
            openSnackbar({
              open: true,
              severity: "error",
              message: err.message,
            })
          );
        });
    } else {
      let formData = new FormData();
      console.log("hitlogin");
      // let userData ={
      //   createdAt: "2023-11-07T19:47:17.471Z",
      //   id: "654a944539473fefc82bb501",
      //   isActive: true,
      //   name: "atiurrhaman",
      //   role: "Admin",
      //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGE5NDQ1Mzk0NzNmZWZjODJiYjUwMSIsIm5hbWUiOiJhdGl1cnJoYW1hbiIsInJvbGUiOiJBZG1pbiIsImVtYWlsIjoiYXRpdXJyYWhtYW5AZ21haWwuY29tIiwiaWF0IjoxNzM5ODk3NjEwLCJleHAiOjE3NDAwMjcyMTAsImF1ZCI6ImNicHJvIiwiaXNzIjoiQXV0aG9yaXphdGlvbiIsInN1YiI6ImlhbUB1c2VyLm1lIn0.t6UNRnRS9Vita6AG2Sxm6YRQywi_M4oZCSzT3iBAupI"
      // }
      // localStorage.setItem('user', JSON.stringify(userData))
      // navigate('/dashboard')
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
      if (email === "admin@gmail.com" && password === "admin123") {
        setOpen(false);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "admin",
            password: "admin123",
            createdAt: "2023-11-07T19:47:17.471Z",
            id: "654a944539473fefc82bb501",
            isActive: true,
            role: "Admin",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGE5NDQ1Mzk0NzNmZWZjODJiYjUwMSIsIm5hbWUiOiJhdGl1cnJoYW1hbiIsInJvbGUiOiJBZG1pbiIsImVtYWlsIjoiYXRpdXJyYWhtYW5AZ21haWwuY29tIiwiaWF0IjoxNzM5ODk3NjEwLCJleHAiOjE3NDAwMjcyMTAsImF1ZCI6ImNicHJvIiwiaXNzIjoiQXV0aG9yaXphdGlvbiIsInN1YiI6ImlhbUB1c2VyLm1lIn0.t6UNRnRS9Vita6AG2Sxm6YRQywi_M4oZCSzT3iBAupI",
          })
        );
        navigate("/dashboard");
        dispatch(closeLoader());
      } else {
        dispatch(
          openSnackbar({
            open: true,
            severity: "error",
            message: "Invalid Credential",
          })
        );
      }
    }
  };
  const handleClick = () => setShow(!show);
  useEffect(() => {
    dispatch(closeLoader());
  }, []);
  return (
    <DefaultAuth illustrationBackground={loginImg} image={loginImg}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto" 
    alignItems='center'
    justifyContent= "center"
    display= 'flex'
    w={'100%'}
    >
        <img src={logo} width="200px" height='50px'  style={{height:'150px',marginTop:'10px', marginBottom:'20px'}}/>
          {/* <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading> */}
          {/* <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text> */}
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          {/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button> */}
          {/* <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex> */}
          <FormControl onSubmit={handleSubmit}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Usuario<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              ref={emailRef}
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Contraseña<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                ref={passwordRef}
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {/* <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex> */}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              // color={'white'}
              // bg='#F37021'
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </FormControl>
          {/* <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
