import React, { useState } from "react";
import { Avatar, IconButton, List, Stack, Toolbar } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { setSidebar } from "../../redux/features/appState/appStateSlice";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Sidebar = ({value}:any ) => {
  const theme = useTheme();
  const { sidebar } = useSelector((state: RootState) => state.appState)
  const [open, setOpen] = useState(sidebar);
  const dispatch = useDispatch();
  // const value ='User'
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawer = () => {
    // setOpen(!open);
    dispatch(setSidebar(!sidebar))
  };
  const notAccess = ['clients','users']

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebar ? sizeConfigs.sidebar.width:'65px',
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color
        }
      }}
      open={sidebar}
    >
      <DrawerHeader>
        {/* <IconButton onClick={handleDrawer}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton> */}
      </DrawerHeader>
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            {/* <DrawerHeader> */}
              <IconButton onClick={handleDrawer}>
                {theme.direction === 'ltr' && !sidebar ? <ChevronLeftIcon style={{color:'white'}}/> : <ChevronRightIcon style={{color:'white'}}/>}
              </IconButton>
            {/* </DrawerHeader> */}
            {/* <Avatar src={assets.images.logo} /> */}
          </Stack>
        </Toolbar>
        {appRoutes.filter((route:any)=> value ==='Admin' ? route : notAccess.includes(route.state) ? null : route).map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} onClick={()=>setOpen(true)}/>
            ) : (
              <SidebarItem item={route} key={index} onClick={()=>setOpen(true)}/>
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;