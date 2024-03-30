import React, { useState } from 'react';
import './Hamburger.css';
import Sidebar from '../Sidebar/Sidebar';

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
      <div className="hamburger-menu__icon" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {menuOpen && <Sidebar />}
    </div>
  );
};

export default Hamburger;
