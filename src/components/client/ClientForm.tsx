import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { formComponent } from '../../formComponents/FormComponentsObject'
import { RootState } from '../../redux/app/store'
import Person4Icon from '@mui/icons-material/Person4';

function ClientForm({ disable }: any) {
  const data = useSelector((state:RootState)=>state.globaltemp)
  const common = useSelector((state: RootState) => state.commonData)
  const globaltemp = data.data
    const ClientForm = [
        // {
        //     type: 'MultipleSelect',
        //     props: {
        //         key: 'merchant',
        //         title: "Merchant",
        //         options: common.merchants,
        //         value: globaltemp.merchant ?? []

        //     }
        // },
        {
            type: 'Input',
            props: {
                key: 'name',
                title: "Name",
                type: 'text',
                value: globaltemp.name
            }
        },
        // {
        //     type: 'Input',
        //     props: {
        //         key: 'unitName',
        //         title: "NOMBRE DE UNIDAD",
        //         type: 'text',
        //         value: globaltemp.unitName
        //     }
        // },
        {
            type: 'Input',
            props: {
                key: 'phoneNumber',
                title: "Phone Number",
                type: 'number',
                value: globaltemp.phoneNumber
            }
        },
        {
            type: 'Input',
            props: {
                key: 'email',
                title: "Email",
                type: 'email',
                value: globaltemp.email
            }
        }
    ]
    return (



        <Box style={{display:'flex',flexDirection:'column'}}>
        <Box style={{display:'flex', 
            // backgroundColor:'#F370214f',
            
            paddingTop:'10px',paddingBottom:'10px',width:'210px',paddingLeft:'5px',marginBottom:'20px'}}>
            <Box style={{marginRight:'10px'}}>
             <Person4Icon sx={{width:'25px', height:'25px',color:"#F37021"}}/>
            </Box>
            <Box>
                <Typography style={{fontSize:'20px',fontWeight:"900",}}>
                    Cliente
                </Typography>
                
            </Box>
        </Box>    
        <Grid container spacing={2} >
          {ClientForm.map((obj: any, j: number) => {
                return <Grid key={j} item xs={6}>
                    {React.createElement(formComponent[obj.type].component, { props: obj.props, disable: disable })}
                </Grid>
            })}
        </Grid>

    </Box>
        
    )
}

export default ClientForm