import React, { useState, useEffect } from 'react';
import './ItemList.css';

const ItemList = ({ onItemsChange, initialItems }) => {
    const [items, setItems] = useState(initialItems || []);

    // Update items when initialItems changes, without triggering on every render
    useEffect(() => {
        if (initialItems && initialItems.length !== items.length) {
            setItems(initialItems);
        }
    }, [initialItems]);

    // Trigger onItemsChange only when items change
    useEffect(() => {
        onItemsChange(items);
    }, [items]);  // Removed the comparison logic entirely

    const addItem = () => {
        const newItem = { product: '', price: '', quantity: '', discount: '', totalAmount: 0 };
        setItems(prevItems => [...prevItems, newItem]);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newValue = name === 'discount' ? Math.min(parseFloat(value) || 0, 100) : value;

        setItems(prevItems => {
            const newItems = prevItems.map((item, i) => {
                if (i === index) {
                    const updatedItem = { ...item, [name]: newValue };
                    updatedItem.totalAmount = calculateTotalAmount(updatedItem);
                    return updatedItem;
                }
                return item;
            });
            return newItems;
        });
    };

    const removeItem = (index) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const calculateTotalAmount = (item) => {
        const { price, quantity, discount } = item;
        const totalPrice = (parseFloat(price) || 0) * (parseInt(quantity, 10) || 0);
        const discountAmount = (totalPrice * (discount / 100)) || 0;
        return totalPrice - discountAmount;
    };

    return (
        <div className="item-list-container">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Discount (%)</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        name="product"
                                        value={item.product}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="price"
                                        value={item.price}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={item.discount}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </td>
                                <td>{item.totalAmount.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => removeItem(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="add-button" onClick={addItem}>+</button>
        </div>
    );
};

export default ItemList;
