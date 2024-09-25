import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ customerId, date, totalPrice, totalDiscount, totalAmount, isVisible, items }) => {
    if (!isVisible) return null;

    const [newProduct, setNewProduct] = useState({
        productName: '',
        price: '',
        quantity: '',
        discount: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = () => {
        // Add your logic to handle adding the product to items
        console.log(newProduct);
        setNewProduct({ productName: '', price: '', quantity: '', discount: '' }); // Reset form after adding
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h3>E-Khata</h3>
                
                {/* Company Information */}
                <div className="company-info">
                    <p><strong>Company:</strong> E-Khata</p>
                    <p><strong>Address:</strong> 123 Street, Lahore</p>
                    <p><strong>Phone:</strong> 122-345-678</p>
                    <p><strong>Email:</strong> asli@gmail.com</p>
                </div>

                {/* Receipt Table */}
                <table className="receipt-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product}</td>
                                <td>{item.quantity}</td>
                                <td>${parseFloat(item.price || 0).toFixed(2)}</td>
                                <td>${(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Customer ID and Date */}
                <div className="receipt-header">
                    <p><strong>Customer ID:</strong> {customerId}</p>
                    <p><strong>Date:</strong> {date}</p>
                </div>

                {/* Product Entry Form */}
                <div className="product-entry">
                    <h4>Add Product</h4>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={newProduct.productName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={newProduct.quantity}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="discount"
                        placeholder="Discount (%)"
                        value={newProduct.discount}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddProduct}>Add</button>
                </div>

                {/* Receipt Summary */}
                <div className="receipt-summary">
                    <p><strong>Total Price (before discount):</strong> ${totalPrice ? totalPrice.toFixed(2) : '0.00'}</p>
                    <p><strong>Total Discount:</strong> ${totalDiscount ? totalDiscount.toFixed(2) : '0.00'}</p>
                    <p><strong>Total Amount (after discount):</strong> ${totalAmount ? totalAmount.toFixed(2) : '0.00'}</p>
                </div>
            </div>
        </div>
    );
};

export default Popup;
