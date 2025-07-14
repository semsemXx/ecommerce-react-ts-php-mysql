import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Main from './Components/Main';
import LoginPage from './Components/LoginPage';
import NavBar from './Components/Navbar';
import ProductsPage from './Components/ProductsPage';
import SingleProduct from './Components/SingleProduct';
import Design from './Components/Design';
import Cart from './Components/Cart';
import AdminPanel from './Components/AdminPanel';
import { UserProvider } from './Context/UserContext';


function AppContent() {
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<'loggedIn' | null>(null);
  const location = useLocation();
  const game = [
    {
      id: "1",
      title: "Assassin's Creed Shadows",
      price: "7,99 $US",
      category: "Jeu de base",
      supportedPlatforms: ["PlayStation", "Xbox", "Windows"] ,
      rating : '3.5',
    }
  ];
  const handleAuthChange = (type: 'login' | 'signup') => {
    setAuthType(type);
  };

  const handleUserChange = (userStatus: 'loggedIn' | null) => {
    setUser(userStatus);
  };

  // Define where NavBar should appear
  const showNavBar = ['/', '/Products'].includes(location.pathname);

  return (
    <div style={{ height: '100%', background: 'black' }}>
      {showNavBar && (
        <NavBar 
          onAuthChange={handleAuthChange} 
          onUserChange={handleUserChange}
        />
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<LoginPage authType={authType} />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Single-Product" element={<SingleProduct game={game}/>} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Design" element={<Design />} />
        <Route path="/Admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
    <Router>
      <AppContent />
    </Router>
    </UserProvider>
  );
}

export default App;