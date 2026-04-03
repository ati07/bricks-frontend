import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { formComponent } from "../../formComponents/FormComponentsObject";
import { RootState } from "../../redux/app/store";
import {
  setglobaltempDataKey,
  setglobaltempDataKeyInsertDataInArray,
  setglobaltempDataKeyTwoLevel,
} from "../../redux/features/globaltemp/globaltempSlice";
import dayjs from "dayjs";
import DropZone from "../../formComponents/DropZone/DropZone";
import { useUploadFileMutation } from "../../redux/ApiHandler/ThemeApi";
import Tab from "@mui/material/Tab";
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
// import CRMCalculator from './CRMCalculator'
import { HSeparator } from "../common/separator/Separator";
// import logo from '../../../../assets/images/newlogo.png';
import logo from "../../assets/images/logoV.png";
import Tabs from "@mui/material/Tabs";
import { useTranslation } from "react-i18next";

export var mailformat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CRMForm({ disable, validation, handleCancelDisable }: any) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.globaltemp);
  const common = useSelector((state: RootState) => state.commonData);
  const globaltemp = data.data;
  const [uploadFile] = useUploadFileMutation();
  const [visibleRow1, setVisibleRow1] = useState([0]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //   console.log('error',!globaltemp?.email?.match(mailformat) ?'Invalid Email':'Email is required')

  const dueDateStatus: any = {
    "Technical Review": 2,
    "Pending for new accounts": 10,
    "Offer Review": 2,
    "Offer Sent": 1,
    "Requested actual cost": 2,
    "Approved by client": 1,
    "Contract sent": 1,
    "Initial Contact": 3,
  };
  const handleStatus = (value: any) => {
    // console.log('value',value)
    const date = new Date();
    // Add 7 days to specified date
    date.setDate(date.getDate() + dueDateStatus?.[value]);

    dispatch(
      setglobaltempDataKey({
        key: "dueDate",
        value: dayjs(new Date(date)).format("YYYY-MM-DD"),
      })
    );
  };

  const CRMForm = [
    {
      type: "Input",
      props: {
        key: "company",
        title: "Company*",
        type: "text",
        value: globaltemp.company,
        error: globaltemp.company === "" && validation,
        errorMessage: "Company is required",
      },
    },
    {
      type: "Input",
      props: {
        key: "website",
        title: "Website*",
        type: "text",
        value: globaltemp.website,
        error: globaltemp.website === "" && validation,
        errorMessage: "Website is required",
      },
    },
    // {
    //   type: 'Input',
    //   props: {
    //     key: 'mcc',
    //     form: 'DBA',
    //     title: "MCC",
    //     type: 'number',
    //     value: globaltemp.mcc,
    //     error: globaltemp.mcc === '' && validation,
    //     errorMessage: 'MMC is required'
    //   }
    // },
    {
      type: "DropDown",
      props: {
        key: "status",
        title: "Status*",
        options: [
          "Technical Review",
          "Pending for new accounts",
          "Offer Review",
          "Offer Sent",
          "Requested actual cost",
          "Approved by client",
          "Contract sent",
          "Initial Contact",
        ],
        value: globaltemp.status,
        error: globaltemp.status === "" && validation,
        errorMessage: "status is required",
        handleStatus: handleStatus,
      },
    },
    {
      type: "Date",
      props: {
        key: "dueDate",
        title: "Due Date",
        value: globaltemp.dueDate,
        disabled: true,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "paymentTerms",
        title: "Payment Terms",
        options: [
          "Weekly Net 1",
          "Weekly Net 3",
          "Weekly Net 5",
          "Monthly Net 3",
        ],
        value: globaltemp.paymentTerms,
      },
    },
    {
      type: "Input",
      props: {
        key: "rdrTier1Price",
        title: "RDR Tier 1 Price",
        type: "number",
        value: globaltemp.rdrTier1Price,
        // error: globaltemp.rdrTier1Price ==='' && validation,
        // errorMessage: 'RDR Tier 1 Price is required'
      },
    },
    {
      type: "Input",
      props: {
        key: "rdrTier2Price",
        title: "RDR Tier 2 Price",
        type: "number",
        value: globaltemp.rdrTier2Price,
        // error: globaltemp.rdrTier2Price ==='' && validation,
        // errorMessage: 'RDR Tier 2 Price is required'
      },
    },
    {
      type: "Input",
      props: {
        key: "rdrTier3Price",
        title: "RDR Tier 3 Price",
        type: "number",
        value: globaltemp.rdrTier3Price,
        // error: globaltemp.rdrTier3Price ==='' && validation,
        // errorMessage: 'RDR Tier 3 Price is required'
      },
    },
    {
      type: "Input",
      props: {
        key: "ethocaPrice",
        title: "Ethoca Price",
        type: "number",
        value: globaltemp.ethocaPrice,
        // error:globaltemp.ethocaPrice ==='' && validation,
        // errorMessage: 'Ethoca Price is required'
      },
    },
    {
      type: "Input",
      props: {
        key: "integrationFee",
        title: "Integration Fee",
        type: "number",
        value: globaltemp.integrationFee,
        // error: globaltemp.integrationFee ==='' && validation,
        // errorMessage: 'Integration Fee is required'
      },
    },
    {
      type: "Input",
      props: {
        key: "monthlyMinimumFees",
        title: "Monthly Minimum Fees",
        type: "number",
        value: globaltemp.monthlyMinimumFees,
        // error: globaltemp.monthlyMinimumFees ==='' && validation,
        // errorMessage: 'Monthly Minimum Fees is required'
      },
    },
  ];
  // setglobaltempDataKeyTwoLevel
  const onTwoLevelHandler = (key: any, value: any) => {
    const brk = key.split(".");
    const key1 = brk[0];
    const key2 = brk[2];
    const position = parseInt(brk[1]);
    // console.log('brk', brk);

    dispatch(
      setglobaltempDataKeyTwoLevel({
        key1: key1,
        key2: key2,
        position: position,
        value: value,
      })
    );
  };

  const handleCheckBox = (key: any, value: any) => {
    // console.log('v',key, value)
    const brk = key.split(".");
    const key1 = brk[0];
    const key2 = brk[2];
    const position = parseInt(brk[1]);
    // console.log('brk', brk,value,globaltemp?.contacts[parseInt(position as any)]);

    if (globaltemp?.contacts?.[position]?.check === false) {
      globaltemp?.contacts.map((i: any, j: number) => {
        if (position !== j) {
          dispatch(
            setglobaltempDataKeyTwoLevel({
              key1: key1,
              key2: key2,
              position: j,
              value: false,
            })
          );
        }
      });
      dispatch(
        setglobaltempDataKeyTwoLevel({
          key1: key1,
          key2: key2,
          position: position,
          value: value,
        })
      );
    } else {
      dispatch(
        setglobaltempDataKeyTwoLevel({
          key1: key1,
          key2: key2,
          position: position,
          value: true,
        })
      );
    }
    // let arr: any = [0, 1, 2, 3]
  };

  const onClear = (value: any) => {
    //remove global Data
    const duplicateGlobal = [...globaltemp.contacts];
    duplicateGlobal.splice(value, 1);
    dispatch(setglobaltempDataKey({ key: "contacts", value: duplicateGlobal }));
  };
  const [contactForm, setContactForm] = useState([
    [
      {
        type: "CheckBox",
        props: {
          key: "contacts.0.check",
          value: globaltemp.contacts?.[0]?.check,
          handleCheckBox: handleCheckBox,
        },
      },
      {
        type: "Input",
        props: {
          key: "contacts.0.contact",
          title: `${t("Contact")}1`,
          type: "text",
          value: globaltemp.contacts?.[0]?.contact,
          error:
            globaltemp.contacts?.[0]?.check &&
            globaltemp.contacts?.[0]?.contact === "" &&
            validation,
          errorMessage: "contact is required",
          onTwoLevelHandler: onTwoLevelHandler,
        },
      },
      {
        type: "Input",
        props: {
          key: "contacts.0.email",
          title: "Email",
          type: "email",
          value: globaltemp.contacts?.[0]?.email,
          error:
            globaltemp.contacts?.[0]?.check &&
            globaltemp.contacts?.[0]?.email === "" &&
            !globaltemp?.email?.match(mailformat) &&
            validation,
          errorMessage: !globaltemp?.contacts?.[0]?.email?.match(mailformat)
            ? "Invalid Email"
            : "Email is required",
          onTwoLevelHandler: onTwoLevelHandler,
        },
      },
      {
        type: "DropDown",
        props: {
          key: "contacts.0.im",
          title: "IM",
          options: [
            "Whatsapp",
            "Telegram",
            "Skype",
            "Wire",
            "Phone Number",
            "Email",
          ],
          value: globaltemp.contacts?.[0]?.im,
          error:
            globaltemp.contacts?.[0]?.check &&
            globaltemp.contacts?.[0]?.im === "" &&
            validation,
          errorMessage: "IM is required",
          onTwoLevelHandler: onTwoLevelHandler,
        },
      },
      {
        type: "Input",
        props: {
          key: "contacts.0.user",
          title: "Nr/User",
          type: "user",
          value: globaltemp.contacts?.[0]?.user,
          // error: globaltemp.contacts?.[0].check && globaltemp.contacts?.[0]?.user === '' && validation,
          // errorMessage: 'User is required',
          onTwoLevelHandler: onTwoLevelHandler,
        },
      },
      {
        type: "DropDown",
        props: {
          key: "contacts.0.position",
          title: "Position",
          options: ["IT", "Decision Maker", "Finance", "Operations"],
          value: globaltemp.contacts?.[0]?.position,
          error:
            globaltemp.contacts?.[0]?.check &&
            globaltemp.contacts?.[0]?.position === "" &&
            validation,
          errorMessage: "Position is required",
          onTwoLevelHandler: onTwoLevelHandler,
        },
      },
      {
        type: "ClearButton",
        props: {
          onClear: onClear,
          visible: globaltemp.contacts?.[0]?.check ? false : true,
        },
      },
    ],
  ]);

  // console.log('contactForm',contactForm)

  // const uploadCallback = async (value: any) => {
  //   // console.log("Uploading", value)
  //   // document?.getElementById("convertToPdf")?.setAttribute('src', value.file)

  //   const formData: any = new FormData();
  //   formData.append("title", value.type);
  //   formData.append("file", value.file[0]);
  //   formData.append("oldFileName", globaltemp.contractFile?.[0]?.file ?? '');

  //   // console.log("formData", formData.file)
  //   handleCancelDisable(true)
  //   await uploadFile({
  //     endpoint: '/upload-file',
  //     token: JSON.parse(localStorage.getItem('user') ?? '').token,
  //     // data: JSON.stringify({ title: value.type ,file: value.file })
  //     data: formData
  //   })
  //     .unwrap()
  //     .then((res: any) => {
  //       // console.log('res', res)
  //       document?.getElementById("convertToPdf")?.setAttribute('src', `${import.meta.env.VITE_REACT_API_URL + '/files/' + String(res.result.fileName)}`)
  //       // console.log('url',`${import.meta.env.VITE_REACT_API_URL +'/files/' + res.result.fileName}`)
  //       dispatch(setglobaltempDataKeyTwoLevel({ key1: "contractFile", key2: "title", position: 0, value: res.result.title }))
  //       dispatch(setglobaltempDataKeyTwoLevel({ key1: "contractFile", key2: "file", position: 0, value: res.result.fileName }))

  //     }).catch((err: any) => {
  //       console.log("resposeerr", err);
  //       // handleError(err)

  //     })
  // }

  const onClickAddIcon = () => {
    const contacts = [...globaltemp.contacts];
    const newData = {
      check: false,
      contact: "",
      email: "",
      im: "",
      user: "",
      position: "",
    };
    if (contactForm.length < 4) {
      // setVisibleRow1([...visibleRow1, 1])
      contacts.push(newData);
      dispatch(setglobaltempDataKey({ key: "contacts", value: contacts }));
    }
    // setCount(count + 1)
  };
  useEffect(() => {
    // console.log('contactForm',contactForm)
    let newData: any = [];

    globaltemp?.contacts &&
      globaltemp?.contacts.map((i: any, j: number) => {
        newData.push([
          {
            type: "CheckBox",
            props: {
              key: `contacts.${j}.check`,
              value: i?.check,
              handleCheckBox: handleCheckBox,
            },
          },
          {
            type: "Input",
            props: {
              key: `contacts.${j}.contact`,
              title: `${t("Contact")}${j + 1}`,
              type: "text",
              value: i?.contact,
              error: i?.check && i?.contact === "" && validation,
              errorMessage: "contact is required",
              onTwoLevelHandler: onTwoLevelHandler,
            },
          },
          {
            type: "Input",
            props: {
              key: `contacts.${j}.email`,
              title: "Email",
              type: "email",
              value: i?.email,
              error:
                i?.check &&
                i?.email === "" &&
                !i?.email?.match(mailformat) &&
                validation,
              errorMessage: !i?.email?.match(mailformat)
                ? "Invalid Email"
                : "Email is required",
              onTwoLevelHandler: onTwoLevelHandler,
            },
          },
          {
            type: "DropDown",
            props: {
              key: `contacts.${j}.im`,
              title: "IM",
              options: [
                "Whatsapp",
                "Telegram",
                "Skype",
                "Wire",
                "Phone Number",
                "Email",
              ],
              value: i?.im,
              error: i?.check && i?.im === "" && validation,
              errorMessage: "IM is required",
              onTwoLevelHandler: onTwoLevelHandler,
            },
          },
          {
            type: "Input",
            props: {
              key: `contacts.${j}.user`,
              title: "Nr/User",
              type: "user",
              value: i?.[0]?.user,
              // error: globaltemp.contacts?.[0].check && globaltemp.contacts?.[0]?.user === '' && validation,
              // errorMessage: 'User is required',
              onTwoLevelHandler: onTwoLevelHandler,
            },
          },
          {
            type: "DropDown",
            props: {
              key: `contacts.${j}.position`,
              title: "Position",
              options: ["IT", "Decision Maker", "Finance", "Operations"],
              value: i?.position,
              error: i?.check && i?.position === "" && validation,
              errorMessage: "Position is required",
              onTwoLevelHandler: onTwoLevelHandler,
            },
          },
          {
            type: "ClearButton",
            props: {
              onClear: onClear,
              visible: i?.check ? false : true,
            },
          },
        ]);
      });

    setContactForm(newData);
  }, [globaltemp.contacts]);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            width="180px"
            height="60px"
            style={{ height: "110px", marginTop: "10px", marginBottom: "30px" }}
          />
          <HSeparator mb="30px" />
          <Typography
            style={{
              fontSize: "20px",
              color: "#393838",
              fontWeight: "600",
              paddingBottom: "20px",
            }}
          >
            {t("Customer Relationship Manager")}
          </Typography>
        </Box>
        {/* <Box >
              
            </Box> */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#F37021",
              color: "white",
            },
          }}
          sx={{}}
        >
          <Tab
            label={t("Leads Details")}
            {...a11yProps(0)}
            sx={{
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
          <Tab
            label={t("Documents Details")}
            {...a11yProps(1)}
            sx={{
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid container spacing={1} item xs={12} md={12}>
            {/* {CRMForm.map((obj: any, j: number) => {
                return <Grid key={j} item xs={j === 1 ? 4 : 2}>
                  {React.createElement(formComponent[obj.type].component, { props: obj.props, disable: disable })}
                </Grid>
              })} */}
          </Grid>
          <Grid container spacing={1} item xs={12} md={12}>
            {/* {contactForm.map((i: any, k: number) => {
                return i.map((obj: any, j: number) => {
                  return <Grid key={j} style={{  width: '100%', alignItems: 'center' }} item xs={(j === 0) || (j === 6) || (j === 12) || (j === 18) || (j === 7) || (j === 14) || (j === 28) ? .5 : 2.2}>
                    {React.createElement(formComponent?.[obj?.type]?.component, { props: obj.props, disable: disable, index: k })}
                  </Grid>
                })
              })} */}
            <Box
              style={{
                width: "100%",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Comming Soon.....
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {/* {contactForm.length < 4 && <Fab size="small" onClick={onClickAddIcon} style={{ backgroundColor: "#422afb",width:'35px',height:'20px' }} aria-label="add">
                  <AddIcon style={{ color: '#ffffff' }}  />
                </Fab>} */}
            </Box>

            <Box style={{ padding: "10px", width: "100%" }}>
              <HSeparator />
            </Box>
          </Grid>
          <Grid
            container
            spacing={1}
            item
            xs={12}
            md={12}
            style={{ paddingLeft: "40px" }}
          >
            {/* <Grid item xs={12} style={{ display:'flex',justifyContent: 'center',alignItems: 'center',fontSize: '25px', fontWeight: 900, paddingTop: '15px', paddingBottom: '15px' }}>
                <Typography style={{ fontSize: '20px',color:'#393838',fontWeight:'600',paddingBottom: '20px' }}>
                    {t("Alerts Calculation Tool")}
                </Typography>
              </Grid> */}
            {/* <CRMCalculator data={globaltemp} /> */}
          </Grid>
          <Grid container spacing={1} item xs={12} md={12}>
            <Grid item xs={6}>
              {/* <Grid item xs={12}><Typography style={{ fontSize: '20px', fontWeight: 900, }}>Upload File</Typography></Grid>

                <Box style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
                  <DropZone title={`${globaltemp.contractFile?.[0]?.title}`} type='deliveryComfirmation' fileType={['PDF']} component='fightChargebacks' onCallback={uploadCallback} />
                 
                  {globaltemp.contractFile?.[0]?.file !== '' ? <iframe height='200' width='550px' id='convertToPdf' src={import.meta.env.VITE_REACT_API_URL + '/files/' + String(globaltemp.contractFile?.[0]?.file)}></iframe>
                    : <iframe height='100' width='550px' id='convertToPdf' ></iframe>}

                </Box> */}
            </Grid>
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <Grid item xs={12}><Typography style={{ fontSize: '20px', fontWeight: 900, }}>Upload File</Typography></Grid> */}

            <Box
              style={{
                width: "100%",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Comming Soon.....
            </Box>

            {/* <DropZone title={`${globaltemp.contractFile?.[0]?.title}`} type='deliveryComfirmation' fileType={['PDF']} component='fightChargebacks' onCallback={uploadCallback} /> */}
            {/* onCallback={fightCallback} */}
            {/* {globaltemp.contractFile?.[0]?.title !=='' ?<p style={{ marginTop: '10px' }}>{`File name: ${globaltemp.contractFile?.[0]?.title}`}</p> :<></>} */}

            {/* {globaltemp.contractFile?.[0]?.file !== '' ? <iframe height='200' width='550px' id='convertToPdf' src={import.meta.env.VITE_REACT_API_URL + '/files/' + String(globaltemp.contractFile?.[0]?.file)}></iframe>
                  : <iframe height='100' width='550px' id='convertToPdf' ></iframe>} */}
          </Grid>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

export default CRMForm;

{
  /* onCallback={fightCallback} */
}
{
  /* {globaltemp.contractFile?.[0]?.title !=='' ?<p style={{ marginTop: '10px' }}>{`File name: ${globaltemp.contractFile?.[0]?.title}`}</p> :<></>} */
}
