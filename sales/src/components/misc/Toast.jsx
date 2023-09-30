// Toast.js

import React from 'react';

const Toast = ({ message, type, showToast, closeToast }) => {
  return (
    <div className={`toast ${type} ${showToast ? 'show' : ''}`}>
      <div className="toast-content">
        {message}
        <button onClick={closeToast} className="close-button">
          X
        </button>
      </div>
    </div>
  );
};

export default Toast;
