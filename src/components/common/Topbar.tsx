import { Box, FormControl, IconButton, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../redux/features/appState/appStateSlice";
import { RootState } from '../../redux/app/store'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from '../../assets/images/whitelogo.png';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const lngs = [
  { code: "en", native: "English" },
  { code: "sp", native: "Spanish" },
];

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar = () => {
  const { sidebar } = useSelector((state: RootState) => state.appState)
  const { t, i18n } = useTranslation();
  const [lang,setLang] = useState('en')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleDrawerOpen = () => {
    dispatch(setSidebar(true))
  }
  const handlelogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }
  const handleChangeLangauge=(code:any)=>{
    // console.log("code",code.target.value);
    i18n.changeLanguage(code.target.value);
    setLang(code.target.value)
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        // width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        // ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '10px' }}>
        {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(sidebar && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton> */}
        <Typography variant="h6" noWrap component="div">
          <img width="240px" height='30px' src={logo} alt='img' />
        </Typography>
        <Typography>{new Date().toLocaleString()}</Typography>
        <Box sx={{ minWidth: 120,width: '150px',display:'flex',alignItems: 'center',justifyContent: 'space-between',}} component='div'>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">{props.title}</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              // label={props.title}
              onChange={handleChangeLangauge}
              style={{
                width: '120px',
                height: '32px',
                // top: '10px',
                paddingRight:'5px',
                backgroundColor: 'white'
            }}
              // disabled={disable}
            >
              {lngs.map((i: any, j: number) => <MenuItem key={j} value={i.code} >{i.native}</MenuItem>)}

              {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        <LogoutOutlinedIcon onClick={handlelogout} sx={{ cursor: 'pointer' }} />

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;