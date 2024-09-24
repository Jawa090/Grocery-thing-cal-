import React, { useState } from 'react';
import './DropdownContainer.css';

const DropdownContainer = ({ savedData, onChange }) => {
    const [selectedId, setSelectedId] = useState('');
    const [selectedData, setSelectedData] = useState(null);

    const handleSelect = (e) => {
        const id = e.target.value;
        setSelectedId(id);

        const data = savedData.find(item => item.customerId === id);
        if (data) {
            onChange(data);  // Pass the selected data back to App component
            setSelectedData(data); // Set the selected data for receipt
        } else {
            setSelectedData(null); // Reset if no data found
        }
    };

    return (
        <div className="dropdown-container">
            <select value={selectedId} onChange={handleSelect} className="dropdown">
                <option value="">Select Customer ID</option>
                {savedData.map(data => (
                    <option key={data.customerId} value={data.customerId}>
                        {data.customerId}
                    </option>
                ))}
            </select>

            {selectedData && (
                <div className="receipt">
                    <h2>Customer Receipt</h2>
                    <p><strong>Customer ID:</strong> {selectedData.customerId}</p>
                    <p><strong>Date:</strong> {selectedData.date}</p>
                    <h3>Items:</h3>
                    <ul>
                        {selectedData.items.map((item, index) => (
                            <li key={index}>
                                {item.product} - Price: {item.price}, Quantity: {item.quantity}, Discount: {item.discount}%, Total: {item.totalAmount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total Amount:</strong> {selectedData.totalAmount.toFixed(2)}</p>
                    <p><strong>Total Discount:</strong> {selectedData.totalDiscount.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}; 

export default DropdownContainer;
