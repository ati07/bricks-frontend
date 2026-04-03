import React,{useEffect,useState} from "react";
import ReactApexChart from "react-apexcharts";

// class PieChart extends React.Component {
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
//         type='pie'
//         width='100%'
//         height='55%'
//       />
//     );
//   }
// }

function PieChart(props:any){
  const [state,setState] = useState({
    chartData: [],
    chartOptions: {},
  })
  useEffect(() => {
    setState({
      chartData: props.chartData,
      chartOptions: props.chartOptions,
    });
  }, [])
  
  return(
    <ReactApexChart
      options={state.chartOptions}
      series={state.chartData}
      type='pie'
      width='100%'
      height='55%'
    />
  );
}

export default PieChart;
