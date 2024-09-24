import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar'; 
import Sidebar from './components/Sidebar';
import BoxLayout from './components/BoxLayout';
import ItemList from './components/ItemList';
import Popup from './components/Popup'; 
import DropdownContainer from './components/DropdownContainer'; 
import './App.css'; 

const App = () => {
    const [items, setItems] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [date, setDate] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false); 
    const [savedData, setSavedData] = useState([]);
    const [error, setError] = useState('');

    const calculateTotals = (newItems) => {
        const totalPrice = newItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return total + (price * quantity);
        }, 0);

        const totalDiscount = newItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            const discountAmount = (price * quantity * (item.discount / 100)) || 0;
            return total + discountAmount;
        }, 0);

        return { totalPrice, totalDiscount };
    };

    const handleItemsChange = useCallback((newItems) => {
        const { totalPrice, totalDiscount } = calculateTotals(newItems);
        setItems(newItems);
        setTotalAmount(totalPrice);
        setTotalDiscount(totalDiscount);
    }, []);

    const handleCustomerIdChange = useCallback((id) => {
        setCustomerId(id);
    }, []);

    const handleDateChange = useCallback((newDate) => {
        setDate(newDate);
    }, []);

    const handleSubmit = () => {
        setError('');

        if (!customerId) {
            setError('Please enter a valid Customer ID');
            return;
        }
        if (!date) {
            setError('Please enter a valid Date');
            return;
        }
        if (items.length === 0 || items.some(item => !item.product || !item.price || !item.quantity)) {
            setError('Please fill in all item details');
            return;
        }

        const newData = { customerId, date, items, totalAmount, totalDiscount };

        const existingIndex = savedData.findIndex(data => data.customerId === customerId);
        if (existingIndex !== -1) {
            const updatedData = [...savedData];
            updatedData[existingIndex] = newData;
            setSavedData(updatedData);
        } else {
            setSavedData([...savedData, newData]);
        }

        setIsPopupVisible(true);
        setTimeout(() => setIsPopupVisible(false), 12000);

        resetFields();
    };

    const resetFields = () => {
        setCustomerId('');
        setDate('');
        setItems([]);
        setTotalAmount(0);
        setTotalDiscount(0);
        setError('');
    };

    // Handle selection from DropdownContainer
    const handleSelectSavedData = (data) => {
        if (data) {
            setCustomerId(data.customerId);
            setDate(data.date);
            setItems(data.items);
            setTotalAmount(data.totalAmount);
            setTotalDiscount(data.totalDiscount);
            setError('');
        }
    };

    return (
        <div>
            <Navbar /> 
            <Sidebar />
            <main>
                <BoxLayout 
                    onCustomerIdChange={handleCustomerIdChange} 
                    onDateChange={handleDateChange} 
                    customerId={customerId} 
                    date={date}
                />

                <ItemList 
                    onItemsChange={handleItemsChange} 
                    initialItems={items} 
                />

                <button onClick={handleSubmit} className="btn btn-primary btn-lg btn-custom">
                    Submit
                </button>

                <DropdownContainer
                    savedData={savedData}
                    onChange={handleSelectSavedData} 
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Popup 
                    customerId={customerId}
                    date={date}
                    totalPrice={totalAmount} 
                    totalDiscount={totalDiscount} 
                    totalAmount={totalAmount - totalDiscount}
                    isVisible={isPopupVisible} 
                    savedData={savedData}
                />
            </main>
        </div>
    );
};

export default App; 