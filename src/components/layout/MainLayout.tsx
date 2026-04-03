import { Outlet, useNavigate } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
// import Sidebar from "../common/sidebar/Sidebar.js";
import Topbar from "../common/Topbar";
import { useEffect, useState } from "react";
import appRoutes from "../../routes/appRoutes";

const MainLayout = () => {
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
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          // width: sizeConfigs.sidebar.width,
          flexShrink: 0
        }}
      >
        <Sidebar value={role} />
        {/* <Sidebar routes={appRoutes} routes {...rest}/> */}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;