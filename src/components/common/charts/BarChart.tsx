import React, { Component,useState,useEffect } from "react";
import Chart from "react-apexcharts";

// class ColumnChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chartData: [],
//       chartOptions: {},
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       chartData: this.props.chartData,
//       chartOptions: this.props.chartOptions,
//     });
//   }

//   render() {
//     return (
//       <Chart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type='bar'
//         width='100%'
//         height='100%'
//       />
//     );
//   }
// }
function ColumnChart(props:any){
  const [state,setState] = useState({
            chartData: [],
            chartOptions: {},
  })
  useEffect(()=>{
    setState({
            chartData: props.chartData,
            chartOptions: props.chartOptions,
          });
  },[])
  return(
    <Chart
      options={state.chartOptions}
      series={[...state.chartData]}
      type='bar'
      width='100%'
      height='100%'
    />
  );
}

export default ColumnChart;
