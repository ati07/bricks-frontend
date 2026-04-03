import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { VSeparator } from '../../components/common/separator/Separator';
import { Stack, ThemeProvider, Typography, useTheme } from '@mui/material';
// import theme from '../../theme/theme';


// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieCharts(props: any) {
  const [data ,setData] = useState<any>([])
  const theme = useTheme();
    // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const COLORS = [ '#6AD2FF','#4318FF'];
  useEffect(()=>{
    setData([
      { name: 'Chargebacks', value: props.data.TotalCB },
      { name: 'Disputes Resolved', value: props.data.AvoidedChargebacks },
    ])
  },[props.data])
  // console.log("dataObjectPie",data);
  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
      borderRadius: '20px',
      minWidth: '0px',
      wordWrap: 'break-word',
      background: '#ffffff',
      backgroundClip: 'border-box',
      height:"100%",
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data && data.map((entry:any, index:any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

      </ResponsiveContainer>
      <div style={{display:'flex',width:'100%',boxShadow:"0px 18px 40px rgba(112, 144, 176, 0.12)",
        // padding:'15px',
        // paddingLeft:'10px',
        // paddingRight:'10px',
        marginTop:'15px',
        borderRadius: '20px',
        // marginX:'auto'
        }}>
          {/* <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Chargebacks
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            {((data?.[0]?.value / (data?.[0]?.value + data?.[1]?.value))*100).toFixed(0)}%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "20px", xl: "20px", "2xl": "20px" }} />
        <Flex direction='column' py='5px' me='-12px'>
          <Flex align='center' justifyContent='center' >
            <Box h='8px' w='8px' bg='#4318FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Disputes Resolved 
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
          {((data?.[1]?.value / (data?.[0]?.value + data?.[1]?.value))*100).toFixed(0)}%
          </Text>
        </Flex> */}
          <ThemeProvider theme={theme}>
        <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='4px' w='4px' bg='#6AD2FF' borderRadius='50%' me='4px' />
            <Typography
            style={{fontSize:'10px',color:'#A3AED0',fontWeight:'700',marginBottom:'5px'}}
              // fontSize='small'
              // color='secondaryGray.600'
              // fontWeight='700'
              // mb='5px'
              >
              {/* Chargebacks */}
            </Typography>
          </Flex>
          <Text fontSize='small' color={textColor} fontWeight='700'>
            {((data?.[0]?.value / (data?.[0]?.value + data?.[1]?.value))*100).toFixed(0)}%
          </Text>
        </Flex>
        <Box style={{width:'1px',height:'100%',backgroundColor:'rgba(135, 140, 189, 0.3)',marginRight:'10px',marginLeft:'10px'}}></Box>
        {/* <VSeparator mx={{ base: "20px",lg:'20px', xl: "20px", "2xl": "20px" }} /> */}
        <Stack style={{flexDirection:'column',paddingTop:'5px',paddingBottom:'5px',}} >
          <Stack style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}  >
            <Box h='4px' w='4px' bg='#4318FF' borderRadius='50%' me='4px' />
            <Typography
            style={{fontSize:'10px',color:'#A3AED0',fontWeight:'700',marginBottom:'5px'}}
              // fontSize='small'
              // color='secondaryGray.600'
              // fontWeight='700'
              // mb='5px'
              >
              {/* Disputes Resolved  */}
            </Typography>
          </Stack>
          <Typography style={{color:'',fontWeight:'700',fontSize:'14px'}} fontSize='small' color={textColor} >
          {((data?.[1]?.value / (data?.[0]?.value + data?.[1]?.value))*100).toFixed(0)}%
          </Typography>
        </Stack>
        </ThemeProvider>
      </div>
    </div>
  );
  // }
}