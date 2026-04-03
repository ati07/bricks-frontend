/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const RADIAN = Math.PI / 180;
// const data = [
//   { name: 'B', value: 100, color: '#F37021' },
// ];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;
// const value = 50;

const needle = (value:any, data:any, cx:any, cy:any, iR:any, oR:any, color:any) => {
  let total = 0;
  data.forEach((v:any) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};
// 
export default  function NeedleCharts({data,value}:any) {
  // console.log('value',value)
    return (
      <PieChart width={300} height={250} style={{marginTop:'-50px'}}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#F37021"
          stroke="none"
          
        //   width={250}
        //   height={300}
        >
          {data.map((entry:any, index:number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          
        </Pie>
        {needle(value, data, cx, cy, iR, oR, '#000000')}
        <Tooltip />
      </PieChart>
    );
  
}
