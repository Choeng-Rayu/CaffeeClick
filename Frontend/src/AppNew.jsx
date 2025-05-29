import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Layout/Navbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <CartProvider>
        <div className={darkMode ? "dark" : ""}>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/confirmation" element={<OrderConfirmation />} />
            </Routes>
          </div>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
