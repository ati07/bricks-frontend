import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/app/store'
import { Box, Grid, Typography } from '@mui/material'
import { formComponent } from '../../formComponents/FormComponentsObject'
import InventoryIcon from '@mui/icons-material/Inventory';

function InventoryForm({ disable }: any) {
    const data = useSelector((state:RootState)=>state.globaltemp)
    const common = useSelector((state: RootState) => state.commonData)
    const globaltemp = data.data
    

    const handleMet = (value:any)=>{
        console.log("value",value)
    }
    const InventoryForm:any = [
        {
            type: 'Input',
            props: {
                key: 'client',
                title: "CLIENTE",
                type: 'text',
                value: globaltemp.client
            }
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
            type: 'Input',
            props: {
                key: 'unitName',
                title: "NOMBRE DE UNIDAD",
                type: 'text',
                value: globaltemp.unitName
            }
        },
        {
            type: 'AddItemDropDown',
            props: {
                key: 'status',
                title: "ESTATUS",
                options: ["RESERVADO",
                    "DISPONIBLE",
                    "ENTREGADO",
                    "VENDIDO",
                    "ALQUILADO",
                    ],
                value: globaltemp.status
            }
        },
        {
            type: 'Input',
            props: {
                key: 'squareMeters',
                title: "Metros Cuadrados",
                type: 'number',
                value: globaltemp.squareMeters,
                // callBack:handleMet
            }
        },
        {
            type: 'Input',
            props: {
                key: 'unitArea',
                title: "UNIT AREA (SQ FT)",
                type: 'number',
                value: globaltemp.unitArea,
                disable:true
            }
        },
        {
            type: 'Input',
            props: {
                key: 'priceUnit',
                title: "PRECIO POR UNIDAD",
                type: 'number',
                value: globaltemp.priceUnit
            }
        },
        {
            type: 'Input',
            props: {
                key: 'priceList',
                title: "PRECIO LISTA",
                type: 'number',
                value: globaltemp.priceList
            }
        },
        {
            type: 'DropDown',
            props: {
                key: 'rooms',
                title: "HABITACIONES",
                options: ['1','2','3','4','5','6','7','8','9','10'],
                value: globaltemp.rooms
            }
        },
        {
            type: 'DropDown',
            props: {
                key: 'parking',
                title: "Parking",
                options: ['1','2','3','4','5','6','7','8','9','10'],
                value: globaltemp.parking
            }
        },
        {
            type: 'DropDown',
            props: {
                key: 'bathroom',
                title: "BANO",
                options: ['1','2','3','4','5','6','7','8','9','10'],
                value: globaltemp.bathroom
            }
        },
        {
            type: 'DropDown',
            props: {
                key: 'deposit',
                title: "Deposito",
                options: ['1','2','3','4','5','6','7','8','9','10'],
                value: globaltemp.deposit

            }
        },
        {
            type: 'DropDown',
            props: {
                key: 'view',
                title: "VISTA",
                options: ['Sea', 'Golf Course', 'Marina', 'Beach Club'],
                value: globaltemp.view
            }
        },
        {
            type: 'Date',
            props: {
                key: 'signatureDate',
                title: "FIRMA DE CONTRATO",
                type: 'text',
                value: globaltemp.signatureDate
            }
        }
    ]

    let invertoryComment = [
        {
            type: "DropDown",
            props: {
              key: "user",
              title: "USUARIO",
              options: ['',''],
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
          width: "210px",
          paddingLeft: "5px",
          marginBottom: "10px",
        }}
      >
        <Box style={{ marginRight: "10px" }}>
          <InventoryIcon
            sx={{ width: "25px", height: "25px", color: "#F37021" }}
          />
        </Box>
        <Box>
          <Typography style={{ fontSize: "20px", fontWeight: "900" }}>
          Inventario
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2} >
            {InventoryForm.map((obj: any, j: number) => {
                return <Grid key={j} item xs={4}>
                    {React.createElement(formComponent[obj.type].component, { props: obj.props, disable: disable })}
                </Grid>
            })}
        </Grid>

        <Grid container spacing={2} style={{marginTop:'2px'}}>
                        {invertoryComment.map((obj: any, j: number) => {
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
    
  )
}

export default InventoryForm