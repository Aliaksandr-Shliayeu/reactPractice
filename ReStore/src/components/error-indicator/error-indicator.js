import React from "react";
import "./error-indicator.css";
import img from "./error-indicator.png";

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img className="error-indicator-image" src={img} alt="error" />
      <div className="error-indicator-text">Error!</div>
    </div>
  );
};

export default ErrorIndicator;
