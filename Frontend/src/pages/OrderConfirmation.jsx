import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderNumber] = useState(() => Math.floor(Math.random() * 10000) + 1000);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const estimatedReadyTime = new Date(currentTime.getTime() + 18 * 60 * 1000); // 18 minutes from now

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full animate-fade-in-up">
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="text-green-500 text-6xl sm:text-7xl lg:text-8xl mb-2 animate-bounce-slow">✓</div>
          <div className="absolute inset-0 bg-green-100 dark:bg-green-900/20 rounded-full blur-xl opacity-50"></div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 dark:text-white">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
          Thank you for choosing CoffeeClick
        </p>

        {/* Order Details Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 sm:p-6 mb-6 border border-amber-200 dark:border-amber-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Order Number</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-600">#{orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Ready by</p>
              <p className="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-400">
                {estimatedReadyTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-800 dark:text-blue-200 font-medium text-sm">Order in Progress</span>
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm">
            Your delicious order is being prepared with care
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => navigate("/menu")}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base transform hover:scale-105 hover:shadow-lg"
          >
            Order More Items
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base"
          >
            Back to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center sm:justify-start">
              <span className="mr-2">📍</span>
              <span>Pick up at counter</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <span className="mr-2">🔔</span>
              <span>We'll call your number</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Questions? Ask our friendly staff for assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
