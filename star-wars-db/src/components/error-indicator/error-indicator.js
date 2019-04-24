import React from "react";

import "./error-indicator.css";

import icon from './blowing_planet.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="blowing-planet" />
      <h3>Sorry something goes wrong!</h3>
      <span>We are already fixing this.</span>
    </div>
  );
};

export default ErrorIndicator;
