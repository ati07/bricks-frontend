import React from "react";
 
// import ComingSoon from "react-coming-soon";
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// import './styles.css';

// import video
import videoBg from './react.svg';
 
export default function ComingSoon() {
  return (
    <div style={{width:'100%',height:'600px'}}>
<section className='page' style={{display:'flex',height:'600px',justifyContent:"center",alignItems:"center"}}>
      {/* overlay */}
      <div className='overlay'></div>
      {/* <video src={videoBg} autoPlay loop muted /> */}
      <div className='page__content'>
        <h1>Launching Soon</h1>
        {/* <h3>
          Leave your email and we'll let you know once the site goes live.
        </h3> */}
        <FlipClockCountdown
          className='flip-clock'
          to={new Date().getTime() + 360 * 3600 * 1000 + 5000}
        />
        {/* <button className='btn'>Notify me</button> */}
      </div>
    </section>
    </div>
    
  );
}