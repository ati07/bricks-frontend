import React, { useEffect, useState } from 'react'
// Chakra imports
import { Portal, Box, useDisclosure, Text, Button, Link } from '@chakra-ui/react';
import Sidebar from '../common/sidebar/Sidebar';
import Navbar from '../common/navbar/Navbar';
// import Footer from '../common/footer/FooterAdmin.js';
import appRoutes from "../../routes/appRoutes";
// import Footer from '../footer/Footer';
import { routes } from '../../routes';
import { Outlet, Routes, useNavigate } from 'react-router-dom';
import DashboardPage from '../../pages/dashboard/DashboardPage';

function ChakraLayout(props: any) {
	const { ...rest } = props;
	// states and functions
	const [fixed] = useState(false);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const { onOpen } = useDisclosure();

	const getActiveRoute = (routes:any) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i]?.collapse) {
				let collapseActiveRoute:any = getActiveRoute(routes[i].items);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i]?.category) {
				let categoryActiveRoute:any = getActiveRoute(routes[i].items);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				// console.log('window.location.href',window.location.href.split("/"),window.location.href.indexOf(routes[i].path),routes, routes[i]?.layout + routes[i]?.path)
				// if (window.location.href.indexOf(routes[i]?.path) !== -1) {
				// 	// return routes[i].name;
				// 	return routes[i].sidebarProps.displayText
				// }
				// if (window.location.href.indexOf(routes[i]?.path) === routes[i]?.path) {
				// 	// return routes[i].name;
				// 	return routes[i].sidebarProps.displayText
				// }
				const url = new URL(window.location.href);
				const matchRoute = "/scriptcrm/client";
				console.log("url",url.pathname,routes[i]?.path)
				if (routes[i]?.path && url.pathname === routes[i]?.path) {
					console.log("Route matches!");
					return routes[i].sidebarProps.displayText
				}
				if (routes[i].child){
					for(let j=0;j < routes[i].child.length;j++){
						if(url.pathname === routes[i].child[j]?.path){
							return routes[i].child[j].sidebarProps.displayText
						}
					}
				}					
				
				}
				
			
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes:any) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar:any = getActiveNavbar(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar:any = getActiveNavbar(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].secondary;
				}
			}
		}
		return activeNavbar;
	};
	// routes[i].layout +
	const getActiveNavbarText = (routes:any) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar:any = getActiveNavbarText(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar:any = getActiveNavbarText(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].path) !== -1) {
					return routes[i].messageNavbar;
				}
			}
		}
		return activeNavbar;
	};
	document.documentElement.dir = 'ltr';
	// const { onOpen } = useDisclosure();
	document.documentElement.dir = 'ltr';
	const navigate = useNavigate()
	useEffect(()=>{
		// console.log('wh',window.location.pathname==='/')
		if(window.location.pathname==='/'){
		  navigate('/dashboard')
		}
	  },[])
	return (
		<Box>
			<Box>
				{/* <SidebarContext.Provider
					value={{
						toggleSidebar,
						setToggleSidebar
                        routes={routes}
					}}> */}
				<Sidebar routes={appRoutes} {...rest} />
				<Box
					float='right'
					minHeight='100vh'
					height='100%'
					overflow='auto'
					position='relative'
					maxHeight='100%'
					w={{ base: '100%', xl: 'calc( 100% - 240px )' }}
					maxWidth={{ base: '100%', xl: 'calc( 100% - 240px )' }}
					transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
					transitionDuration='.2s, .2s, .35s'
					transitionProperty='top, bottom, width'
					transitionTimingFunction='linear, linear, ease'>
					<Portal>
						<Box>
							<Navbar
								onOpen={onOpen}
								logoText={'Horizon UI Dashboard PRO'}
								brandText={getActiveRoute(appRoutes)}
								secondary={getActiveNavbar(appRoutes)}
								message={getActiveNavbarText(appRoutes)}
								fixed={fixed}
								{...rest}
							/>
						</Box>
					</Portal>
					{/* <Outlet /> */}
					<Box mx='auto' p={{ base: '20px', md: '20px' }} pe='20px' minH='100vh' pt='50px'>
					            {/* <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
									Hi
								</Box> */}
						{/* <DashboardPage /> */}
						<Outlet />
						{/* <DashboardPage /> */}
						{/* <Switch>
									{getRoutes(routes)}
									<Redirect from='/' to='/admin/default' />
								</Switch> */}
					</Box>

					{/* <Routes>
                              {routes(appRoutes,'User')}
                        </Routes> */}
					{/* {getRoute() ? (
							<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
								<Switch>
									{getRoutes(routes)}
									<Redirect from='/' to='/admin/default' />
								</Switch>
							</Box>
						) : null} */}
					<Box>
						{/* <Footer/> */}
						{/* <Footer /> */}
					</Box>
				</Box>
				{/* </SidebarContext.Provider> */}
			</Box>
		</Box>
	)
}

export default ChakraLayout