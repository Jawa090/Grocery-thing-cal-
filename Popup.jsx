import React from 'react';
import './Popup.css'; 

const Popup = ({ customerId, date, totalPrice, totalDiscount, totalAmount, isVisible, savedData  }) => {
    if (!isVisible) return null; 

    return (
        <div className="popup">
            <div className="popup-content">
                <h3>E-Khata</h3>
                <p><strong>Customer ID:</strong> {customerId}</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Total Price (before discount):</strong> ${totalPrice.toFixed(2)}</p>
                <p><strong>Total Discount:</strong> ${totalDiscount.toFixed(2)}</p>
                <p><strong>Total Amount (after discount):</strong> ${totalAmount.toFixed(2)}</p>
            
            </div>
        </div>
    );
};

export default Popup;  