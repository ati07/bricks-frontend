import React, { useEffect, useState } from 'react';
// import Chart from '../../charts/lineChart/LineCharts';
// import Dashboard from '../../components/dashboard/Dashboard';
// import Login from '../../components/LoginComponent/LoginComponent';
import { useNavigate } from 'react-router-dom';
// import ChakraD from '../../components/chakraDashboard/default';
import MiniStatistics from '../../components/common/card/MiniStatistics'
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdLockOpen,
  MdPercent,
  MdPendingActions
} from "react-icons/md";
import IconBox from '../../components/common/icons/IconBox'
import Usa from '../../assets/img/dashboards/usa.png'
import TotalSpent from './components/TotalSpent';
import WeeklyRevenue from './components/WeeklyRevenue';
import DailyTraffic from './components/DailyTraffic';
import PieCard from './components/PieCard';
import CheckTable from './components/CheckTable';
import ComplexTable from './components/ComplexTable'
import {
  columnsDataCheck, columnsDataComplex,
  // columnsTopDataComplex
} from './variables/columnsData';
import tableDataCheck from './variables/tableDataCheck.json'
import tableDataComplex from './variables/tableDataComplex.json'
import Tasks from './components/Tasks'
import useCheckToken from '../../hooks/useCheckToken';
import { useGetDashboardDataMutation, useGetDataQuery } from '../../redux/ApiHandler/ThemeApi';
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice';
import { Theme, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { startOfMonth, startOfWeek, subMilliseconds } from 'date-fns';
// Date Picker 
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { createStaticRanges, dateFormate, dateToHeading, defaultStaticRanges } from './helpers/DatePicker';
import { useDispatch } from 'react-redux';
import WorldMapChart from '../../charts/worldMapChart/WorldMapChart';
import VerticalBarChart from '../../charts/verticalBarChart/VerticalBarChart';
import BarCharts from '../../charts/barChart/BarCharts';
import { ButtonBase, Grid, Stack, Typography } from '@mui/material';
import FilterDropDown from '../../formComponents/FilterDropDown/FilterDropDown';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../App';
import './dashboard.css'
import { StripedDataGrid } from '../client/Client';
import LineCharts from '../../charts/lineChart/LineCharts';
import PieCharts from '../../charts/pieCharts/PieCharts';
import CBperDBA from './components/CBperDBA';
import { openSnackbar } from '../../redux/snackbar/snackbarSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export function convertMiliseconds(miliseconds: number, format: any) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = Math.floor(miliseconds / 1000);
  total_minutes = Math.floor(total_seconds / 60);
  total_hours = Math.floor(total_minutes / 60);
  days = Math.floor(total_hours / 24);

  seconds = total_seconds % 60;
  minutes = total_minutes % 60;
  hours = total_hours % 24;

  switch (format) {
    case 's':
      return total_seconds;
    case 'm':
      return total_minutes;
    case 'h':
      return total_hours;
    case 'd':
      return days;
    default:
      return { day: days, hour: hours, minute: minutes, second: seconds };
  }
};
export const collectFormData = (item: any) => {
  var form_data = new FormData();
  for (var key in item) {
    form_data?.append(key, item[key]);
  }
  return form_data
}
function NewDashboard() {
  const navigate = useNavigate()
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     // dispatch(setopenlogin(true))
  //     navigate('/login')
  //   } else {
  //     // getData()
  //     // setRole(JSON.parse(localStorage.getItem('user') ?? '').role ?? '')
  //     // setRole(JSON.parse(localStorage.getItem('user')??'').role ?? '')
  //   }
  // }, [])

  /// adding Old functionality
  useCheckToken()
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [data, setData] = useState<any>({})
  const [client, setClient] = React.useState<string[]>(['All']);
  const [merchants, setMerchants] = React.useState<string[]>(['All']);
  const [dbas, setDbas] = React.useState<string[]>(['All']);

  const [clientOptions, setClientOptions] = React.useState<string[]>(['All']);
  const [merchantsOptions, setMerchantsOptions] = React.useState<string[]>(['All']);
  const [dbasOptions, setDbasOptions] = React.useState<string[]>(['All']);
  const [role, setRole] = useState('')
  // const navigate = useNavigate()
  const [getDashboardData, { isLoading }] = useGetDashboardDataMutation()
  const [data01, setData01] = useState<any>([
    { name: 'Alerts', value: 0 },
    { name: 'CB', value: 0 },
  ])
  const [barData, setBarData] = useState<any[]>([])
  const [alerts, setAlertsData] = useState<any[]>([])
  const [topCodes, setTopCode] = useState<any[]>([])
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [date, setDate] = useState(false);
  const [range, setRange] = useState({ startDate: startOfMonth(new Date()), endDate: new Date(), key: "selection", color: '#F37021' });
  const dispatch = useDispatch();

  // get latest data
  const getData = async (clients: any) => {
    dispatch(openLoader({ open: true }))
    const startDate: any = startOfMonth(new Date())
    const startdate = startDate.getDate() < 10 ? '0' + startDate.getDate().toString() : startDate.getDate().toString()
    const startMonth = startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1).toString()
    const startYear = startDate.getFullYear()
    const start_date = startYear + "-" + startMonth + '-' + startdate
    // startDate.setDate(startDate.getDate())

    // console.log("startDate", typeof startdate, startMonth, startYear)

    const previousEndDate = startOfMonth(new Date())
    // previousEndDate.setDate(previousEndDate.getDate() - 1)startDate.toISOString().split('T')[0]

    const sDate = startOfMonth(new Date())
    let endDate: any = new Date()
    endDate.setDate(endDate.getDate() + 1);

    const time = Math.abs(endDate - startDate)
    const day: any = convertMiliseconds(time, 'd')

    sDate.setDate(sDate.getDate() - (day + 1));
    const current = { start_date: start_date, end_date: dateFormate(endDate, 'YYYY-MM-DD') }
    const previous = { start_date: sDate.toISOString().split('T')[0], end_date: startDate.toISOString().split('T')[0] }
    const dateObject = {
      current: JSON.stringify(current),
      previous: JSON.stringify(previous),
      client: clients,
      merchants: merchants,
      dbas: dbas
      // slot_count: '7'
    }
    await getDashboardData({
      endpoint: '/getdashboard',
      token: JSON.parse(localStorage.getItem('user') ?? '').token,
      data: dateObject
    }).then((res: any) => {
      console.log('res', res)
      if (res.data?.success) {
        setData(res.data?.result)
        setMonthlyData(res.data?.result.monthlyData)
        setData01([
          { name: 'Alerts', value: res.data?.result.AvoidedChargebacks },
          { name: 'CB', value: res.data?.result.TotalCB },
        ])
        setBarData([
          {
            name: 'Revenue Savings',
            "Amounts in US dollars": isLoading ? 0 : res.data?.result?.RevenueSavings,
          },
          {
            name: 'Avoided Fines',
            "Amounts in US dollars": isLoading ? 0 : res.data?.result?.AvoidedFines,
          },
          {
            name: 'Lost Revenue',
            "Amounts in US dollars": isLoading ? 'Loading..' : res.data?.result?.LostRevenueAndFines,
          },
          {
            name: 'Projected Savings',
            "Amounts in US dollars": isLoading ? 'Loading..' : res.data?.result?.ProjectedSavings,
          }])
        setAlertsData([
          {
            id: 1,
            name: "Avoided Chargebacks",
            value: isLoading ? 0 : res.data?.result?.AvoidedChargebacks
          },
          {
            id: 2,
            name: "Fines Saved",
            value: isLoading ? 0 : res.data?.result?.TotalCases
          },
          {
            id: 3,
            name: "In Progress",
            value: isLoading ? 0 : res.data?.result?.InProcess
          },
          {
            id: 4,
            name: "Projected Savings",
            value: isLoading ? 0 : '$' + res.data?.result?.ProjectedSavings
          },
          {
            id: 5,
            name: "Cases won",
            value: isLoading ? 0 : res.data?.result?.CasesWon
          },
          {
            id: 6,
            name: "Saved Revenue",
            value: isLoading ? 0 : '$' + res.data?.result?.SavedRevenue
          }
        ])
        setTopCode(isLoading ? [] : data?.topCbCode)
        setClientOptions([...clientOptions, ...res.data?.result?.clients.map((i: any) => i.name)])
        setMerchantsOptions([...merchantsOptions, ...res.data?.result?.merchants.map((i: any) => i.merchant)])
        setDbasOptions([...dbasOptions, ...res.data?.result?.dbas.map((i: any) => i.dba)])
      } else {
        dispatch(openSnackbar({ open: true, severity: 'error', message: res.error.data?.message }))
        navigate('/login')
        console.log('resaefsefsdfs')

      }
      dispatch(closeLoader())


    }).catch((err: any) => {
      console.log('erre', err)
      dispatch(openSnackbar({ open: true, severity: 'error', message: err }))
      dispatch(closeLoader())

    })
  }
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      // dispatch(setopenlogin(true))
      navigate('/login')
    } else {
      // let rl = JSON.parse(localStorage.getItem('user') ?? '').role
      // if (rl === 'Client' || rl === 'User') {
      //   setClient([JSON.parse(localStorage.getItem('user') ?? '').client])
      //   getData([JSON.parse(localStorage.getItem('user') ?? '').client])
      // }
      // if(rl ==='User'){
      //   setClient([JSON.parse(localStorage.getItem('user') ?? '').client])
      //   getData([JSON.parse(localStorage.getItem('user') ?? '').client])
      // }
      // if (rl === 'Admin') {
      //   setClient(["All"])
      //   getData(["All"])
      // }
      setRole(JSON.parse(localStorage.getItem('user') ?? '').role ?? '')


      // setRole(JSON.parse(localStorage.getItem('user')??'').role ?? '')
    }
  }, [])


  // console.log('Dasdata', data)

  // Function called on changing value in date picker
  const handleSelect = (ranges: any) => {
    setRange({ ...range, startDate: new Date(ranges.selection.startDate), endDate: new Date(ranges.selection.endDate) })
  }
  // Function called on Done button of date picker
  const onDateChange = async () => {
    
    setDate(false)
  }
  // // Function called on Cancel button of date picker
  const onCancel = () => {
    setRange({ startDate: startOfMonth(new Date()), endDate: new Date(), key: "selection", color: '#F37021' })
    setDate(false)
  }
  // event: SelectChangeEvent<typeof client>
  const handleChange = (value: any) => {
    // const {
    //     target: { value },
    // } = event;
    setClient(value)
    // setClient(
    //     // On autofill we get a stringified value.
    //     typeof value === 'string' ? value.split(',') : value,
    // );
    // dispatch(setglobaltempDataKey({ key: props.key, value: typeof value === 'string' ? value.split(',') : value }))
  };
  const handleMerchantChange = (value: any) => {
    // const {
    //     target: { value },
    // } = event;
    setMerchants(
      // On autofill we get a stringified value.
      value
    );
    // dispatch(setglobaltempDataKey({ key: props.key, value: typeof value === 'string' ? value.split(',') : value }))
  };
  const handleMidChange = (value: any) => {
    setDbas(
      // On autofill we get a stringified value.
      value
    );
    // dispatch(setglobaltempDataKey({ key: props.key, value: typeof value === 'string' ? value.split(',') : value }))
  };

  const onSubmit = async () => {
    dispatch(openLoader({ open: true }))
    const startDate: any = new Date(range.startDate)
    const startdate = startDate.getDate() < 10 ? '0' + startDate.getDate().toString() : startDate.getDate().toString()
    const startMonth = startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1).toString()
    const startYear = startDate.getFullYear()
    const start_date = startYear + "-" + startMonth + '-' + startdate
    // const previousEndDate = new Date(range.startDate)
    // console.log('startMonth',startMonth,startDate.getMonth())
    // previousEndDate.setDate(previousEndDate.getDate() - 1)

    const sDate = new Date(range.startDate)
    let endDate: any = new Date(range.endDate)
    // var date = new Date();

    // add a day
    endDate.setDate(endDate.getDate() + 1);

    const time = Math.abs(endDate - startDate)

    const day: any = convertMiliseconds(time, 'd')

    sDate.setDate(sDate.getDate() - (day + 1));

    // const dfn = subMilliseconds(startDate,time)
    // console.log("d.toLocaleString()", day, sDate.toISOString())

    // dispatch(dispatchDate({ start: start_date, end: endDate.toISOString().split('T')[0] }))
    // dispatch(dispatchPreviousDate({ start: sDate.toISOString().split('T')[0], end: startDate.toISOString().split('T')[0] }))

    const current = { start_date: start_date, end_date: dateFormate(endDate, 'YYYY-MM-DD') }
    const previous = { start_date: sDate.toISOString().split('T')[0], end_date: startDate.toISOString().split('T')[0] }
    const dateObject = {
      current: JSON.stringify(current),
      previous: JSON.stringify(previous),
      // slot_count: '7'
    }
    const sentData = {
      current: JSON.stringify(current),
      previous: JSON.stringify(previous),
      client: client,
      merchants: merchants,
      dbas: dbas
    }
    // Hit Api here --->
    await getDashboardData({
      endpoint: '/getdashboard',
      token: JSON.parse(localStorage.getItem('user') ?? '').token,
      data: sentData
    }).then((res: any) => {
      if (res.data?.success) {
        console.log('res', res.data?.result)
        setData(res.data?.result)
        setMonthlyData(res.data?.result.monthlyData)
        setBarData([
          {
            name: 'Revenue Savings',
            "Amounts in US dollar": isLoading ? 0 : res.data?.result?.RevenueSavings,
          },
          {
            name: 'Avoided Fines',
            "Amounts in US dollar": isLoading ? 0 : res.data?.result?.AvoidedFines,
          },
          {
            name: 'Lost Revenue',
            "Amounts in US dollar": isLoading ? 'Loading..' : res.data?.result?.LostRevenueAndFines,
          },
          {
            name: 'Projected Savings',
            "Amounts in US dollar": isLoading ? 'Loading..' : res.data?.result?.ProjectedSavings,
          }])
        setAlertsData([
          {
            id: 1,
            name: "Avoided Chargebacks",
            value: isLoading ? 0 : res.data?.result?.AvoidedChargebacks
          },
          {
            id: 2,
            name: "Fines Saved",
            value: isLoading ? 0 : res.data?.result?.TotalCases
          },
          {
            id: 3,
            name: "In Progress",
            value: isLoading ? 0 : res.data?.result?.InProcess
          },
          {
            id: 4,
            name: "Projected Savings",
            value: isLoading ? 0 : '$' + res.data?.result?.ProjectedSavings
          },
          {
            id: 5,
            name: "Cases won",
            value: isLoading ? 0 : res.data?.result?.CasesWon
          },
          {
            id: 6,
            name: "Saved Revenue",
            value: isLoading ? 0 : '$' + res.data?.result?.SavedRevenue
          }
        ])
        setData01([
          { name: 'Alerts', value: res.data?.result.AvoidedChargebacks },
          { name: 'CB', value: res.data?.result.TotalCB },
        ])
      } else {
        console.log('resaefsefsdfs')
        dispatch(openSnackbar({ open: true, severity: 'error', message: res.error.data?.message }))
        navigate('/login')

      }
      dispatch(closeLoader())


    }).catch((err: any) => {
      console.log('erre', err)
      dispatch(openSnackbar({ open: true, severity: 'error', message: err }))
      dispatch(closeLoader())

    })
  }

  const columns = [
    { field: 'name', cellClassName: 'super-app-theme--cell', headerName: 'Name', headerClassName: 'data-header', type: 'string', flex: 0.5 },
    { field: 'value', cellClassName: 'super-app-theme--cell', headerName: 'Value', type: 'string', width: 150, headerClassName: 'data-header' }
  ]
 
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* adding old code */}
      <ThemeProvider theme={theme}>
        {/* <Box style={{ display: 'flex', paddingRight: '15px', paddingLeft: '15px', flexDirection: 'column', width: "100%", marginBottom: '15px', marginTop: '15px' }}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6} style={{ display: 'flex', width: '250px', alignItems: 'center' }}>
              <Stack position={"relative"} flexDirection={'row'} marginTop={'-15px'} paddingTop={1} paddingBottom={1} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{
                  fontWeight: 700,
                  color: '#2d3748',
                  fontSize: '0.8rem',
                  letterSpacing: '-0.5px',
                  // fontWeight: 500#a3aed0,
                  width: '50%',
                  // color: '#a5a5ab',
                  // fontSize: '18px',
                  // marginRight: '2px'
                }}>Date Range</Typography>
                <ButtonBase sx={{ width: '50%',height:'25px' }} className='day_btn' onClick={() => setDate(!date)}>

                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1rem" }}>
                    <path d="M15.9286 1.65384H12.5V1.07692C12.5 0.870742 12.3911 0.680289 12.2143 0.577267C12.0375 0.474244 11.8196 0.474244 11.6429 0.577267C11.4661 0.680289 11.3571 0.870749 11.3571 1.07692V1.65384H5.64286V1.07692C5.64286 0.870742 5.53393 0.680289 5.35714 0.577267C5.18036 0.474244 4.9625 0.474244 4.78571 0.577267C4.60893 0.680289 4.5 0.870749 4.5 1.07692V1.65384H1.07143C0.919899 1.65384 0.774488 1.71462 0.667347 1.82279C0.560206 1.93097 0.5 2.07777 0.5 2.23076V14.9231C0.5 15.0761 0.560206 15.2229 0.667347 15.331C0.774488 15.4392 0.919899 15.5 1.07143 15.5H15.9286C16.0801 15.5 16.2255 15.4392 16.3327 15.331C16.4398 15.2229 16.5 15.0761 16.5 14.9231V2.23076C16.5 2.07777 16.4398 1.93097 16.3327 1.82279C16.2255 1.71462 16.0801 1.65384 15.9286 1.65384ZM4.5 2.80769V3.38461C4.5 3.59078 4.60893 3.78124 4.78571 3.88426C4.9625 3.98728 5.18036 3.98728 5.35714 3.88426C5.53393 3.78124 5.64286 3.59077 5.64286 3.38461V2.80769H11.3571V3.38461C11.3571 3.59078 11.4661 3.78124 11.6429 3.88426C11.8196 3.98728 12.0375 3.98728 12.2143 3.88426C12.3911 3.78124 12.5 3.59077 12.5 3.38461V2.80769H15.3571V5.11538H1.64286V2.80769H4.5ZM15.3571 14.3462H1.64286V6.26923H15.3571V14.3462Z" fill="#616771" />
                  </svg>
                  {dateToHeading(range.startDate, range.endDate)}
                </ButtonBase>
                <Box position={'absolute'} sx={{ backgroundColor: 'white' }} left="2rem" top={"3.5rem"} zIndex="99" className="calendar_Section ">
                  {date && <Box>
                    <DateRangePicker
                      ranges={[range]}
                      onChange={handleSelect}
                      inputRanges={[]}
                      direction="horizontal"
                      months={2}
                      moveRangeOnFirstSelection={true}
                      retainEndDateOnFirstSelection={true}
                      renderStaticRangeLabel={createStaticRanges(defaultStaticRanges)}
                    />
                    <Stack direction={'row'} justifyContent={"flex-end"} gap={1} padding={'20px'} className="clear_done-btn">
                      <ButtonBase onClick={onCancel} className='clear_btn' style={{
                        borderRadius: '16px', backgroundColor: '#F37021',
                        color: '#ffffff'
                      }}>
                        {t('Clear')}
                      </ButtonBase>
                      <ButtonBase onClick={onDateChange} className='done_btn' style={{
                        borderRadius: '16px', backgroundColor: '#F37021',
                        color: '#ffffff'
                      }}>
                        {t('Done')}
                      </ButtonBase>
                    </Stack>
                  </Box>}
                </Box>
              </Stack>
            </Grid>
            {role === 'Admin' && <Grid item xs={6} md={6} style={{ display: 'flex', width: '250px' }}>
              <Stack flexDirection={'row'} gap={2} marginTop={'-15px'} paddingTop={1} paddingBottom={1} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{
                  fontWeight: 700,
                  color: '#2d3748',
                  fontSize: '0.8rem',
                  letterSpacing: '-0.5px',
                  width: '50%',
                  // color: '#a5a5ab',
                  // fontSize: '18px',
                  marginRight: '2px'
                }}>{t('Select Client')}</Typography>
                <FilterDropDown value={client} options={clientOptions} callBackFunction={handleChange} />
              </Stack>
            </Grid>}
            <Grid item xs={6} md={6} style={{ display: 'flex', width: '250px' }}>
              <Stack flexDirection={'row'} gap={2} marginTop={'-15px'} paddingTop={1} paddingBottom={1} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{
                  fontWeight: 700,
                  color: '#2d3748',
                  fontSize: '0.8rem',
                  letterSpacing: '-0.5px',
                  // fontWeight: 500,
                  width: '50%',
                  // color: '#a5a5ab',
                  // fontSize: '18px',
                  marginRight: '2px'
                }}>{t('Select Merchant')}</Typography>
                <FilterDropDown value={merchants} options={merchantsOptions} callBackFunction={handleMerchantChange} />

              </Stack>
            </Grid>
            <Grid item xs={6} md={6} style={{ display: 'flex', width: '250px' }}>
              <Stack flexDirection={'row'} gap={2} marginTop={'-15px'} paddingTop={1} paddingBottom={1} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{
                  fontWeight: 700,
                  color: '#2d3748',
                  fontSize: '0.8rem',
                  letterSpacing: '-0.5px',
                  // fontWeight: 500,
                  width: '50%',
                  // color: '#a5a5ab',
                  // fontSize: '18px',
                  marginRight: '2px'
                }}>{t('Merchant Accounts')}</Typography>
                <FilterDropDown multiple={false} value={dbas} options={dbasOptions} callBackFunction={handleMidChange} />

              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} style={{ display: 'flex', width: '250px' }}></Grid>
            <Grid item xs={6} md={6} style={{ display: 'flex', width: '250px', justifyContent: 'right' }}>
              <ButtonBase onClick={onSubmit} style={{
                padding: '5px',
                fontSize: '0.78rem',
                fontWeight: '500',
                // textTransform: "uppercase",
                minWidth: "120px",
                // top: '50px',
                borderRadius: '16px',
                marginLeft: '30px',
                // marginTop: '-5px',
                height: '30px',
                backgroundColor: '#F37021',
                color: '#ffffff',
                boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.18)'
              }}>
                {t('Submit')}
              </ButtonBase>
            </Grid>
          </Grid>

        </Box> */}

        {/* <Dashboard/> */}
        {/* <ChakraD/> */}
        <Box sx={{ width: '100%',marginBottom: '25px', marginTop: '48px' }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4} sm={2} md={4} >
              <Stack gap={1} style={{width:'100%', background: '#fff', borderRadius: '20px', height: '88px', display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection: 'row' }}>
                <Stack style={{ width: '30%',justifyContent: 'center',alignItems:'center'}}>
                  <Stack style={{ width: '45px', alignItems: 'center', height: '45px', borderRadius: '50%', backgroundColor: '#f4f7fe', justifyContent: 'center' }}>

                    <LockOpenIcon style={{ color: '#F37021', fontSize: '20px' }} />
                  </Stack>
                </Stack>
                <Stack gap={1} style={{ width: '70%'}}>
                  <Typography style={{ color: '#A3AED0', fontWeight: '500', lineHeight: '100%', fontSize: '0.8rem' }}>
                    {/* Open Cases */}
                  </Typography>
                  <Typography style={{ color: '#1B2559', fontWeight: '600', fontSize: '1rem' }}>

                    {/* {isLoading ? 'Loading..' : data?.OpenCases} */}
                  </Typography>
                </Stack>
              </Stack>
              {/* <Item>1</Item> */}
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <Stack gap={1} style={{width:'100%', background: '#fff', borderRadius: '20px', height: '88px', display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection: 'row' }}>
              <Stack style={{ width: '30%',justifyContent: 'center',alignItems:'center'}}>
                <Stack style={{ width: '45px', alignItems: 'center', height: '45px', borderRadius: '50%', backgroundColor: '#f4f7fe', justifyContent: 'center' }}>

                  <PendingActionsIcon style={{ color: '#F37021', fontSize: '20px' }} />
                  {/* <Icon w='20px' h='20px' as={MdLockOpen} color={brandColor} /> */}
                </Stack>
              </Stack>
                <Stack gap={1} style={{ width: '70%'}}>
                  <Typography style={{ color: '#A3AED0', fontWeight: '500', lineHeight: '100%', fontSize: '0.8rem' }}>
                    {/* Urgent Action Required */}
                  </Typography>
                  <Typography style={{ color: '#1B2559', fontWeight: '600', fontSize: '1rem' }}>
                    {/* {isLoading ? 'Loading..' : data?.UrgentActionRequired} */}
                    {/* {isLoading ? 'Loading..' : data?.OpenCases} */}
                  </Typography>
                </Stack>
              </Stack>
              {/* <Item>2</Item> */}
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <Stack gap={1} style={{width:'100%', background: '#fff', borderRadius: '20px', height: '88px', display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection: 'row', }}>
                <Stack style={{ width: '30%',justifyContent: 'center',alignItems:'center'}}>
                <Stack style={{ width: '45px', alignItems: 'center', height: '45px', borderRadius: '50%', backgroundColor: '#f4f7fe', justifyContent: 'center' }}>


                  <AttachMoneyIcon style={{ color: '#F37021', fontSize: '20px' }} />
                  {/* <Icon w='20px' h='20px' as={MdLockOpen} color={brandColor} /> */}
                </Stack>
                </Stack>
                <Stack gap={1} style={{width:'70%'}}>
                
                  <Typography style={{ color: '#A3AED0', fontWeight: '500', lineHeight: '100%', fontSize: '0.8rem' }}>
                    {/* Lost Revenue */}
                  </Typography>
                  <Typography style={{ color: '#1B2559', fontWeight: '600', fontSize: '1rem' }}>
                    {/* {isLoading ? 'Loading..' : '$' + data?.LostRevenueAndFines} */}
                    {/* {isLoading ? 'Loading..' : data?.OpenCases} */}
                  </Typography>
                </Stack>
              </Stack>
              {/* <Item>3</Item> */}
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <Stack gap={1} style={{width:'100%', background: '#fff', borderRadius: '20px', height: '88px', display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection: 'row' }}>
                <Stack style={{ width: '30%',justifyContent: 'center',alignItems:'center'}}>
                <Stack style={{ width: '45px', alignItems: 'center', height: '45px', borderRadius: '50%', backgroundColor: '#f4f7fe', justifyContent: 'center' }}>

                  <AttachMoneyIcon style={{ color: '#F37021', fontSize: '20px' }} />
                  {/* <Icon w='20px' h='20px' as={MdLockOpen} color={brandColor} /> */}
                </Stack>
                </Stack>
                <Stack gap={1} style={{width:'70%'}}>
                  <Typography style={{ color: '#A3AED0', fontWeight: '500', lineHeight: '100%', fontSize: '0.8rem' }}>
                    {/* Potential Revenue Loss */}
                    </Typography>
                  <Typography style={{ color: '#1B2559', fontWeight: '600', fontSize: '1rem' }}>
                    {/* {isLoading ? 'Loading..' : '$' + data?.PotentialRevenueLoss} */}

                    {/* {isLoading ? 'Loading..' : data?.OpenCases} */}
                  </Typography>
                </Stack>
              </Stack>
              {/* <Item>4</Item> */}
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <Stack gap={1} style={{width:'100%', background: '#fff', borderRadius: '20px', height: '88px', display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection: 'row' }}>
                <Stack style={{width: '30%',justifyContent: 'center',alignItems:'center'}}>
                <Stack style={{ width: '45px', alignItems: 'center', height: '45px', borderRadius: '50%', backgroundColor: '#f4f7fe', justifyContent: 'center' }}>

                  <AddTaskIcon  style={{color:'#F37021',fontSize:'20px'}}/>
                  {/* <IconBox
                    w='45px'
                    h='45px'
                    bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                    icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
                  /> */}
                  {/* <Icon w='20px' h='20px' as={MdLockOpen} color={brandColor} /> */}
                </Stack>
                </Stack>
                <Stack gap={1} style={{width:'70%'}}>
                  <Typography style={{ color: '#A3AED0', fontWeight: '500', lineHeight: '100%', fontSize: '0.8rem' }}>
                    {/* Total Closed Cases */}
                    </Typography>
                  <Typography style={{ color: '#1B2559', fontWeight: '600', fontSize: '1rem' }}>
                    {/* {isLoading ? 'Loading..' : data?.TotalCases} */}
                    {/* {isLoading ? 'Loading..' : data?.OpenCases} */}
                  </Typography>
                </Stack>
              </Stack>
              {/* <Item>5</Item> */}
            </Grid>
            <Grid item xs={4} sm={2} md={4}>
              <Stack gap={1} style={{width:'100%', background: '#fff', borderRadius: '20px', height: '88px', display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection: 'row' }}>
                <Stack style={{width: '30%',justifyContent: 'center',alignItems:'center'}}>
                <Stack style={{ width: '45px', alignItems: 'center', height: '45px', borderRadius: '50%', backgroundColor: '#f4f7fe', justifyContent: 'center' }}>

                  <PercentIcon style={{ color: '#F37021', fontSize: '20px' }} />
                  {/* <Icon w='20px' h='20px' as={MdLockOpen} color={brandColor} /> */}
                </Stack>
                </Stack>
                <Stack gap={1} style={{width:'70%'}}>
                  <Typography style={{ color: '#A3AED0', fontWeight: '500', lineHeight: '100%', fontSize: '0.8rem' }}>
                    {/* Percentage */}
                  </Typography>
                  <Typography style={{ color: '#1B2559', fontWeight: '600', fontSize: '1rem' }}>
                    {/* {isLoading ? 'Loading..' : ((data?.Percentage?.expired / data?.Percentage?.totalStatus) * 100).toFixed(0)} */}
                    {/* {isLoading ? 'Loading..' : data?.OpenCases} */}
                  </Typography>
                </Stack>
              </Stack>
              {/* <Item>5</Item> */}
            </Grid>
          </Grid>
        </Box>
        
      </ThemeProvider>
      

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>

        <LineCharts data={isLoading ? [] : monthlyData} />
        <BarCharts data={barData} />

      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* hicolumnsDataComplex */}
        <ThemeProvider theme={theme}>
          <div style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
            borderRadius: '20px',
            minWidth: '0px',
            wordWrap: 'break-word',
            background: '#ffffff',
            backgroundClip: 'border-box',
          }}>
            <Box sx={{
              height: '350px', overflow: 'auto', width: '100%', padding: '5px',
              '& .super-app-theme--cell': {
                // backgroundColor: 'rgba(224, 183, 60, 0.55)',
                // color: '#1a3e72',
                // fontWeight: '600',
                height: '40px',
                border: 'none !important',
                display: 'flex',
                // justifyContent: 'center !important'
              },
            }}>

              {alerts.length > 0 ?
                <StripedDataGrid
                  getRowHeight={() => 'auto'}
                  isRowSelectable={() => false}
                  hideFooterPagination={true}
                  disableColumnFilter
                  // autoHeight
                  density='compact'
                  columns={columns}
                  // rows={alerts.length > 0 ? alerts : alerts ?? []}
                  rows={alerts}
                  slotProps={{

                  }}

                  sx={{
                    '&, [class^=MuiDataGrid]': { border: 'none' },
                    fontFamily: 'DM Sans',
                    display: 'flex', justifyContent: 'center', alignItem: 'center',
                    color: "#1b2559",
                    fontSize: '12px',
                    fontWeight: '700',
                    '& .data-header': {
                      // backgroundColor: '#233044#616771',
                      borderBottom: '1px solid',
                      textTransform: 'uppercase',
                      color: '#a0aec0',
                      fontSize: '13px',
                      fontWeight: '700'
                    },
                  }} />
                : null}
            </Box></div>
        </ThemeProvider>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>

          {!isLoading && <PieCharts data={data} />}
          {!isLoading && <CBperDBA data={data?.topFiveDBAData} />}

        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>

        <VerticalBarChart dataCode={isLoading ? [] : data?.topCbCode} />

        <WorldMapChart dataCountry={isLoading ? [] : data?.countryData} />


      </SimpleGrid>
    </Box>
  )
}

export default NewDashboard