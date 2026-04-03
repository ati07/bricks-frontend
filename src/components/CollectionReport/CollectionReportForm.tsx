import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { Box, Grid, Typography } from "@mui/material";
import { formComponent } from "../../formComponents/FormComponentsObject";
import BusinessIcon from "@mui/icons-material/Business";


let banks = [
  "Atlas Bank",
  "Bac International Bank, Inc.",
  "Banco Aliado, S.A.",
  "Banco Azteca (Panamá), S.A.",
  "Banco Davivienda (Panamá), S.A.",
  "Banco Delta, S.A. (BMF)",
  "Pacific Bank, S.A.",
  "Banco Ficohsa (Panamá), S.A.",
  "Banco General, S.A.",
  "Banco Internacional de Costa Rica, S.A. (Bicsa)",
  "Banco Lafise Panamá, S.A.",
  "Banco La Hipotecaria, S.A.",
  "Banco Latinoamericano de Comercio Exterior, S.A. (Bladex)",
  "Bancolombia (Sucursal Panamá)",
  "Banco Nacional de Panamá.",
  "Banco Pichincha Panamá S.A.",
  "The Bank of Nova Scotia, Sucursal Panamá",
  "Banesco (Panamá), S.A.",
  "Banisi, S.A.",
  "Banistmo, S.A.",
  "Bank of China (Sucursal Panamá), S.A.",
  "BBP Bank, S.A.",
  "BCT Bank International, S.A.",
  "Bi Bank, S.A.",
  "Caja de Ahorros",
  "Canal Bank, S.A.",
  "Capital Bank, Inc.",
  "Citibank, N.A. (Sucursal Panamá)",
  "Credicorp Bank, S.A.",
  "Keb Hana Bank",
  "Global Bank Corporation",
  "Mercantil Banco, S.A.",
  "Mega International Commercial Bank Co., Ltd. (Mega Icbc)",
  "Multibank, Inc.",
  "Metrobank, S.A.",
  "MMG Bank Corporation",
  "Prival Bank, S.A.",
  "St. Georges Bank",
  "Towerbank International, Inc.",
  "Unibank, S.A.",
  "ASB BANK CORP.",
  "Austrobank Overseas (Panamá), S.A.",
  "Banco Credit Andorra (Panamá), S.A.",
  "Banco de Bogotá (Panamá), S.A.",
  "Banco de Crédito del Perú (Sucursal Panamá)",
  "Banco de Occidente (Panamá), S.A.",
  "Bancolombia (Panamá), S.A.",
  "BHD International Bank (Panamá), S.A.",
  "BPR Bank, S.A.",
  "GNB Sudameris Bank, S.A.",
  "Inteligo Bank, Ltd.",
  "Itaú (Panamá), S.A.",
  "Popular Bank Ltd., Inc."
];

