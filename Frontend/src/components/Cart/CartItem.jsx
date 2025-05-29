import React from 'react';
import { getSizePrice } from '../../utils/priceUtils';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-4 sm:space-y-0">
      <div className="flex items-center flex-1 w-full sm:w-auto">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" 
        />
        <div className="ml-4 flex-1 min-w-0">
          <h3 className="font-semibold text-base md:text-lg dark:text-white truncate">
            {item.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {item.size} • {item.customization}
          </p>
          <p className="text-amber-600 font-medium text-sm">
            ${getSizePrice(item.price, item.size).toFixed(2)} each
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-3">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
          <button
            onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition duration-200"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-1 border-x border-gray-300 dark:border-gray-600 dark:text-white min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item, item.quantity + 1)}
            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition duration-200"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item)}
          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition duration-300 ml-2"
          aria-label="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
