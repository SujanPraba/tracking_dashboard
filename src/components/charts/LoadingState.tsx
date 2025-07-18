import React from 'react';
import loadergif from "../../assets/loader.svg";

const LoadingState = () => (
  <div className="h-[300px] w-full flex items-center justify-center">
    <img src={loadergif} alt="loading" className="w-18 h-18" />
  </div>
);

export default LoadingState; 