function CollectionReportForm({ disable }: any) {
  const data = useSelector((state: RootState) => state.globaltemp);
  const common = useSelector((state: RootState) => state.commonData);
  const globaltemp = data.data;

  let onChange = (value:any)=>{

    // const inputText = event.target.value;
    console.log("eventt",value)
 
  }

  const CollectionReportForm: any = [
    {
      type: "Date",
      props: {
        key: "reportDate",
        title: "FECHA DEL REPORTE",
        value: globaltemp.reportDate,
      },
    },
    {
      type: "Input",
      props: {
        key: "client",
        title: "CLIENTE",
        type: "text",
        value: globaltemp.client,
      },
    },
    {
      type: 'AddItemDropDown',
      props: {
          key: 'projectTo',
          title: "PROYECTO",
          options: ["ALTAMAR",
              "CASAMAR",
              "COROTÚ GOLF VILLAS",
              "LAGUNA",
              "LAKESHORE",
              "MARINA GARDENS",
              "MARINA VILLAGE",
              "MARINE LODGE",
              "PENINSULA SUR",
              "RIVERSIDE",
              "VELAMAR",
              "VELAMAR VILLAGE",
              "VILLA MARINA CONDO",
              "VILLA MARINA FRENTE DE MAR",
              "VILLA MARINA LOTES",
              "COROTU",
              ],
          value: globaltemp.projectTo
      }
  },
    
    {
      type: "Input",
      props: {
        key: "unitName",
        title: "NOMBRE DE UNIDAD",
        type: "text",
        value: globaltemp.unitName,
      },
    },
    {
      type: "Date",
      props: {
        key: "collectionReportDate",
        title: "FECHA DE COBRO",
        type: "text",
        value: globaltemp.collectionReportDate,
      },
    },
    {
      type: "Date",
      props: {
        key: "entryDate",
        title: "FECHA DE ENTRADA AL FLUJO",
        type: "text",
        value: globaltemp.entryDate,
      },
    },
    {
      type: "Input",
      props: {
        key: "totalCollection",
        title: "TOTAL DE COBRO",
        type: "number",
        value: globaltemp.totalCollection,
      },
    },
    {
      type: "Input",
      props: {
        key: "reserve",
        title: "RESERVA",
        type: "number",
        value: globaltemp.reserve,
      },
    },
    {
      type: "Input",
      props: {
        key: "pass",
        title: "ABONO",
        type: "number",
        value: globaltemp.pass,
      },
    },
    {
      type: "AddItemDropDown",
      props: {
        key: "bank",
        title: "BANCO",
        options: banks,
        value: globaltemp.bank,
      },
    },
    {
      type: "Input",
      props: {
        key: "interest",
        title: "INTERESES",
        type: "number",
        value: globaltemp.interest,
      },
    },
    {
      type: "Input",
      props: {
        key: "disbursements",
        title: "DESEMBOLSOS",
        type: "number",
        value: globaltemp.disbursements,
      },
    },
    {
      type: "Date",
      props: {
        key: "arrangements",
        title: "RESERVA COMISIÓN O ARREGLOS",
        value: globaltemp.arrangements,
      },
    },
    {
      type: "Date",
      props: {
        key: "paymentDate",
        title: "FECHA DE PAGO SEGÚN CONTRATO",
        value: globaltemp.paymentDate,
      },
    },
    // {
    //   type: "DropDown",
    //   props: {
    //     key: "user",
    //     title: "Usario",
    //     options: [],
    //     value: globaltemp.user
    //   },
    // },
    // {
    //   type: "TextArea",
    //   props: {
    //     key: "observation",
    //     title: "OBSERVACIÓN",
    //     type: "number",
    //     value: globaltemp.observation,
    //     onChange:onChange
    //   },
    // },
    
  ];

  let CollectionTextArea = [
    {
      type: "DropDown",
      props: {
        key: "user",
        title: "USUARIO",
        options: [],
        value: globaltemp.user
      },
    },
    {
      type: "TextArea",
      props: {
        key: "observation",
        title: "OBSERVACIÓN",
        type: "number",
        value: globaltemp.observation,
        onChange:onChange
      },
    },
  ]
  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Box
        style={{
          display: "flex",
          // backgroundColor:'#F370214f',
          // marginBottom:"10px",
          paddingTop: "10px",
          paddingBottom: "10px",
          width: "210px",
          paddingLeft: "5px",
          marginBottom: "30px",
        }}
      >
        <Box style={{ marginRight: "10px" }}>
          <BusinessIcon
            sx={{ width: "25px", height: "25px", color: "#F37021" }}
          />
        </Box>
        <Box>
          <Typography style={{ fontSize: "20px", fontWeight: "900" }}>
            Cobros
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          {CollectionReportForm.map((obj: any, j: number) => {
            return (
              // j === CollectionReportForm.length -1 ? 12 :
              <Grid key={j} item xs={ 4}>
                {React.createElement(formComponent[obj.type].component, {
                  props: obj.props,
                  disable: disable,
                })}
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={2} style={{marginTop:'10px'}}>
          {CollectionTextArea.map((obj: any, j: number) => {
            return (
              <Grid key={j} item xs={j===0?3:9}>
                {React.createElement(formComponent[obj.type].component, {
                  props: obj.props,
                  disable: disable,
                })}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default CollectionReportForm;
