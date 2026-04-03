import { Box, Fab, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { formComponent } from '../../formComponents/FormComponentsObject'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/app/store'
import { setglobaltempDataKey, setglobaltempDataKeyInsertDataInArray } from '../../redux/features/globaltemp/globaltempSlice'
import dayjs from 'dayjs'
import { useCreateMutation, useGetDataQuery, useGetMutation } from '../../redux/ApiHandler/ThemeApi'
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice';
import { openSnackbar } from '../../redux/snackbar/snackbarSlice';
import useCRUD from '../../hooks/useCRUD'
import { setComments } from '../../redux/features/common/commonSlice'
import CommentCard from './component/CommentCard'
import CloseIcon from '@mui/icons-material/Close';

function ObservationForm({ disable,close, validation, handleCancelDisable }: any) {
    const dispatch = useDispatch()
    const { handleError } = useCRUD()
    const [create] = useCreateMutation()
    const [get, getApi] = useGetMutation()
    const data = useSelector((state: RootState) => state.globaltemp)
    const common = useSelector((state: RootState) => state.commonData)
    const globaltemp = data.data
    const loginData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : ''
    const [index, setIndex] = useState()
    const onClick = async () => {
        dispatch(openLoader({ open: true }))
        // dispatch(setglobaltempDataKeyInsertDataInArray({ key: 'history', value: { date: `${dayjs(new Date()).format('YYYY-MM-DD h:mm A')}`, comment: globaltemp.addObservations } }))
        await create({
            endpoint: '/crm/observation',
            token: JSON.parse(localStorage.getItem('user') ?? '').token,
            data: JSON.stringify(globaltemp)
        }).unwrap()
            .then(async (response: any) => {
                // console.log("respose", response);
                if (response.success) {
                    await get({
                        endpoint: `/crm/observation/${globaltemp.leadId}`,
                    }).unwrap()
                        .then((response: any) => {
                            if (response.success) {
                                dispatch(setComments([...response.result] as any))
                                dispatch(setglobaltempDataKey({ key: 'message', value: '' }))
                            }

                        }).catch((err: any) => {
                            // console.log("resposeerr", err);
                            handleError(err)
                        })
                    dispatch(closeLoader())
                    dispatch(openSnackbar({ open: true, severity: 'success', message: response.message }))

                }

            }).catch((err: any) => {
                // console.log("resposeerr", err);
                handleError(err)

            })
    }
    const addForm = [
        {
            type: 'CustomizedInput',
            props: {
                key: 'message',
                title: "Add Observations",
                type: 'text',
                value: globaltemp.message,
                onClick: onClick
                // error: globaltemp.addObservations === '' && validation,
                // errorMessage: 'add Observations is required'
            }
        },
        // {
        //     type: 'CustomButton',
        //     props: {
        //         key: 'addObservations',
        //         title: "Add",
        //         type: 'text',
        //         onClick: onClick
        //     }
        // }
    ]
    const onCommentReply = () => {

    }
    const addReply = [
        {
            type: 'Input',
            props: {
                key: 'answer',
                title: "Reply",
                type: 'text',
                value: globaltemp.answer,
                // error: globaltemp.addObservations === '' && validation,
                // errorMessage: 'add Observations is required'
            }
        },
        {
            type: 'CustomButton',
            props: {
                key: 'addObservations',
                title: "Submit",
                type: 'text',
                small: true,
                onClick: onCommentReply
            }
        }
    ]

    const onReply = (obj: any, value: any) => {
        console.log('value', obj, value);
        setIndex(value)
    }
    return (
        <Grid container spacing={1} item xs={12} md={12}>
            <Grid item xs={12}>
                <Grid item xs={12} style={{display:'flex',alignItems:'start',justifyContent:'space-between'}}>
                    <Typography style={{ fontSize: '15px', fontWeight: 700, marginBottom: '5px' }}>
                    Lead Observation
                    </Typography>
                    <IconButton size="small" onClick={close} style={{ backgroundColor: "#422afb",width:'30px',height:'30px',marginBottom: '5px' }} aria-label="add">
                        <CloseIcon onClick={close} style={{ color: '#ffffff' }}/>
                    </IconButton>
                </Grid>
                <Box style={{ padding: '10px',paddingTop:'0px', borderRadius: '10px', border: '1px solid #80808038', width: '100%', minHeight: '460px', maxHeight: '460px', backgroundColor: '#c8c7cd' }}>


                    <Box style={{ minHeight: '410px', maxHeight: '410px', width: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                        {
                            common?.comments && common?.comments?.map((obj: any, j: number) => {
                                return <Grid key={j} item xs={12}>
                                    <CommentCard obj={obj} />
                                    {/* <Typography style={{ fontSize: '13px', fontWeight: 500, marginTop: '5px', marginBottom: '5px' }}>{dayjs(obj?.createdAt).format('YYYY-MM-DD h:mm A')}{'____'}<b>{obj?.message}</b>
                                    {(loginData?.role === 'Admin' || loginData?.role === 'CRM_Admin') &&
                                        <span onClick={() => onReply(obj,j)} style={{ fontSize: '10px', fontWeight: 400, marginLeft: '5px', textDecoration: 'underline', cursor: 'pointer' }}>Reply</span>}

                                </Typography> */}


                                    {index === j && <Box style={{ display: 'flex', marginLeft: '100px', marginTop: '10px', marginBottom: '10px' }}>
                                        {
                                            addReply.map((obj: any, j: number) => {
                                                return <Box key={j} style={{ width: j === 0 ? '80%' : '20%', marginLeft: '10px' }}>
                                                    {React.createElement(formComponent?.[obj.type]?.component, { props: obj.props, disable: disable })}
                                                </Box>
                                            })}
                                    </Box>}
                                </Grid>
                            })}


                    </Box>
                    <Box style={{ width: '100%', position: 'sticky', bottom: '5px', display: 'flex', justifyContent: 'space-between', }}>
                        {/* boxShadow: '23px 35px 8px 13px rgba(0, 0, 0, 0.2)' */}
                        {
                            addForm.map((obj: any, j: number) => {
                                return <Box key={j} style={{ width: j == 0 ? '100%' : '10%' }}>
                                    {React.createElement(formComponent[obj.type].component, { props: obj.props, disable: disable })}
                                </Box>
                            })}
                    </Box>
                </Box>
            </Grid>

        </Grid>


    )
}

export default ObservationForm