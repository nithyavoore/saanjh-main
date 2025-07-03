import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <Link to="/" className="flex-shrink-0">
            <img
              src="./logo.png"
              className="h-12 w-auto"
              alt="Logo"
            />
          </Link>

          <div className={`md:flex md:items-center md:space-x-6  ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col md:flex-row md:space-x-4">
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link to="/login" className="text-white text-lg mb-2 md:mb-0 md:mr-2">Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <button onClick={handleLogout} className="text-white text-lg mb-2 md:mb-0 md:mr-2">Logout</button>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to="/profile" className="text-white text-lg mb-2 md:mb-0">Profile</Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to="/form" className="text-white text-lg mb-2 md:mb-0 md:mr-2">Form</Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to="/chatbot" className="text-white text-lg mb-2 md:mb-0 md:mr-2">Chatbot</Link>
                </li>
              )}
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
