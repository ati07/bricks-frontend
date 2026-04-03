import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../../components/common/card/Card';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

function VerticalBarChart({ dataCode }: any) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const data = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
  ];
  const getPath = (x: any, y: any, width: any, height: any) => (
    `M${x},${y + height}
     C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
     C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
     Z`
  );
  const TriangleBar = (props: any) => {
    const {
      fill, x, y, width, height,
    } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    // <Box h='auto' mt='auto'>
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
          {/* Top 5 Chargeback Reasons Code */}
        </Text>
      </Flex>
      <Box style={{height:'300px'}}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={550}
          height={400}
          data={dataCode}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 0,
          }}
        >
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <XAxis axisLine={false} tickLine={false} type="number" stroke="#A3AED0" fontSize='10px' fontWeight="500" />
          <YAxis axisLine={false} tickLine={false} dataKey="name" type="category" stroke="#A3AED0" fontSize={'10px'} fontWeight="500" />
          <Tooltip />
          {/* <Legend stroke='#A3AED0' /> */}
          {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> number*/}
          <Bar dataKey="Quantities" barSize={10} fill="#5E37FF" />
          {/* shape={<TriangleBar />} */}
          {/* <Line dataKey="uv" stroke="#ff7300" /> Quantity*/}
        </ComposedChart>
      </ResponsiveContainer>
      </Box>
    </div >
    //  </Box>

  )
}

export default VerticalBarChart