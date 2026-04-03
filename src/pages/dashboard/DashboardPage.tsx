import React, { useEffect, useState } from 'react';
import Chart from '../../charts/lineChart/LineCharts';
import Dashboard from '../../components/dashboard/Dashboard';
import Login from '../../components/LoginComponent/LoginComponent';
import { useNavigate } from 'react-router-dom';
import NewDashboard from '../../components/newDashboard/NewDashboard';
// import ChakraD from '../../components/chakraDashboard/default';

type Props = {};

const DashboardPage = (props: Props) => {
  // const navigate = useNavigate()
  // useEffect(()=>{
  //   if (!localStorage.getItem('user')) {
  //     // dispatch(setopenlogin(true))
  //     navigate('/login')
  //   }
  // },[])
  return (
    <>
    <NewDashboard/>
    {/* <Dashboard/> */}
    {/* <ChakraD/> */}
    
    </>
  );
};

export default DashboardPage;