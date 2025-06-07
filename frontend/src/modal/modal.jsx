import React from 'react';
// import './SimplePopup.css'; // We'll create this next
import '../modal/modal.css'

const SimplePopup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose} className="popup-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default SimplePopup;