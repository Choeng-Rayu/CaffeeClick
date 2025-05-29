import React from 'react';

const OrderSummary = ({ subtotal, tax, total, isSubmitting, error, onCheckout }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
          <div className="flex justify-between text-xl font-bold dark:text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          🕒 Estimated prep time: 15-20 minutes
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <button 
        onClick={onCheckout}
        disabled={isSubmitting}
        className={`w-full py-4 rounded-lg font-medium transition-all duration-300 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700 hover:shadow-lg transform hover:scale-105'
        } text-white`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Placing Order...
          </div>
        ) : (
          'Place Order'
        )}
      </button>
    </div>
  );
};

export default OrderSummary;
