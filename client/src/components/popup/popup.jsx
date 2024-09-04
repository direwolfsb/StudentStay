import React from 'react';
import './popup.css'; // CSS for styling the popup

const Popup = ({ message, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Success!</h2>
                <p>{message}</p>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Popup;