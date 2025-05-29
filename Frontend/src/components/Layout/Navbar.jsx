import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSun, FiMoon, FiMapPin } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { cart } = useCart();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition duration-300">
          ☕ CoffeeClick
        </Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun className="text-white" /> : <FiMoon />}
          </button>
          
          <FiMapPin className="text-amber-600" />
          
          <Link to="/cart" className="relative group">
            <FiShoppingCart className="text-amber-600 group-hover:text-amber-700 transition duration-300" size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium animate-pulse">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
