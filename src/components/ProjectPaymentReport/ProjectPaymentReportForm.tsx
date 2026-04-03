import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { Box, Grid, Typography } from "@mui/material";
import { formComponent } from "../../formComponents/FormComponentsObject";
import PaymentsIcon from "@mui/icons-material/Payments";
import { weeks } from "../helper";

let codeOption = [
  "263-01",
  "263-02",
  "263-03",
  "263-04",
  "263-05",
  "263-06",
  "263-07",
  "263-08",
  "263-09",
  "263-10",
  "263-11",
  "385-01",
  "385-02",
  "385-03",
  "385-04",
  "385-05",
  "385-06",
  "385-07",
  "385-08",
  "385-09",
  "385-10",
  "385-11",
  "385-12",
  "385-13",
  "385-14",
  "385-15",
  "385-16",
  "385-17",
  "385-18",
  "385-19",
  "385-20",
  "385-21",
  "385-22",
  "375-22",
  "375-24",
  "375-25",
  "375-26",
  "375-27",
  "375-28",
  "375-29",
  "375-30",
  "375-31",
  "375-32",
  "375-33",
  "375-34",
  "375-35",
  "375-36",
  "375-37",
  "375-38",
  "375-40",
  "375-39",
  "375-41",
  "375-42",
  "375-43",
  "375-44",
  "375-45",
  "375-46",
  "375-47",
  "375-48",
  "375-49",
  "375-50",
  "375-51",
  "375-52",
  "375-53",
  "375-54",
  "375-55",
  "375-56",
  "375-57",
  "375-58",
  "375-59",
  "375-60",
  "375-61",
  "375-62",
];
const items = [
  "Estudios Generales",
  "Diseño",
  "Administración de proyecto",
  "Gestión de Ventas",
  "Regalías",
  "Financiamiento",
  "Mercadeo y Publicidad",
  "Impuesto sobre Ganancia (ISR)",
  "Otros Gastos",
  "Trabajos Preliminares en General",
  "Permisos y Licencias",
  "Seguros",
  "Agrimensura y Replanteo",
  "Limpieza continua y Manejo de Materiales",
  "Limpieza final",
  "Gerencia de Construcción",
  "ITBMS",
  "Pavimentos",
  "Estacionamientos",
  "Cercas/Muros",
  "Irrigación",
  "Señalización en general",
  "Paisajismo en General",
  "Acueducto",
  "Pozos",
  "Tanque de agua",
  "Alcantarillado",
  "Drenajes",
  "Sistema Contra Incendio",
  "Electricidad y Telecomunicaciones",
  "Iluminación exterior",
  "Fundaciones",
  "Estructuras de Concreto",
  "Losa de Concreto Normal",
  "Losas postensadas",
  "Estructura de Techo",
  "Pérgolas",
  "Albañilería en General",
  "Plomería",
  "Electricidad",
  "HVAC",
  "Tejas",
  "Artefactos, accesorios y griferías",
  "Ebanistería en General",
  "Puertas de Madera",
  "Puertas y ventanas de vidrio",
  "Louvers",
  "Vidrio Templado y Espejos",
  "Cielo Raso en General",
  "Revestimientos de interiores",
  "Instalación de revestimiento de interiores",
  "Sobres",
  "Pasteo y pintura",
  "Herrería",
  "Iluminación",
  "Elevadores",
  "Electrodomésticos",
  "Seguridad",
  "Administración",
  "Alquileres",
  "Postventa y Garantias",
];

// Creating key-value mapping while removing parentheses
const mappedObject = Object.fromEntries(
  codeOption.map((code, index) => [code, items[index]])
);

console.log(mappedObject);

function ProjectPaymentReportForm({ disable }: any) {
  const data = useSelector((state: RootState) => state.globaltemp);
  const common = useSelector((state: RootState) => state.commonData);
  const globaltemp = data.data;

  let onChange = (value: any) => {
    // const inputText = event.target.value;
    console.log("eventt", value);
  };
  const ProjectPaymentReportForm: any = [
    {
      type: "DropDown",
      props: {
        key: "week",
        title: "SEMANA",
        options: weeks,
        value: globaltemp.week,
      },
    },
    {
      type: "Date",
      props: {
        key: "date",
        title: "FECHA",
        value: globaltemp.date,
      },
    },
    {
      type: "Input",
      props: {
        key: "contractor",
        title: "PROVEEDOR/CONTRATISTA",
        type: "text",
        value: globaltemp.contractor,
      },
    },
    {
      type: "Input",
      props: {
        key: "requestedBy",
        title: "SOLICITADO POR",
        type: "text",
        value: globaltemp.requestedBy,
      },
    },
    {
      type: "Input",
      props: {
        key: "total",
        title: "TOTAL",
        type: "number",
        value: globaltemp.total,
      },
    },
    {
      type: "AddItemDropDown",
      props: {
        key: "projectCategory",
        title: "CATEGORIA DE PROYETO",
        options: [
          "Gastos Indirectos",
          "Trabajos Preliminares",
          "Indirectos de construcción ",
          "Infraestructura",
          "Fundaciones",
          "Estructura",
          "Albañilería",
          "Electromecánica",
          "Acabados",
          "Dispositivos Especiales",
          "Equipamiento",
          "Indirectos de construcción",
        ],
        value: globaltemp.projectCategory,
      },
    },
    {
      type: "Input",
      props: {
        key: "invoiceDescription",
        title: "DESCIPCIÓN DE LA FACTURA",
        type: "number",
        value: globaltemp.invoiceDescription,
      },
    },
    {
      type: "AddItemDropDown",
      props: {
        key: "code",
        title: "CODIGO",
        options: codeOption,
        value: globaltemp.code,
      },
    },
    {
      type: "AddItemDropDown",
      props: {
        key: "subPhase",
        title: "SUB-FASE",
        options: items,
        value: globaltemp.subPhase,
      },
    },
    {
      type: "Input",
      props: {
        key: "orderNo",
        title: "NO. DE PEDIDO",
        type: "text",
        value: globaltemp.orderNo,
      },
    },
    
  ];
  let paymentComment = [
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
        key: "comment",
        title: "COMENTARIO",
        type: "text",
        value: globaltemp.comment,
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
          width: "230px",
          paddingLeft: "5px",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <Box style={{ marginRight: "10px" }}>
          <PaymentsIcon
            sx={{ width: "25px", height: "25px", color: "#F37021" }}
          />
        </Box>
        <Box style={{ marginTop: "-5px" }}>
          <Typography style={{ fontSize: "20px", fontWeight: "900" }}>
            Reporte de Pagos
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {ProjectPaymentReportForm.map((obj: any, j: number) => {
          return (
            <Grid
              key={j}
              item
              xs={4}
            >
              {React.createElement(formComponent[obj.type].component, {
                props: obj.props,
                disable: disable,
              })}
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2} style={{marginTop:'2px'}}>
                {paymentComment.map((obj: any, j: number) => {
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
    </Box>
  );
}

export default ProjectPaymentReportForm;
