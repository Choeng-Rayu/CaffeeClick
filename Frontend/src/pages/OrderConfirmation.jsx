import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderNumber] = useState(() => Math.floor(Math.random() * 10000) + 1000);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
        <div className="text-green-500 text-6xl md:text-7xl mb-6">✓</div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
          Order Confirmed!
        </h2>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Order Number</p>
          <p className="text-xl md:text-2xl font-bold text-amber-600">#{orderNumber}</p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Your order has been received and is being prepared.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Estimated prep time: 15-20 minutes
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate("/menu")}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition duration-300 font-medium"
          >
            Order More Items
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-6 py-3 rounded-lg transition duration-300 font-medium"
          >
            Back to Home
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You can track your order status at the counter or ask our staff for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
