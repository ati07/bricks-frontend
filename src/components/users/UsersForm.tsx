import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { formComponent } from '../../formComponents/FormComponentsObject'
import { RootState } from '../../redux/app/store'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

function UsersForm({ disable }: any) {
  const data = useSelector((state:RootState)=>state.globaltemp)
  const common = useSelector((state: RootState) => state.commonData)
  const globaltemp = data.data
  
    const UsersForm = [
        {
            type: 'Input',
            props: {
                key: 'name',
                title: "User Name",
                type: 'text',
                value: globaltemp.name
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
            type: 'Input',
            props: {
                key: 'password',
                title: "Generated Password",
                type: 'text',
                value: globaltemp.password
            }
        },
        // {
        //     type: 'DropDown',
        //     props: {
        //         key: 'client',
        //         component:'users',
        //         title: "Client",
        //         options: common.clients,
        //         value: JSON.parse(localStorage.getItem('user') ?? '').role ==='Admin'? globaltemp.client:JSON.parse(localStorage.getItem('user') ?? '').client
        //     }
        // },
        {
            type: 'DropDown',
            props: {
                key: 'role',
                title: "Role",
                // options: JSON.parse(localStorage.getItem('user') ?? '').role ==='Admin'?['Admin','User','Client']:['User'],
                options: JSON.parse(localStorage.getItem('user') ?? '').role ==='Admin'?['Super Admin','Admin','User']:['User'],

                value: globaltemp.role
            }
        }
        // {
        //     type: 'Date',
        //     props: {
        //         key: 'dateCreated',
        //         title: "Date Created",
        //         value: globaltemp.dateCreated
        //     }
        // }
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
          alignItems:"center"
        }}
      >
        <Box style={{ marginRight: "10px" }}>
          <PermIdentityOutlinedIcon
            sx={{ width: "25px", height: "25px", color: "#F37021" }}
          />
        </Box>
        <Box style={{marginTop:'-5px'}}>
          <Typography style={{ fontSize: "20px", fontWeight: "900" }}>
          Usuarios
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2} >
            {UsersForm.map((obj: any, j: number) => {
                return <Grid key={j} item xs={6}>
                    {React.createElement(formComponent[obj.type].component, { props: obj.props, disable: disable })}
                </Grid>
            })}
        </Grid>
    </Box>


        
    )
}

export default UsersForm