import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "../../icons/HorizonLogo";
// import { HSeparator } from "components/separator/Separator";
import { HorizonLogo } from "../../icons/Icons";
import { HSeparator } from "../../separator/Separator";
import logo from '../../../../assets/images/logo.png';
// import logo from '../../../../assets/images/updateLogo1.png';


export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      {/* <img src={logo} width="300px" height='50px'  style={{height:'50px',marginTop:'25px', marginBottom:'32px'}}/> */}
      <img src={logo} width="200px" height='80px'  style={{height:'140px',marginTop:'10px', marginBottom:'20px'}}/>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
