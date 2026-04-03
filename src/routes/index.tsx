import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { setglobaltempData } from "../redux/features/globaltemp/globaltempSlice";
import appRoutes from "./appRoutes";
import { RouteType } from "./config";
import { RootState } from "../redux/app/store";
// : ReactNode
const generateRoute = (routes: RouteType[],value:any) => {
  // const notAccess = ['client','users']
  // console.log('value',value,routes.filter((route:any)=> {
  //   if(value ==='Admin'){
  //     return route
  //   }else{
  //     console.log("route.state",route.state,notAccess.includes(route.state));
  //     if(notAccess.includes(route.state)){
  //       return null
  //     }else{
  //       return route
  //     }
  //   }    } ))
  // const [role,setRole] = useState('')
  // if (localStorage.getItem('user')) {
  //   setRole(JSON.parse(localStorage.getItem('user')??'').role)
  // }
  return routes.map((route, index) => 
  route.index ? (
    <Route
      index
      path={route.path}
      element={<PageWrapper state={route.state}>
        {route.element}
      </PageWrapper>}
      key={index}
    />
  ) : 
  (
    <Route
      path={route.path}
      element={
        <PageWrapper state={route.child ? undefined : route.state}>
          {route.element}
        </PageWrapper>
      }
      key={index}
    >
      {route.child && (
        generateRoute(route.child,value)
      )}
    </Route>
  )
);
};
// ReactNode
export const routes: any  = generateRoute;