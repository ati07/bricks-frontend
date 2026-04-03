import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store.js";
import { Box, Grid, Tabs, Typography } from "@mui/material";
import { formComponent } from "../../formComponents/FormComponentsObject.js";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { weeks } from "../helper.js";
import Tab from "@mui/material/Tab";
import { HSeparator } from "../common/separator/Separator.js";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
// console.log(weeks);

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

function PropertiesForm({ disable }: any) {
  const data = useSelector((state: RootState) => state.globaltemp);
  const common = useSelector((state: RootState) => state.commonData);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const globaltemp = data.data;

  const PropertiesForm: any = [
    {
      type: "DropDown",
      props: {
        key: "fincaNr",
        title: "Nr. Finca",
        options: weeks,
        value: globaltemp.fincaNr,
      },
    },
    {
      type: "Input",
      props: {
        key: "locationCode",
        title: "Codigo Ubicacion",
        value: globaltemp.locationCode,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "type",
        title: "Tipo",
        options: [
          "Casa",
          "Apartamento",
          "Terreno",
          "Local",
          "Galera",
          "Officina",
        ],
        value: globaltemp.type,
      },
    },
    {
      type: "Input",
      props: {
        key: "address",
        title: "Direccion",
        type: "text",
        value: globaltemp.address,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "province",
        title: "Provincia",
        option: [""],
        value: globaltemp.province,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "city",
        title: "Ciudad",
        option: [""],
        value: globaltemp.city,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "corregimiento",
        title: "Corregimiento",
        option: [""],
        value: globaltemp.corregimiento,
      },
    },
    {
      type: "Input",
      props: {
        key: "phName",
        title: "Nombre PH (Si Aplica)",
        type: "text",
        value: globaltemp.phName,
      },
    },
    {
      type: "Input",
      props: {
        key: "houseNumber",
        title: "Nr. Casa / Apto",
        type: "text",
        value: globaltemp.houseNumber,
      },
    },
    {
      type: "Input",
      props: {
        key: "yearOfConstruction",
        title: "Años de Construccion",
        type: "text",
        value: globaltemp.yearOfConstruction,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "owerType",
        title: "Tipo de Propietario",
        option: ["Natural", "Juridica"],
        value: globaltemp.owerType,
      },
    },
    {
      type: "Input",
      props: {
        key: "titleHolder",
        title: "Titular",
        type: "text",
        value: globaltemp.titleHolder,
      },
    },
    {
      type: "Input",
      props: {
        key: "cip",
        title: "C.I.P / RUC",
        type: "text",
        value: globaltemp.address,
      },
    },
    {
      type: "Input",
      props: {
        key: "squareMeters",
        title: "Metros",
        type: "text",
        value: globaltemp.squareMeters,
      },
    },
    {
      type: "Input",
      props: {
        key: "bedrooms",
        title: "Habitaciones",
        type: "text",
        value: globaltemp.bedrooms,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "fullBathroom",
        title: "Baños Completos",
        option: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        value: globaltemp.fullBathroom,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "halfBathroom",
        title: "Medio Baño",
        option: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        value: globaltemp.halfBathroom,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "parking",
        title: "Parking",
        option: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        value: globaltemp.parking,
      },
    },
    {
      type: "DropDown",
      props: {
        key: "storage",
        title: "Bodega",
        option: ["Si", "No"],
        value: globaltemp.storage,
      },
    },
  ];

  const perfilComercial: any = [
    {
      type: "DropDown",
      props: {
        key: "status",
        title: "Estatus",
        options: ["Reposeido", "En Proceso", "Disponible"],
        value: globaltemp.status,
      },
    },
    {
      type: "Input",
      props: {
        key: "salePrice",
        title: "Precio de Venta",
        value: globaltemp.salePrice,
      },
    },
    {
      type: "Input",
      props: {
        key: "purchasePrice",
        title: "Precio de Compra",
        value: globaltemp.purchasePrice,
      },
    },
    {
      type: "Input",
      props: {
        key: "amountOwed",
        title: "Cantidad Adeudada",
        value: globaltemp.amountOwed,
      },
    },
    {
      type: "Input",
      props: {
        key: "minimumSalePrice",
        title: "Precio minino de Venta",
        value: globaltemp.amountOwed,
      },
    },
    {
      type: "Input",
      props: {
        key: "maintenanceExpenses",
        title: "Gastos de Mantenimiento / Mes",
        value: globaltemp.maintenanceExpenses,
      },
    },
  ];

  const PerfilLegal: any = [
    {
      type: "Input",
      props: {
        key: "rucDgi",
        title: "RUC DGI",
        value: globaltemp.rucDgi,
      },
    },
    {
      type: "Input",
      props: {
        key: "nit",
        title: "NIT",
        value: globaltemp.nit,
      },
    },
    {
      type: "Date",
      props: {
        key: "ultimaFechaPagosDGI",
        title: "Ultima Fecha Pagos DGI",
        value: globaltemp.ultimaFechaPagosDGI,
      },
    },
    {
      type: "Input",
      props: {
        key: "impuestosPendientes ",
        title: "Impuestos Pendientes",
        value: globaltemp.impuestosPendientes,
      },
    },
    {
      type: "Input",
      props: {
        key: "actualizarCuentaCorriente ",
        title: "Actualizar Cuenta Corriente",
        value: globaltemp.actualizarCuentaCorriente,
      },
    },
    {
      type: "Input",
      props: {
        key: "fechaUltimaRevisonCuentaCorriente ",
        title: "Fecha Ultima revison Cuenta Corriente",
        value: globaltemp.fechaUltimaRevisonCuentaCorriente,
      },
    },
  ];

  let adminComment = [
    {
      type: "DropDown",
      props: {
        key: "user",
        title: "USUARIO",
        options: [],
        value: globaltemp.user,
      },
    },
    {
      type: "TextArea",
      props: {
        key: "observation",
        title: "OBSERVACIÓN",
        type: "number",
        value: globaltemp.observation,
        //   onChange:onChange
      },
    },
  ];
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Box
        style={{
          display: "flex",
          // backgroundColor:'#F370214f',

          paddingTop: "10px",
          paddingBottom: "10px",
          width: "210px",
          paddingLeft: "5px",
        }}
      >
        <Box style={{ marginRight: "10px" }}>
          <SupervisorAccountIcon
            sx={{ width: "25px", height: "25px", color: "#F37021" }}
          />
        </Box>
        <Box>
          <Typography style={{ fontSize: "20px", fontWeight: "900" }}>
            Propiedad
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {/* {PropertiesForm.map((obj: any, j: number) => {
          return (
            <Grid key={j} item xs={4}>
              {React.createElement(formComponent[obj.type].component, {
                props: obj.props,
                disable: disable,
              })}
            </Grid>
          );
        })} */}
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "2px" }}>
        {/* {perfilComercial.map((obj: any, j: number) => {
          return (
            <Grid key={j} item xs={4}>
              {React.createElement(formComponent[obj.type].component, {
                props: obj.props,
                disable: disable,
              })}
            </Grid>
          );
        })} */}
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "2px" }}>
        {/* {PerfilLegal.map((obj: any, j: number) => {
          return (
            <Grid key={j} item xs={4}>
              {React.createElement(formComponent[obj.type].component, {
                props: obj.props,
                disable: disable,
              })}
            </Grid>
          );
        })} */}
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "2px" }}>
        {/* {adminComment.map((obj: any, j: number) => {
          return (
            <Grid key={j} item xs={j === 0 ? 3 : 9}>
              {React.createElement(formComponent[obj.type].component, {
                props: obj.props,
                disable: disable,
              })}
            </Grid>
          );
        })} */}
      </Grid>

      <Box>
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
            label={"Datos Generales"}
            {...a11yProps(0)}
            sx={{
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
          <Tab
            label={"Perfil Comercial"}
            {...a11yProps(1)}
            sx={{
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
          <Tab
            label={"Perfil Legal"}
            {...a11yProps(1)}
            sx={{
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
          <Tab
            label={"Observaciones"}
            {...a11yProps(1)}
            sx={{
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
          <Tab
            label={"Documentos Anexos"}
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
          {/* <Grid container spacing={1} item xs={12} md={12}> */}
          {PropertiesForm.map((obj: any, j: number) => {
            return (
              <Grid key={j} item xs={4}>
                {React.createElement(formComponent[obj.type].component, {
                  props: obj.props,
                  disable: disable,
                })}
              </Grid>
            );
          })}
          {/* </Grid> */}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}> */}
          {perfilComercial.map((obj: any, j: number) => {
            return (
              <Grid key={j} item xs={4}>
                {React.createElement(formComponent[obj.type].component, {
                  props: obj.props,
                  disable: disable,
                })}
              </Grid>
            );
          })}
          {/* </Grid> */}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}> */}
          {PerfilLegal.map((obj: any, j: number) => {
            return (
              <Grid key={j} item xs={4}>
                {React.createElement(formComponent[obj.type].component, {
                  props: obj.props,
                  disable: disable,
                })}
              </Grid>
            );
          })}
          {/* </Grid> */}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}> */}
          {adminComment.map((obj: any, j: number) => {
          return (
            <Grid key={j} item xs={j === 0 ? 3 : 9}>
              {React.createElement(formComponent[obj.type].component, {
                props: obj.props,
                disable: disable,
              })}
            </Grid>
          );
        })}
          {/* </Grid> */}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}> */}
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
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}

export default PropertiesForm;
