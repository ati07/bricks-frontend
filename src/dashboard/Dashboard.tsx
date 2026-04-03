import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography, Stack, ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BarCharts from '../../charts/barChart/BarCharts';
import PieCharts from '../../charts/pieCharts/PieCharts';
import { useDispatch } from 'react-redux';
import useCheckToken from '../../hooks/useCheckToken';
import colorConfigs from '../../configs/colorConfigs';
import { startOfMonth, startOfWeek, subMilliseconds } from 'date-fns';
// Date Picker 
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { createStaticRanges, dateFormate, dateToHeading, defaultStaticRanges } from './helpers/DatePicker';
import './dashboard.css'
import { useGetDashboardDataMutation, useGetDataQuery } from '../../redux/ApiHandler/ThemeApi';
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { Theme, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FilterDropDown from '../../formComponents/FilterDropDown/FilterDropDown';
import WorldMapChart from '../../charts/worldMapChart/WorldMapChart';
import VerticalBarChart from '../../charts/verticalBarChart/VerticalBarChart';
import Footer from '../footer/Footer';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: "100%"
}));

const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }
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
function Dashboard() {
    useCheckToken()
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [data, setData] = useState<any>()
    const [client, setClient] = React.useState<string[]>(['All']);
    const [merchants, setMerchants] = React.useState<string[]>(['All']);
    const [dbas, setDbas] = React.useState<string[]>(['All']);

    const [clientOptions, setClientOptions] = React.useState<string[]>(['All']);
    const [merchantsOptions, setMerchantsOptions] = React.useState<string[]>(['All']);
    const [dbasOptions, setDbasOptions] = React.useState<string[]>(['All']);
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const [getDashboardData, { isLoading }] = useGetDashboardDataMutation()
    const [data01, setData01] = useState<any>([
        { name: 'Alerts', value: 0 },
        { name: 'CB', value: 0 },
    ])
    const [barData, setBarData] = useState<any[]>([])
    const [date, setDate] = useState(false);
    const [range, setRange] = useState({ startDate: startOfMonth(new Date()), endDate: new Date(), key: "selection", color: '#F37021' });
    const dispatch = useDispatch();

    // get latest data
    const getData = async () => {
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
        const endDate: any = new Date()
        const time = Math.abs(endDate - startDate)
        const day: any = convertMiliseconds(time, 'd')

        sDate.setDate(sDate.getDate() - (day + 1));
        const current = { start_date: start_date, end_date: dateFormate(endDate,'YYYY-MM-DD') }
        const previous = { start_date: sDate.toISOString().split('T')[0], end_date: startDate.toISOString().split('T')[0] }
        const dateObject = {
            current: JSON.stringify(current),
            previous: JSON.stringify(previous),
            client: client,
            merchants: merchants,
            dbas: dbas
            // slot_count: '7'
        }
        await getDashboardData({
            endpoint: '/getdashboard',
            token: JSON.parse(localStorage.getItem('user') ?? '').token,
            data: dateObject
        }).then((res: any) => {
            if (res.data?.success) {
                console.log('res', res.data?.result)
                setData(res.data?.result)
                setData01([
                    { name: 'Alerts', value: res.data?.result.AvoidedChargebacks },
                    { name: 'CB', value: res.data?.result.TotalCB },
                ])
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
                setClientOptions([...clientOptions, ...res.data?.result?.clients.map((i: any) => i.name)])
                setMerchantsOptions([...merchantsOptions, ...res.data?.result?.merchants.map((i: any) => i.merchant)])
                setDbasOptions([...dbasOptions, ...res.data?.result?.dbas.map((i: any) => i.dba)])
            } else {
                console.log('resaefsefsdfs')

            }
            dispatch(closeLoader())


        }).catch((err: any) => {
            console.log('erre', err)
            dispatch(closeLoader())

        })
    }
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // dispatch(setopenlogin(true))
            navigate('/login')
        } else {
            getData()
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
        // dispatch(openLoader({ open: true }))
        // const startDate: any = new Date(range.startDate)
        // const startdate = startDate.getDate() < 10 ? '0' + startDate.getDate().toString() : startDate.getDate().toString()
        // const startMonth = startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1).toString()
        // const startYear = startDate.getFullYear()
        // const start_date = startYear + "-" + startMonth + '-' + startdate
        // // const previousEndDate = new Date(range.startDate)
        // // console.log('startMonth',startMonth,startDate.getMonth())
        // // previousEndDate.setDate(previousEndDate.getDate() - 1)

        // const sDate = new Date(range.startDate)
        // const endDate: any = new Date(range.endDate)
        // const time = Math.abs(endDate - startDate)

        // const day: any = convertMiliseconds(time, 'd')

        // sDate.setDate(sDate.getDate() - (day + 1));

        // // const dfn = subMilliseconds(startDate,time)
        // // console.log("d.toLocaleString()", day, sDate.toISOString())

        // // dispatch(dispatchDate({ start: start_date, end: endDate.toISOString().split('T')[0] }))
        // // dispatch(dispatchPreviousDate({ start: sDate.toISOString().split('T')[0], end: startDate.toISOString().split('T')[0] }))

        // const current = { start_date: start_date, end_date: endDate.toISOString().split('T')[0] }
        // const previous = { start_date: sDate.toISOString().split('T')[0], end_date: startDate.toISOString().split('T')[0] }
        // const dateObject = {
        //     current: JSON.stringify(current),
        //     previous: JSON.stringify(previous),
        //     // slot_count: '7'
        // }
        // // console.log("current,previous", current, previous)
        // setDateObject(dateObject)
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
    // const handleChange = (event: SelectChangeEvent) => {
    //     setClient(event.target.value as string);

    // };
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
        const endDate: any = new Date(range.endDate)
        const time = Math.abs(endDate - startDate)

        const day: any = convertMiliseconds(time, 'd')

        sDate.setDate(sDate.getDate() - (day + 1));

        // const dfn = subMilliseconds(startDate,time)
        // console.log("d.toLocaleString()", day, sDate.toISOString())

        // dispatch(dispatchDate({ start: start_date, end: endDate.toISOString().split('T')[0] }))
        // dispatch(dispatchPreviousDate({ start: sDate.toISOString().split('T')[0], end: startDate.toISOString().split('T')[0] }))

        const current = { start_date: start_date, end_date: dateFormate(endDate,'YYYY-MM-DD') }
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
                setData01([
                    { name: 'Alerts', value: res.data?.result.AvoidedChargebacks },
                    { name: 'CB', value: res.data?.result.TotalCB },
                ])
            } else {
                console.log('resaefsefsdfs')

            }
            dispatch(closeLoader())


        }).catch((err: any) => {
            console.log('erre', err)
            dispatch(closeLoader())

        })
    }
    // new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number)
    return (
        <Box>
        <Box sx={{ backgroundColor: colorConfigs.panel.bg, height: '175vh', padding: '30px' }}>
            <Box style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                <Typography variant="h5"
                    component="h3"
                    sx={{ color: '#092234', mb: 2, fontWeight: '600' }}> {t('Dashboard')}
                </Typography>

            </Box>
            <Box sx={{
                flexGrow: 1, height: '90%',
                borderRadius: '10px',
                border: 'none',
                width: '100%',
                backgroundColor: colorConfigs.panel.bg
            }} width='100%' >
                <Box style={{ display: 'flex', marginBottom: '25px' }}>
                    <Stack justifyContent={'center'} alignItems={'center'} direction={'row'} gap={1} position={"relative"} marginTop={'-15px'} className="date_section">
                        <Typography style={{
                            fontWeight: 700,
                            color: '#a5a5ab',
                            fontSize: '13px',
                            marginRight: '5px'
                        }}>Date</Typography>
                        <ButtonBase className='day_btn' onClick={() => setDate(!date)}>

                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "1rem" }}>
                                <path d="M15.9286 1.65384H12.5V1.07692C12.5 0.870742 12.3911 0.680289 12.2143 0.577267C12.0375 0.474244 11.8196 0.474244 11.6429 0.577267C11.4661 0.680289 11.3571 0.870749 11.3571 1.07692V1.65384H5.64286V1.07692C5.64286 0.870742 5.53393 0.680289 5.35714 0.577267C5.18036 0.474244 4.9625 0.474244 4.78571 0.577267C4.60893 0.680289 4.5 0.870749 4.5 1.07692V1.65384H1.07143C0.919899 1.65384 0.774488 1.71462 0.667347 1.82279C0.560206 1.93097 0.5 2.07777 0.5 2.23076V14.9231C0.5 15.0761 0.560206 15.2229 0.667347 15.331C0.774488 15.4392 0.919899 15.5 1.07143 15.5H15.9286C16.0801 15.5 16.2255 15.4392 16.3327 15.331C16.4398 15.2229 16.5 15.0761 16.5 14.9231V2.23076C16.5 2.07777 16.4398 1.93097 16.3327 1.82279C16.2255 1.71462 16.0801 1.65384 15.9286 1.65384ZM4.5 2.80769V3.38461C4.5 3.59078 4.60893 3.78124 4.78571 3.88426C4.9625 3.98728 5.18036 3.98728 5.35714 3.88426C5.53393 3.78124 5.64286 3.59077 5.64286 3.38461V2.80769H11.3571V3.38461C11.3571 3.59078 11.4661 3.78124 11.6429 3.88426C11.8196 3.98728 12.0375 3.98728 12.2143 3.88426C12.3911 3.78124 12.5 3.59077 12.5 3.38461V2.80769H15.3571V5.11538H1.64286V2.80769H4.5ZM15.3571 14.3462H1.64286V6.26923H15.3571V14.3462Z" fill="#616771" />
                            </svg>
                            {dateToHeading(range.startDate, range.endDate)}
                        </ButtonBase>
                        <Box position={'absolute'} sx={{ backgroundColor: 'white' }} left="2rem" top={"3.5rem"} zIndex="2" className="calendar_Section ">
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
                                    <ButtonBase onClick={onCancel} className='clear_btn' style={{ backgroundColor: '#ffffff', color: '#F37021', border: '1px solid #F37021' }}>
                                        {t('Clear')}
                                    </ButtonBase>
                                    <ButtonBase onClick={onDateChange} className='done_btn' style={{
                                        backgroundColor: '#F37021',
                                        color: '#ffffff'
                                    }}>
                                        {t('Done')}
                                    </ButtonBase>
                                </Stack>
                            </Box>}
                        </Box>
                    </Stack>
                    {role === 'Admin' && <Stack flexDirection={'row'} gap={2} marginTop={'-15px'} paddingLeft={4} paddingTop={1} paddingBottom={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Typography style={{
                            fontWeight: 700,
                            color: '#a5a5ab',
                            fontSize: '13px',
                            marginRight: '2px'
                        }}>{t('Select Client')}</Typography>
                        <FilterDropDown value={client} options={clientOptions} callBackFunction={handleChange} />
                    </Stack>}
                    <Stack flexDirection={'row'} gap={2} marginTop={'-15px'} paddingLeft={4} paddingTop={1} paddingBottom={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Typography style={{
                            fontWeight: 700,
                            color: '#a5a5ab',
                            fontSize: '13px',
                            marginRight: '2px'
                        }}>{t('Select Merchant')}</Typography>
                        <FilterDropDown value={merchants} options={merchantsOptions} callBackFunction={handleMerchantChange} />

                    </Stack>
                    <Stack flexDirection={'row'} gap={2} marginTop={'-15px'} paddingLeft={4} paddingTop={1} paddingBottom={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Typography style={{
                            fontWeight: 700,
                            color: '#a5a5ab',
                            fontSize: '13px',
                            marginRight: '2px'
                        }}>{t('Merchant Accounts')}</Typography>
                        <FilterDropDown multiple={false} value={dbas} options={dbasOptions} callBackFunction={handleMidChange} />

                    </Stack>
                    <ButtonBase onClick={onSubmit} style={{padding:'5px',minWidth:"70px",textTransform:"uppercase", top: '5px', borderRadius: '5px', width: 'auto', marginLeft: '10px', height: '30px', backgroundColor: '#F37021', color: '#ffffff' }}>
                        {t('Submit')}
                    </ButtonBase>
                </Box>
                <Grid container spacing={2} width='100%' height='350px'>
                    <Grid item xs={6} md={4} width='100%' height='350px'>
                        <Item style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', backgroundColor: '#ff6c24', color: 'white' }}>
                            <Box style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                                margin: '5px', width: '100%'
                            }}>
                                <Typography variant="h5"
                                    component="h2" style={{ color: '#FFFFFF', borderRadius: '5px', fontWeight: '500' }}>{t('Attention Required')}</Typography>
                            </Box>

                            <Box style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                                margin: '5px', width: '100%'
                            }}>
                                <Typography
                                    component="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('Pending Representments')}</Typography>
                                <Box>
                                    <Typography style={{ paddingLeft: '25px', marginBottom: '10px' }}>{t('Open Cases')}: {isLoading ? 'Loading..' : data?.OpenCases}</Typography>
                                    {/* <Typography> </Typography> */}
                                </Box>
                                <Typography style={{ paddingLeft: '25px', marginBottom: '10px' }}>{t('Urgent Action Required')}: {isLoading ? 'Loading..' : data?.UrgentActionRequired}</Typography>
                                <Typography style={{ paddingLeft: '25px', marginBottom: '10px' }}>{t('Potential Revenue Loss')}: ${isLoading ? 'Loading..' : data?.PotentialRevenueLoss}</Typography>
                            </Box>

                            <Box style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
                                margin: '10px', width: '100%'
                            }}>
                                <Typography
                                    component="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('Unattended Cases')}</Typography>
                                <Typography style={{ paddingLeft: '25px', marginBottom: '10px' }}>{t('Total Cases')}: {isLoading ? 'Loading..' : data?.TotalCases}</Typography>
                                <Typography style={{ paddingLeft: '25px', marginBottom: '10px' }}>{t('Percentage')}: {isLoading ? 'Loading..' : data?.Percentage.expired / data?.Percentage.totalStatus}</Typography>
                                <Typography style={{ paddingLeft: '25px', marginBottom: '10px' }}>{t('Lost Revenue')}: ${isLoading ? 'Loading..' : data?.LostRevenueAndFines}</Typography>
                            </Box>

                            {/* <BarCharts /> */}
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={8} width='100%' height='350px' sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Item>
                            <Typography variant="h6"
                                component="h6" style={{ display: 'flex', fontWeight: 'bold', paddingLeft: '10px', color: '#4b4d5f' }}>{t('Performance Chart')}
                            </Typography>
                            <Typography variant="h6"
                                component="h6" style={{
                                    display: 'flex',
                                    // fontWeight: 'bold', 
                                    marginTop: '5px',
                                    marginBottom: '5px',
                                    paddingLeft: '10px',
                                    fontWeight: 700,
                                    color: '#a5a5ab',
                                    fontSize: '13px',
                                }}
                            >{t('Quantity')}
                            </Typography>
                            <BarCharts data={barData} />
                        </Item>
                    </Grid>

                    <Grid item xs={6} md={4} width='100%' height='300px'>
                        <Item style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center' }}>
                            {/* <Typography variant="h5"
                                component="h2" style={{width:'200px',color:'black',backgroundColor:'#F37021',borderRadius:'5px'}}>Attention Required</Typography> */}
                            <Typography variant="h6"
                                component="h6" style={{ fontWeight: 'bold', paddingLeft: '10px', color: '#4b4d5f' }}>{t('Alerts')}
                            </Typography>
                            <Box style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                margin: '5px', width: '100%'
                            }}>

                                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90%', borderBottom: '1px solid #ececec', borderTop: '1px solid #ececec', padding: '5px' }}>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400' }}>{t('Avoided Chargebacks')} </Typography>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400' }}>{isLoading ? 'Loading..' : data?.AvoidedChargebacks}</Typography>
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90%', borderBottom: '1px solid #ececec', padding: '5px' }}>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400' }}>{t('Fines Saved')} </Typography>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400' }}>{isLoading ? 'Loading..' : data?.TotalCases}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="h6"
                                component="h6" style={{ fontWeight: 'bold', paddingLeft: '10px', color: '#4b4d5f' }}>{t('Chargebacks')}
                            </Typography>
                            <Box style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                margin: '5px', width: '100%'
                            }}>

                                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90%', borderBottom: '1px solid #ececec', borderTop: '1px solid #ececec', padding: '5px' }}>

                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>{t('In Process')} </Typography>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>{isLoading ? 'Loading..' : data?.InProcess}</Typography>
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90%', borderBottom: '1px solid #ececec', padding: '5px' }}>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>{t('Projected Savings')} </Typography >
                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>${isLoading ? 'Loading..' : data?.ProjectedSavings}</Typography>
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90%', borderBottom: '1px solid #ececec', padding: '5px' }}>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>{t('Cases Won')} </Typography>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>{isLoading ? 'Loading..' : data?.CasesWon}</Typography>
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90%', borderBottom: '1px solid #ececec', padding: '5px' }}>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>{t('Saved Revenue')} </Typography>
                                    <Typography style={{ color: '#5e6170', fontWeight: '400', fontSize: '12px' }}>${isLoading ? 'Loading..' : data?.SavedRevenue}</Typography>
                                </Box>
                            </Box>

                            {/* <BarCharts /> */}
                        </Item>
                        {/* <Item><PieCharts /></Item> */}
                    </Grid>
                    <Grid item xs={6} md={8} width='100%' height='300px'>
                        <Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <PieCharts data={data02} />
                                <Typography style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', }}>{t('Alerts per MID')}
                                </Typography>
                            </div>

                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <PieCharts data={data02} />
                                <Typography style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center',  }}>{t("CB's per MID")}</Typography>
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={4} width='100%' height='300px'>
                        <Item style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center',height: '400px' }}>
                            <Typography variant="h6"
                                component="h6" style={{ display: 'flex', fontWeight: 'bold', paddingLeft: '10px', color: '#4b4d5f' }}>{t('Top 5 Chargebacks Reason Codes')}
                            </Typography>
                            <VerticalBarChart dataCode={isLoading ? [] : data?.topCbCode}/>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={8} width='100%' height='300px'>
                        <Item style={{ height: '400px' }}>
                            <Typography variant="h6"
                                component="h6" style={{ display: 'flex', fontWeight: 'bold', paddingLeft: '10px', color: '#4b4d5f' }}>{t('Charge backs per Country')}
                            </Typography>
                            <WorldMapChart dataCountry={isLoading ? [] : data?.countryData} />
                        </Item>
                    </Grid>
                </Grid>
                
            </Box>
            
        </Box>
        <Footer/>
        </Box>
    )
}

export default Dashboard