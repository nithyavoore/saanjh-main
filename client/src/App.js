import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Form from './components/Form';
import Profile from './components/Profile';
import Sign from './components/Sign';
import ChatBot from './components/ChatBot';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginState = sessionStorage.getItem('isLoggedIn');
    if (loginState) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/form' element={<Form />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Sign />} />
        <Route path='/chatbot' element={<ChatBot />} />
      </Routes>
    </div>
  );
};

export default App;
