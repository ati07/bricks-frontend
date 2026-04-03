import React,{useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";

// class LineChart extends React.Component {
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
//       <ReactApexChart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type='area'
//         width='100%'
//         height='100%'
//       />
//     );
//   }
// }
function LineChart(props:any){
  const [state,setState]= useState({
    chartData: [],
    chartOptions: {},
  })
  useEffect(()=>{
    setState({
      chartData: props.chartData,
      chartOptions: props.chartOptions,
    })
  },[])
  return (
          <ReactApexChart
            options={state.chartOptions}
            series={state.chartData}
            type='area'
            width='100%'
            height='100%'
          />
        );
}

export default LineChart;
