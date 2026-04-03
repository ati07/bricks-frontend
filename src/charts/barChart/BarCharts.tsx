import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { barData } from '../data';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Box } from '@mui/material';
function BarCharts({ data }: any) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

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
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='lg'
          fontWeight='700'
          lineHeight='100%'>
          {/* Performance chart */}
        </Text>
      </Flex>
      <Box style={{height:'250px'}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={330}
          height={250}
          data={data}
          margin={{
            top: 10,
            // right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis axisLine={false} tickLine={false} dataKey="name" stroke="#A3AED0" fontSize='10px' fontWeight= "500"/>
          <YAxis axisLine={false} tickLine={false} stroke="#A3AED0" fontSize='10px' fontWeight= "500"/>
          <Tooltip />
          {/* <Legend /> */}
          <Bar  dataKey="Amounts in US dollars" barSize={10} fill="#5E37FF" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
      </Box>
    </div>
  )
}

export default BarCharts