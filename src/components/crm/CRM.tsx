import React from 'react'
import { Box, Stack,  ButtonBase, Tooltip} from '@mui/material';
import {
    GridActionsCellItem,
    GridRowId,
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
import { useCreateMutation, useGetDataQuery, useUpdateMutation, useDeleteRowMutation, useGetMutation, useUploadFileMutation } from '../../redux/ApiHandler/ThemeApi';
import { RootState } from '../../redux/app/store';
import { closeLoader, openLoader } from '../../redux/loader/loaderSlice';
import { openSnackbar } from '../../redux/snackbar/snackbarSlice';
import { setglobaltempData, setglobaltempDataKey } from '../../redux/features/globaltemp/globaltempSlice';
import useCheckToken from '../../hooks/useCheckToken'
import CRMForm from './CRMForm';
// import './Client.css'
import { useTranslation } from 'react-i18next';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import { validateCRMForm } from '../validatehelper.js'
import { CustomNoRowsOverlay, StripedDataGrid, convertToTitleCase } from '../common/helperComponent';
import useCRUD from '../../hooks/useCRUD';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './crm.css'
import ObservationForm from './ObservationForm.js';
import { setComments } from '../../redux/features/common/commonSlice.js';
import CommentIcon from '@mui/icons-material/Comment';

export const returnData = (singleRow: any) => {
    const data: any = {
        company: singleRow?.company,
        website: singleRow?.website,
        mcc: singleRow?.mcc,
        rdrTier: singleRow?.rdrTier,
        status: singleRow?.status,
        rdrTier1Price: singleRow?.rdrTier1Price,
        rdrTier2Price: singleRow?.rdrTier2Price,
        rdrTier3Price: singleRow?.rdrTier3Price,
        ethocaPrice: singleRow?.ethocaPrice,
        monthlyMinimumFees: singleRow?.monthlyMinimumFees,
        paymentTerms: singleRow?.paymentTerms,
        integrationFee: singleRow?.integrationFee,
        dueDate: singleRow?.dueDate,
        contacts: singleRow?.contacts,
        addObservation: singleRow?.addObservation,
        history: singleRow?.history,
        contractFile: singleRow?.contractFile
    }
    return data
}

function CRM() {
    useCheckToken()
    const { handleError } = useCRUD()
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [isError, setError] = React.useState(false);
    const [addMerchant, setAddMerchant] = React.useState(false);
    const [create] = useCreateMutation()
    const [update] = useUpdateMutation()
    const [deleteRow] = useDeleteRowMutation()
    const [get, { ...getApi }] = useGetMutation()
    const { refetch, isLoading } = useGetDataQuery('/crm')
    const globaltemp = useSelector((state: RootState) => state.globaltemp)
    const common = useSelector((state: RootState) => state.commonData)
    const [disable, setDisable] = React.useState(false);
    const [showM, setShowM] = React.useState(false);
    const [clientMerchants, setClientMerchants] = React.useState<string[]>([]);
    const [id, setId] = React.useState<any>('')
    const [IsViewPDF, setViewPDF] = React.useState(false)
    const [url, setURL] = React.useState('')
    const [clientDisable, setClientDisable] = React.useState(false)
    const [cancelDisable, setCancelDisable] = React.useState(false)
    const [add, setAdd] = React.useState(false)
    const [uploadFile] = useUploadFileMutation()
    const [isObservation, setObservation] = React.useState(false)
    const dispatch = useDispatch()

    const viewObservation = React.useCallback(async (params: any) => {
        dispatch(openLoader({ open: true }))
        const data: any = {
            leadId: params.id,
            message: ''
        }
        dispatch(setglobaltempData(data))

        await get({
            endpoint: `/crm/observation/${params.id}`,
        }).unwrap()
            .then((response: any) => {
                if (response.success) {
                    // console.log()
                    dispatch(setComments([...response.result] as any))
                    dispatch(closeLoader())
                    // dispatch(openSnackbar({ open: true, severity: 'success', message: response.message }))
                    setObservation(true)
                    setOpen(true);
                }

            }).catch((err: any) => {
                // console.log("resposeerr", err);
                handleError(err)

            })
        dispatch(closeLoader())
    }, [common])

    // console.log('merchant')
    const handleClickOpen = () => {
        setOpen(true);
        setAdd(true)
        const data: any = {
            company: '',
            website: '',
            mcc: '',
            rdrTier: '',
            status: '',
            dueDate: '',
            rdrTier1Price: "",
            rdrTier2Price: "",
            rdrTier3Price: "",
            ethocaPrice: "",
            monthlyMinimumFees: "",
            paymentTerms: "",
            integrationFee: "",
            contacts: [
                {
                    check: true,
                    contact: '',
                    email: '',
                    im: '',
                    user: '',
                    position: ''
                },
                // {
                //     check: false,
                //     contact: '',
                //     email: '',
                //     im: '',
                //     user: '',
                //     position: ''
                // },
                // {
                //     check: false,
                //     contact: '',
                //     email: '',
                //     im: '',
                //     user: '',
                //     position: ''
                // },
                // {
                //     check: false,
                //     contact: '',
                //     email: '',
                //     im: '',
                //     user: '',
                //     position: ''
                // }
            ],
            addObservation: '',
            history: [],
            contractFile: [{
                title: '',
                file: ''
            }]
        }
        dispatch(setglobaltempData(data))
    };
    const handleClose = async () => {
        setViewPDF(false)
        setOpen(false);
        setError(false)
        dispatch(closeDialogBox())
        dispatch(setglobaltempData({}))
        setDisable(false)
        setAddMerchant(false)
        setShowM(false)
        setId('')
        setClientMerchants([])
        setCancelDisable(false)
        setObservation(false)
        if (add && globaltemp.data.contractFile?.[0]?.file !== '') {
            await create({
                endpoint: '/upload-file/delete-file',
                token: JSON.parse(localStorage.getItem('user') ?? '').token,
                data: JSON.stringify({ title: globaltemp.data.contractFile?.[0]?.title, file: globaltemp.data.contractFile?.[0]?.file })
                // data:formData
            })
                .unwrap()
                .then((res: any) => {
                    console.log('res', res)
                    setAdd(false)
                }).catch((err: any) => {
                    // console.log("resposeerr", err);
                    setAdd(false)
                })
        }
    };
    const handleDelete = async (id: GridRowId) => {
        dispatch(openLoader({ open: true }))

        await deleteRow({
            endpoint: `/crm/${id}`,
            token: JSON.parse(localStorage.getItem('user') ?? '').token,
        })
            .unwrap()
            .then((response: any) => {
                if (response.success) {
                    refetch()
                    dispatch(openSnackbar({ open: true, severity: 'success', message: response.message }))

                } else {
                    dispatch(openSnackbar({ open: true, severity: 'error', message: "Something went wrong" }))
                }
            }).catch((err: any) => {
                handleError(err)

            })
        dispatch(closeLoader())
        dispatch(closeDialogBox())
    }
    const deleteUser = React.useCallback(
        (id: GridRowId, company: any) => () => {
            // console.log('coma',company)
            dispatch(openDialogBox({
                open: true,
                message: `Are you sure, you want to delete ${company} ?`,
                // note: '',
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
        const data = returnData(singleRow)
        for (let key in data) {
            dispatch(setglobaltempDataKey({ key: key, value: data[key] }))
        }
        setOpen(true)
        setId(id)
        // set
    }, [common])

    const view = React.useCallback((id: GridRowId) => () => {

        const singleRow: any = common.data.filter((r: any) => r.id === id)[0]
        // console.log("singleRow", singleRow);/
        const data = returnData(singleRow)
        for (let key in data) {
            dispatch(setglobaltempDataKey({ key: key, value: data[key] }))
        }
        setOpen(true)
        setId(id)
        setDisable(true)
    }, [common])
    const viewPDF = async (params: any) => {

        setViewPDF(true)
        setOpen(true)
        if (params.row.contractFile?.[0]?.file !== '') {
            setURL(`${import.meta.env.VITE_REACT_API_URL + '/files/' + String(params.row.contractFile?.[0]?.file)}`)
        } else {
            setURL('')
        }
    }
    const columns = React.useMemo<any>(
        () => [

            { field: 'company', hideSortIcons: true, flex: 0.15, headerName: t('Client'), cellClassName: 'super-app-theme--cell', type: 'string', width: 250, headerClassName: 'data-header', renderCell: (props: any) => <div>{convertToTitleCase(props?.value)}</div> },
            {
                field: 'contact', hideSortIcons: true, flex: 0.13, headerName: t('Contact'), type: 'string', cellClassName: 'super-app-theme--cell', width: 220, headerClassName: 'data-header',
                renderCell: (props: any) => <div>{convertToTitleCase(props?.value)}</div>
            },
            { field: 'position', hideSortIcons: true, flex: 0.11, headerName: t('Position'), type: 'string', cellClassName: 'super-app-theme--cell', width: 220, headerClassName: 'data-header', renderCell: (props: any) => <div>{convertToTitleCase(props?.value)}</div> },

            { field: 'status', hideSortIcons: true, flex: 0.15, headerName: t('Status'), type: 'string', width: 220, headerClassName: 'data-header', renderCell: (props: any) => <div>{convertToTitleCase(props?.value)}</div> },
            { field: 'email', hideSortIcons: true, flex: 0.17, headerName: t('Email'), type: 'string', cellClassName: 'super-app-theme--cell', width: 300, headerClassName: 'data-header', renderCell: (props: any) => <div>{convertToTitleCase(props?.value)}</div> },

            {
                field: 'createdAt', hideSortIcons: true, flex: 0.08, headerName: t('Created'), cellClassName: 'super-app-theme--cell', type: 'string', width: 150, headerClassName: 'data-header',

                renderCell: (props: any) => <div>{props.value.split('T')[0]}</div>
                // + ' ' + props.value.split('T')[1]
            },
            { field: 'dueDate', hideSortIcons: true, flex: 0.08, headerName: t('Due Date'), type: 'string', cellClassName: 'centerCell', width: 220, headerClassName: 'data-header', renderCell: (props: any) => <div>{props?.value?.split('T')[0]}</div> },
            {
                field: 'actions',
                flex: 0.1,
                headerName: t('Actions'),
                type: 'actions',
                // cellClassName: 'super-app-theme--cell',
                headerClassName: 'data-header',
                getActions: (params: any) => [
                    <GridActionsCellItem
                        icon={<Tooltip title="Add Observations"><CommentIcon sx={{ fontSize: '11px' }} /></Tooltip>}
                        label="PDF"
                        onClick={() => viewObservation(params)}
                    // showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="PDF"><PictureAsPdfIcon sx={{ fontSize: '11px' }} /></Tooltip>}
                        label="PDF"
                        onClick={() => viewPDF(params)}
                    // showInMenu
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="View">
                                <RemoveRedEyeOutlinedIcon sx={{ fontSize: '10px' }} />
                            </Tooltip>
                        }
                        label="View"
                        onClick={view(params.id)}
                    // showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="Edit"><EditIcon sx={{ fontSize: '10px' }} /></Tooltip>}
                        label="Edit"
                        onClick={edit(params.id)}
                    // showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="Delete"><DeleteIcon sx={{ fontSize: '10px' }} /></Tooltip>}
                        label="Delete"
                        onClick={deleteUser(params.id, params.row.company)}

                    />,
                ]
            }
        ],
        [deleteUser, edit, view, t]
    )
    // /validate function
    const validateFunction = () => {
        const error = validateCRMForm(globaltemp.data)
        // console.log("error",error);
        if (error) {
            setError(true)

            return dispatch(openSnackbar({ open: true, severity: 'error', message: "Please fill required Field" }))
        }
        Save()
    }
    const Save = async () => {
        // setValidation(true)
        dispatch(openLoader({ open: true }))
        if (id === '') {

            await create({
                endpoint: '/crm',
                token: JSON.parse(localStorage.getItem('user') ?? '').token,
                data: JSON.stringify(globaltemp.data)
            })
                .unwrap()
                .then((response: any) => {
                    // console.log("respose", response);
                    if (response.success) {
                        refetch()
                        dispatch(closeLoader())
                        dispatch(openSnackbar({ open: true, severity: 'success', message: response.message }))

                    }

                }).catch((err: any) => {
                    // console.log("resposeerr", err);
                    handleError(err)

                })
            dispatch(closeLoader())
            setAddMerchant(false)
        } else {
            let index: any;
            await update({
                endpoint: `/crm/${id}`,
                token: JSON.parse(localStorage.getItem('user') ?? '').token,
                data: JSON.stringify(globaltemp.data)
            })
                .unwrap()
                .then((response: any) => {
                    // console.log("respose", response);
                    if (response.success) {
                        refetch()
                        dispatch(openSnackbar({ open: true, severity: 'success', message: response.message }))
                    }

                }).catch((err: any) => {
                    handleError(err)
                })
            dispatch(closeLoader())
        }
        setOpen(false);
        setError(false)
        setViewPDF(false)
        setId('')
        setCancelDisable(false)
        setAdd(false)
        setObservation(false)

    }
    const handleCancelDisable = (value: any) => {
        if (id !== '') {
            setCancelDisable(value)
        }
    }
    // const deleteFile = () => {

    // }
    return (
        <Stack paddingTop={{ xs: "130px", sm: '130px', md: '80px', xl: '80px', height: 'auto' }} >
            <Box
                sx={{
                    height: 'auto',
                    borderRadius: '16px',
                    border: '1px solid #EBEFFA',
                    width: '100%',
                    backgroundColor: 'white',
                    marginTop: '10px'
                }}
            >
                <Stack sx={{
                    display: 'flex', justifyContent: 'right', flexDirection: 'row',
                    marginTop: '20px', marginBottom: '20px', marginRight: '20px'
                }}>
                    <Box>
                        <ButtonBase style={{
                            fontSize: '0.78rem',
                            fontWeight: "500",
                            // textTransform: "uppercase", 
                            borderRadius: '16px',
                            width: '120px',
                            height: '30px',
                            backgroundColor: '#F37021',
                            padding: '5px',
                            color: '#ffffff'
                        }} onClick={handleClickOpen}>
                            {<AddIcon style={{ fontSize: '20px' }} />}{t('Add Lead')}
                        </ButtonBase>
                    </Box>
                </Stack>
                <Box sx={{
                    height: 550, overflow: 'auto', width: '100%', padding: '5px',
                    '& .super-app-theme--cell ': {
                        height: '30px',
                        border: 'none !important',
                        display: 'flex',
                        justifyContent: 'flex-start !important'
                    },
                    '& .centerCell': {
                        height: '30px',
                        border: 'none !important',
                        display: 'flex',
                        justifyContent: 'center !important'
                    }
                }}>
                    <StripedDataGrid
                        getRowHeight={() => 'auto'}
                        isRowSelectable={() => false}
                        disableColumnFilter
                        disableColumnMenu={true}
                        loading={isLoading}
                        density='compact'
                        columns={columns} rows={common.data ?? []}
                        slots={{
                            noRowsOverlay: CustomNoRowsOverlay,
                        }}
                        sx={{
                            '&, [class^=MuiDataGrid]': { border: 'none', gridGap: 0 },
                            fontFamily: 'DM Sans',
                            display: 'flex', justifyContent: 'center', alignItem: 'center',
                            color: "#1b2559",
                            fontSize: '10px',
                            fontWeight: '700',
                            '& .data-header': {
                                // backgroundColor: '#233044#616771',
                                borderBottom: '1px solid',
                                textTransform: 'uppercase',
                                color: '#a0aec0',
                                fontSize: '11px',
                                fontWeight: '700',
                            },
                        }}
                    />
                </Box>
            </Box>
            <Dialog
                open={open}
                disableScrollLock={true}
                fullWidth
                maxWidth={IsViewPDF || isObservation ? 'md' : 'lg'}
                sx={{height:'600px'}}
                // height={600}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" component={'div'}>


                        {IsViewPDF ?

                            url === '' ? "No PDF Uploaded" : <iframe height='480' width='850px' id='convertToPdf' src={url}></iframe>

                            :
                            isObservation ? <ObservationForm disable={disable} close={handleClose} validation={isError} handleCancelDisable={handleCancelDisable} /> : <CRMForm disable={disable} validation={isError} handleCancelDisable={handleCancelDisable} />
                        }

                    </DialogContentText>
                </DialogContent>
                {!isObservation && <DialogActions >
                    {(!cancelDisable) && <Button variant="outlined" style={{
                        borderRadius: '16px', backgroundColor: '#F37021',
                        color: '#ffffff', fontSize: '0.7rem',
                    }} className='add_btn' onClick={handleClose}>{t(isObservation?'Close':'Cancel')}</Button>}
                    {
                        !isObservation && !disable && !showM && !IsViewPDF &&
                        <Button variant="contained" style={{
                            borderRadius: '16px', backgroundColor: '#F37021',
                            color: '#ffffff', fontSize: '0.7rem',
                        }}
                            onClick={validateFunction} endIcon={<SendIcon />}
                        >
                            {t('Save')}
                        </Button>
                    }
                </DialogActions>}
            </Dialog>
            <Footer />
        </Stack>
    )
}

export default CRM