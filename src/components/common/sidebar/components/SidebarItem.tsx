import { ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link,useLocation } from "react-router-dom";
// import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
// import colorConfigs from "../../configs/colorConfigs";
// import { RootState } from "../../redux/app/store";
// import { RouteType } from "../../routes/config";
// import { useTranslation } from "react-i18next";

// type Props = {
//   item: RouteType;
//   onClick?:()=>void;
// };

const SidebarItem = ({ item,subMenu }: any) => {
  // const { t, i18n } = useTranslation();
  // const { appState } = useSelector((state: RootState) => state.appState);
  let location = useLocation();
  let activeText = '#2d3748'
  // let activeIcon = '#422afb'
  let activeIcon = '#F37021'
  let inActiveText = '#8f9bba'
  let inActiveIcon = '#8f9bba'
  let activeFontWeight = '700'
  let inActiveFontWeight = '400'

  // const { routes } = props;
  const activeRoute = (routeName: any) => {
    // console.log("routeName",routeName, location.pathname, location.pathname.includes(routeName));
    return location.pathname.includes(routeName);
  };
  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          fontFamily: "DM Sans",
          // "&: hover": {
          //   backgroundColor: colorConfigs.sidebar.hoverBg
          // },
          // backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
          color: activeRoute(item.path.toLowerCase()) ? activeText : inActiveText,
          fontWeight: activeRoute(item.path.toLowerCase()) ? "bold" : "normal",
          // paddingY: "5px",
          paddingX: subMenu?"10px":"3px",
          height:'35px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ListItemIcon sx={{
          minWidth:'40px',
          width:'17px',
          height:'17px',
          color: activeRoute(item.path.toLowerCase()) ? activeIcon : inActiveIcon
        }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        <Typography sx={{
          fontFamily: "DM Sans",
          letterSpacing: '-0.5px',
          fontSize:'0.8rem',
          width:'100%',
          color:
            activeRoute(item.path.toLowerCase())
              ? activeText
              : inActiveText,
          fontWeight:
            activeRoute(item.path.toLowerCase())
              ? "bold"
              : "normal",
        }}>
          {item.sidebarProps.displayText}
        </Typography>

        {/* {t(`${item.sidebarProps.displayText}`)} */}
        <Box
          h='30px'
          w='6px'
          bg={
            activeRoute(item.path.toLowerCase())
              ? activeIcon
              : "transparent"
          }
          borderRadius='5px'
        />
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;