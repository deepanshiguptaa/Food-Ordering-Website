import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './components/login/login';
import ContactUs from './pages/ContactUs';
import PaymentWrapper from './components/PaymentWrapper'; 

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  // 🛑 You need a state variable for the order total
  // For now, I'm hardcoding a test value (e.g., $25.50 = 2550 cents)
  const [orderTotal, setOrderTotal] = useState(2550); 

  useEffect(() => {
    document.body.setAttribute('data-theme', 'light');
    // In a real app, you would fetch or calculate the orderTotal here
  }, []);

  return (
    <div>
      <Navbar setShowLogin={setShowLogin}/>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          {/* 🎯 Payment is initialized ONLY on the order page */}
          <Route path='/cart/order' element={
            <div className="order-page-container">
              <PlaceOrder />
              {/* Pass the order total to the wrapper */}
              <PaymentWrapper orderTotal={orderTotal} /> 
            </div>
          }/>
          <Route path='/contactUs' element={<ContactUs/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;