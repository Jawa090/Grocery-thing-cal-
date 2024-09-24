import React, { useState, useEffect } from 'react';
import './BoxLayout.css'; 

const BoxLayout = ({ onCustomerIdChange, onDateChange, customerId, date }) => {
  const [localCustomerId, setLocalCustomerId] = useState(customerId || '');
  const [localDate, setLocalDate] = useState(date || '');
  const [error, setError] = useState('');


  useEffect(() => {
    setLocalCustomerId(customerId || '');
    setLocalDate(date || '');
  }, [customerId, date]);


  const handleCustomerIdChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]*$/;  // Allow only letters and spaces
    if (regex.test(value)) {
      setLocalCustomerId(value);
      setError('');
      onCustomerIdChange(value); 
    } else {
      setError('Invalid input: Only alphabetic characters are allowed.');
    }
  };

  // Handle Date change
  const handleDateChange = (e) => {
    const value = e.target.value;
    setLocalDate(value);
    onDateChange(value);  
  };

  return (
    <div className="box-container">
      <div className="box">
        <label htmlFor="customer-id">Customer ID</label>
        <input 
          type="text" 
          id="customer-id" 
          placeholder="Enter Customer ID" 
          value={localCustomerId}  
          onChange={handleCustomerIdChange}                             
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="box">
        <label htmlFor="date">Date</label>
        <input 
          type="date" 
          id="date" 
          value={localDate} 
          onChange={handleDateChange} 
        />
      </div>
    </div>
  );
};

export default BoxLayout;