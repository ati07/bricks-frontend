import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { formComponent } from '../../formComponents/FormComponentsObject'
import { RootState } from '../../redux/app/store'
import Person4Icon from '@mui/icons-material/Person4';

function ProviderForm({disable}:any) {
    const data = useSelector((state:RootState)=>state.globaltemp)
      const common = useSelector((state: RootState) => state.commonData)
      const globaltemp = data.data
        const ProviderForm = [
            {
                type: 'Input',
                props: {
                    key: 'name',
                    title: "Name",
                    type: 'text',
                    value: globaltemp.name
                }
            },
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
            },
            {
                type:"Input",
                props:{
                    key:'serviceType',
                    title:"Service type",
                    value:globaltemp.serviceType
                }
            },
            {
                type:"Input",
                props:{
                    key:'contactPerson',
                    title:"contact person",
                    value:globaltemp.contactPerson
                }
            }
            ,
            {
                type:"Input",
                props:{
                    key:'project',
                    title:"Proyecto",
                    value:globaltemp.project
                }
            }
            ,
            {
                type:"Input",
                props:{
                    key:'snCode',
                    title:"Código SN",
                    value:globaltemp.snCode
                }
            }
            ,
            {
                type:"Input",
                props:{
                    key:'snName',
                    title:"Nombre SN",
                    value:globaltemp.snName
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
                    Proveedores
                </Typography>
                
            </Box>
        </Box>    
        <Grid container spacing={2} >
          {ProviderForm.map((obj: any, j: number) => {
                return <Grid key={j} item xs={6}>
                    {React.createElement(formComponent[obj.type].component, { props: obj.props, disable: disable })}
                </Grid>
            })}
        </Grid>

    </Box>
  )
}

export default ProviderForm