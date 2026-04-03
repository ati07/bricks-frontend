import React, { memo, useEffect, useMemo } from 'react'
import { Avatar, Box, Stack, Typography, Toolbar, ButtonBase } from '@mui/material';
import moment from 'moment';
// import ClientActions from './ClientActions';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowId,
    // GridColumns,
    GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { closeDialogBox, openDialogBox } from '../../redux/dialogBox/dialogboxSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { initialRows } from './clientdefaultData';
import { useCreateMutation, useGetDataQuery, useUpdateMutation, useDeleteRowMutation } from '../../redux/ApiHandler/ThemeApi';
import { RootState } from '../../redux/app/store';
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice';
import { openSnackbar } from '../../redux/snackbar/snackbarSlice';
import { setglobaltempData, setglobaltempDataKey } from '../../redux/features/globaltemp/globaltempSlice';
import useCheckToken from '../../hooks/useCheckToken'
import colorConfigs from '../../configs/colorConfigs';
import ProviderForm from './ProviderForm';
// import './Client.css'
import { useTranslation } from 'react-i18next';
import { alpha, styled } from '@mui/material/styles';
import { gridClasses } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Footer from '../footer/Footer';
import Tooltip,{ TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { StripedDataGrid } from '../common/helperComponent';

function Provider() {
    useCheckToken()
        const { t, i18n } = useTranslation();
        const navigate = useNavigate()
        // const [rows, setRows] = React.useState<Row[]>(initialRows);
        const [open, setOpen] = React.useState(false);
        const [create] = useCreateMutation()
        const [update] = useUpdateMutation()
        const [deleteRow] = useDeleteRowMutation()
        const { refetch } = useGetDataQuery('/client')
        // const login = useSelector((state:RootState)=>state.login)
        const globaltemp = useSelector((state: RootState) => state.globaltemp)
        const common = useSelector((state: RootState) => state.commonData)
        const [disable, setDisable] = React.useState(false);
        const [
            filterButtonEl,
            setFilterButtonEl
        ] = React.useState<HTMLButtonElement | null>(null);
        const [id, setId] = React.useState<any>('')
        const dispatch = useDispatch()
        // const [ClientData, setClientData] = React.useState({
        //     merchant: "",
        //     client: '',
        //     descriptor: '',
        //     rdrtier: '',
        //     mcc: '',
        //     email: '',
        //     caid: '',
        //     midlive: '',
        //     acquirer: '',
        //     rdrstatus: '',
        //     bin: '',
        //     mid: 0,
        //     etocastatus: '',
        //     ethocalimit: ''
        // })
        // console.log('merchant')
        const handleClickOpen = () => {
            setOpen(true);
            const data: any = {
                merchant: [],
                name: '',
                phone_number: '',
                email: '',
                company: '',
            }
            dispatch(setglobaltempData(data))
            // for( let key in data ){
            //     dispatch(setglobaltempDataKey({key:key, value:data[key]}))
            // }
        };
    
        const handleClose = () => {
            setOpen(false);
            dispatch(closeDialogBox())
            dispatch(setglobaltempData({}))
            setDisable(false)
        };
        const handleDelete = async (id: GridRowId) => {
            dispatch(openLoader({ open: true }))
    
            await deleteRow({
                endpoint: `/client/${id}`,
                token: JSON.parse(localStorage.getItem('user') ?? '').token,
            }).then((response: any) => {
                if (response.data.success) {
                    console.log("respose", response);
                    // dispatch(setloginData(response.data.result))
                    refetch()
                    dispatch(closeLoader())
                    dispatch(openSnackbar({ open: true, severity: 'success', message: "Client is Deleted" }))
    
                } else {
                    dispatch(openSnackbar({ open: true, severity: 'error', message: "Something went wrong" }))
                    dispatch(closeLoader())
                }
            }).catch((err: any) => {
                dispatch(openSnackbar({ open: true, severity: 'error', message: err.message }))
                dispatch(closeLoader())
            })
            dispatch(closeDialogBox())
        }
        const deleteUser = React.useCallback(
            (id: GridRowId) => () => {
                dispatch(openDialogBox({
                    open: true,
                    message: "Are you sure, you want to delete this Client?",
                    btnPrimaryText: "Confirm Delete",
                    btnSecondaryText: "No",
                    primaryAction: () => handleDelete(id),
                    secondaryAction: handleClose
                }))
            },
            [],
        );
        const edit = React.useCallback((id: GridRowId) => () => {
            // console.log("id", id,common);
            const singleRow: any = common.data.filter((r: any) => r.id === id)[0]
            // console.log("singleRow", singleRow,common.data);
            const data: any = {
                merchant: singleRow.merchant,
                name: singleRow.name,
                phone_number: singleRow.phone_number,
                email: singleRow.email,
                company: singleRow.company,
            }
            for (let key in data) {
                dispatch(setglobaltempDataKey({ key: key, value: data[key] }))
            }
            setOpen(true)
            setId(id)
            // setRows((prevRows) => {
            //     const rowToDuplicate = prevRows.find((row) => row.id === id)!;
    
            //     return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            // });
        }, [common])
    
        const view = React.useCallback((id: GridRowId) => () => {
    
            const singleRow: any = common.data.filter((r: any) => r.id === id)[0]
            // console.log("singleRow", singleRow);/
            const data: any = {
                merchant: singleRow.merchant,
                name: singleRow.name,
                phone_number: singleRow.phone_number,
                email: singleRow.email,
                company: singleRow.company,
    
            }
            for (let key in data) {
                dispatch(setglobaltempDataKey({ key: key, value: data[key] }))
            }
            setOpen(true)
            setId(id)
            setDisable(true)
        }, [common])
        const columns = React.useMemo<any>(
            () => [
                {
                    field: 'createdAt',flex:0.17, headerName: 'Created', type: 'string', width: 150, headerClassName: 'data-header',
                    renderHeader: (params: any) => (<strong>
                        {params.colDef.headerName}
                    </strong>),
                    renderCell: (props: any) => <div>{props.value.split('T')[0]}</div>
                },
                { field: 'snCode',flex:0.17, headerName: 'Código SN', type: 'string', width: 250, headerClassName: 'data-header' },

                { field: 'project',flex:0.17, headerName: 'Proyecto', type: 'string', width: 250, headerClassName: 'data-header' },
                { field: 'snName',flex:0.17, headerName: 'Nombre SN', type: 'string', width: 250, headerClassName: 'data-header' },

                { field: 'name',flex:0.17, headerName: 'Name', type: 'string', width: 220, headerClassName: 'data-header' },
                
                { field: 'email',flex:0.17, headerName: 'Email', type: 'string', width: 300, headerClassName: 'data-header' },
                // { field: 'phone_number', headerName: 'Phone Number', type: 'string', width: 150, headerClassName: 'data-header' },
                {
                    field: 'actions',
                    flex:0.17,
                    headerName: 'Actions',
                    type: 'actions',
                    width: 220,
                    headerClassName: 'data-header',
                    getActions: (params: any) => [
                        <GridActionsCellItem
                            icon={<RemoveRedEyeOutlinedIcon sx={{fontSize:'12px'}}/>}
                            label="View"
                            onClick={view(params.id)}
                        // showInMenu
                        />,
    
                        <GridActionsCellItem
                            icon={<EditIcon sx={{fontSize:'12px'}}/>}
                            label="Edit"
                            onClick={edit(params.id)}
                        // showInMenu
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon sx={{fontSize:'12px'}}/>}
                            label="Delete"
                            onClick={deleteUser(params.id)}
                        />
    
                    ]
                }
            ],
            [deleteUser, edit, view]
        )
    
        const Save = async () => {
            dispatch(openLoader({ open: true }))
            if (id === '') {
    
                await create({
                    endpoint: '/client',
                    token: JSON.parse(localStorage.getItem('user') ?? '').token,
                    data: JSON.stringify(globaltemp.data)
                }).then((response: any) => {
                    if (response.data.success) {
                        // console.log("respose",response);
                        // dispatch(setloginData(response.data.result))
                        refetch()
                        dispatch(closeLoader())
                        dispatch(openSnackbar({ open: true, severity: 'success', message: "Merchant is created" }))
    
                    } else {
                        dispatch(openSnackbar({ open: true, severity: 'error', message: response.error.data.message }))
                        navigate('/login')
                        localStorage.removeItem('user')
                        dispatch(closeLoader())
                    }
    
                }).catch((err: any) => {
                    dispatch(openSnackbar({ open: true, severity: 'error', message: err.message }))
                    dispatch(closeLoader())
                })
    
            } else {
                let index: any;
                await update({
                    endpoint: `/client/${id}`,
                    token: JSON.parse(localStorage.getItem('user') ?? '').token,
                    data: JSON.stringify(globaltemp.data)
                }).then((response: any) => {
                    if (response.data.success) {
                        console.log("respose", response);
                        // dispatch(setloginData(response.data.result))
                        refetch()
                        dispatch(closeLoader())
                        dispatch(openSnackbar({ open: true, severity: 'success', message: "Merchant is updated" }))
    
    
                    } else {
                        dispatch(openSnackbar({ open: true, severity: 'error', message: response.error.data.message }))
                        navigate('/login')
                        localStorage.removeItem('user')
                        dispatch(closeLoader())
                    }
    
                }).catch((err: any) => {
                    dispatch(openSnackbar({ open: true, severity: 'error', message: err.message }))
                    dispatch(closeLoader())
                })
            }
            setOpen(false);
            setId('')
    
        }
  return (
    <Stack paddingTop={{ xs: "130px", sm: '130px', md: '80px',xl:'80px' }} >                
                <Box
                    sx={{
                        height: 'auto',
                        borderRadius: '16px',
                        border: '1px solid #EBEFFA',
                        width: '100%',
                        backgroundColor: 'white',
                        marginTop:'10px'
                    }}
                >
                    <Stack sx={{ display: 'flex', justifyContent: 'right', flexDirection: 'row', 
                marginTop: '20px',marginBottom: '20px',marginRight: '20px' }}>
                    <Box>
                        <ButtonBase style={{
                            fontSize: '0.78rem',
                            fontWeight: "500",
                            // textTransform: "uppercase", 
                            borderRadius: '16px',
                            width: '180px',
                            height: '30px',
                            backgroundColor: '#F37021',
                            padding: '5px',
                            color: '#ffffff' 
                            }} onClick={handleClickOpen}>
                        {<AddIcon style={{fontSize:'20px'}} />}{t('Agregar Proveedores')}
                        </ButtonBase>
                    </Box>
                </Stack>
                    <Box sx={{
                        height: 550, overflow: 'auto', width: '100%', padding: '5px',
                        '& .super-app-theme--cell': {
                            // backgroundColor: 'rgba(224, 183, 60, 0.55)',
                            // color: '#1a3e72',
                            // fontWeight: '600',
                            height:'40px',
                            border:'none !important',
                            display: 'flex',
                            justifyContent: 'center !important'
                          },
                    }}>
                        <StripedDataGrid
                            getRowHeight={() => 'auto'}
                            isRowSelectable={()=>false}
                            // autoHeight 
                            density='compact'
                            columns={columns} rows={common.data ?? []}
                            // slots={{
                            //     // toolbar: GridToolbar,
                            //     toolbar:CustomToolbar
                            // }}
                            // components={{
                            //     Toolbar: CustomToolbar
                            // }}
                            sx={{
                                '&, [class^=MuiDataGrid]': { border: 'none' },
                            fontFamily: 'DM Sans',
                            display: 'flex', justifyContent: 'center', alignItem: 'center', 
                            color: "#1b2559", 
                            fontSize: '11px',
                            fontWeight:'700',
                            '& .data-header': {
                                // backgroundColor: '#233044#616771',
                                borderBottom: '1px solid',
                                textTransform:'uppercase',
                                color: '#a0aec0',
                                fontSize: '11px',
                                fontWeight:'700'
                            },
                            }}
                            // getRowClassName={(params: any) =>
                            //     params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            // }
                        />
                    </Box>
                </Box>
                <Dialog
                    open={open}
                    disableScrollLock={true}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <ProviderForm disable={disable} />

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" style={{borderRadius: '16px', backgroundColor: '#F37021',
                                color: '#ffffff',fontSize:'0.7rem', }} className='add_btn' onClick={handleClose}>{t('Cancel')}</Button>
                        {
                            !disable && <Button variant="contained" style={{borderRadius: '16px', backgroundColor: '#F37021',
                            color: '#ffffff',fontSize:'0.7rem', }} onClick={Save} endIcon={<SendIcon />}>
                                {t('Save')}
                            </Button>
                        }
                    </DialogActions>
                </Dialog>

            {/* </Box> */}
            <Footer />
        </Stack>
  )
}

export default Provider