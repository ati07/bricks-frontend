import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Box } from '@mui/material';
// import Title from './Title';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function LineCharts({ data }: any) {
  const theme = useTheme();
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const CustomizedAxisTick = (props: any) => {
    const { x, y, stroke, payload } = props;
    return <g className="recharts-layer recharts-cartesian-axis-tick"><text stroke="none" font-size="10px" font-weight="500" orientation="left" width="60" height="255" x="52" y="11.9921875" fill="#A3AED0" className="recharts-text recharts-cartesian-axis-tick-value" text-anchor="end">
      <tspan x={x} y={y} dy="">$ {payload.value / 1000} k</tspan>
    </text>
    </g>



  }
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
          {/* Won Vs Lost Revenue */}
        </Text>
      </Flex>
      <Box style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#A3AED0" fontSize='10px' fontWeight="500" />
            <YAxis axisLine={false} tickLine={false}
              tick={<CustomizedAxisTick />} />
            <Tooltip />
            {/* <Legend /> */}
            <Line type="monotone" strokeWidth={4} dataKey="Saved Revenue" stroke="#7551FF" />
            <Line type="monotone" strokeWidth={4} dataKey="Lost Revenue" stroke="#39B8FF" />
          </LineChart>
          {/* <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          width={500}
          height={300}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart> */}
        </ResponsiveContainer>
      </Box>

    </div>


  );
}