import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import colorConfigs from "../../configs/colorConfigs";
// import { RouteType } from "../../routes/config";
import { Link,useLocation } from "react-router-dom";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../../../redux/features/appState/appStateSlice";
import { RootState } from "../../../../redux/app/store";
import colorConfigs from "../../../../configs/colorConfigs";
// import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
// import { RootState } from "../../redux/app/store";
// import { setSidebar } from "../../redux/features/appState/appStateSlice";

// type Props = {
//   item: RouteType;
//   onClick?:()=>void;
// };

const SidebarItemCollapse = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let location = useLocation();
  let activeText = '#2d3748'
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
  const { appState,sidebar } = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={() => {
            setOpen(!open)
            dispatch(setSidebar(true))
          }}
          sx={{
            fontFamily: "DM Sans",
            "&: hover": {
              // backgroundColor: colorConfigs.sidebar.hoverBg
            },
            // backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
            color: activeRoute(item.path.toLowerCase()) ? activeText : inActiveText,
            fontWeight: activeRoute(item.path.toLowerCase()) ? "bold" : "normal",
            padding: "5px",
            // paddingX: "10px",
            height:'40px',
            width:'100%',
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
          <ListItemText
            disableTypography
            primary={
              <Typography sx={{
                fontFamily: "DM Sans",
                letterSpacing: '-0.5px',
                width:'100%',
                fontSize:'0.8rem',
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
            }
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List style={{padding:'10px'}}>
            {item.child?.map((route:any, index:number) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <SidebarItem item={route} key={index} subMenu={true}/>
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;