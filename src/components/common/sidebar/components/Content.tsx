// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "../components/Brand";
import Links from "../components/Links";
import SidebarCard from "../components/SidebarCard";
import React, { useEffect, useState } from "react";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SidebarItem from "./SidebarItem";
import CssBaseline  from '@mui/material/CssBaseline';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
  // import './i18n'
  // import './index.css'
  const theme = createTheme({
    // typography: {
    //   // subtitle1: {
    //   //   fontSize: 12,
    //   // },
    //   h3:{
    //     fontFamily:"montserrat medium"
    //   },
    //   // body1: {
    //   //   fontWeight: 500,#233044
    //   // },
    //   button: {
    //     fontFamily:"montserrat medium",
    //     backgroundColor:'#F37021',
    //     color:'white',
    //     border:'none',
    //     '&:hover':{
    //       backgroundColor:'#233044'
    //     }
    //   },
    // }
  });
// FUNCTIONS

function SidebarContent(props:any) {
  const { routes } = props;
  // SIDEBAR
  // filter((route:any)=> value ==='Admin' ? route : notAccess.includes(route.state) ? null : route)
  const navigate = useNavigate()
  const [role,setRole] = useState('')
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      // dispatch(setopenlogin(true))
      navigate('/login')
    }else{
      setRole(JSON.parse(localStorage.getItem('user')??'').role ?? '')
    }
  }, [])
  const notAccess = ['clients']
  console.log('routs',routes)
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
        {routes.filter((route:any)=> role ==='Admin' ? route : notAccess.includes(route.state) ? null : route).map((route:any, index:number) => (
          route.sidebarProps ? (
            route.child ? (
              <ThemeProvider theme={theme}>
               <CssBaseline/>
              <SidebarItemCollapse item={route} key={index} 
              // onClick={()=>
              //   setOpen(true)
              // }
              />
              </ThemeProvider>
            ) : (
              <ThemeProvider theme={theme}>
               <CssBaseline/>
              <SidebarItem item={route} key={index} 
              // onClick={()=>
              //   setOpen(true)
              // }
              />
              </ThemeProvider>
            )
          ) : null
        ))}
          {/* <Links routes={routes} /> */}
        </Box>
      </Stack>

      {/* <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        <SidebarCard />
      </Box> */}
    </Flex>
  );
}

export default SidebarContent;
