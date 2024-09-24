import React, { useState } from 'react';
import './Sidebar.css';
import { FaHome, FaInfoCircle, FaServicestack, FaPhone, FaDollarSign, FaBars } from 'react-icons/fa';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    
      <div className="menu-bar">
        <FaBars onClick={toggleSidebar} className="hamburger-icon" />
      </div>

      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <a href="/" className="sidebar-link">
            <FaHome className="icon" />
            <span className="link-text">Home</span>
          </a>
          <a href="/" className="sidebar-link">
            <FaInfoCircle className="icon" />
            <span className="link-text">About</span>
          </a>
          <a href="/" className="sidebar-link">
            <FaServicestack className="icon" />
            <span className="link-text">Services</span>
          </a>
          <a href="/" className="sidebar-link">
            <FaPhone className="icon" />
            <span className="link-text">Contact</span>
          </a>
          <a href="/" className="sidebar-link">
            <FaDollarSign className="icon" />
            <span className="link-text">Sell/Price</span>
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;