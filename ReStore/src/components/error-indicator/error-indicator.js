import React from 'react';

import './error-indicator.css';
import icon from './error-indicator.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon"/>
      <span className="boom">Oops...!</span>
      <span>
        something has gone terribly wrong
      </span>
    </div>
  );
};

export default ErrorIndicator;
