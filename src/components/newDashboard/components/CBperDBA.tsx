import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// import { VSeparator } from '../../components/common/separator/Separator';


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

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
// ];

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

export default function CBperDBA(props: any) {
  const [data ,setData] = useState<any>([])
    // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const COLORS = [ '#4318FF','#6AD2FF',"#EFF4FB"];
  useEffect(()=>{
//   console.log("propsCB",props);

    setData(props?.data)
  },[props.data])
//   console.log("dataObjectCB",data);

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
            dataKey="Quantity"
          >
            {data && data.map((entry:any, index:any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

      </ResponsiveContainer>
      <div style={{display:'flex',width:'100%',boxShadow:"0px 18px 40px rgba(112, 144, 176, 0.12)",
        padding:'15px',
        paddingLeft:'20px',
        paddingRight:'20px',
        marginTop:'15px',
        borderRadius: '20px',
        justifyContent:'center'
        // marginX:'auto'
        }}>
        <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='5px' w='5px' bg='#4318FF' borderRadius='50%' me='4px' />
            <Text
            style={{fontSize:'10px'}}
              // fontSize='small'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              {/* CB's per DBA */}
            </Text>
          </Flex>
          {/* <Text fontSize='lg' color={textColor} fontWeight='700'>
            {((data?.[0]?.value / (data?.[0]?.value + data?.[1]?.value))*100).toFixed(0)}%
          </Text> */}
        </Flex>
        {/* <VSeparator mx={{ base: "30px", xl: "30px", "2xl": "30px" }} />
        <Flex direction='column' py='5px' me='10px'>
          <Flex align='center'>
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
      </div>
    </div>
  );
  // }
}