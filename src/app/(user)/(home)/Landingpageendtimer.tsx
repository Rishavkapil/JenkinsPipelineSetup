"use client";

import React from "react";
import { useTimer } from "react-timer-hook";

const LandingPageTimer = ({ expiryTimestamp }: any) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  }); 
  return (
    <>
      <ul>
        <div className="timer_inner">
          <li>{days < 10 ? "0" + days : days}</li>
          <span>Days</span>
        </div>
        <div className="timer_inner">
          <li>{hours}</li>
          <span>Hours</span>
        </div>
        <div className="timer_inner">
          <li>{minutes}</li>
          <span>Minutes</span>
        </div>
        <div className="timer_inner">
          <li>{seconds}</li>
          <span>Seconds</span>
        </div>
      </ul>
      {/* <h5>{isRunning ? <React.Fragment /> : ""}</h5> */}
    </>
  );
};

export default LandingPageTimer;
