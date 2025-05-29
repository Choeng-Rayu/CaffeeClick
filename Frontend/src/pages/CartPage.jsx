import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { calculateSubtotal, calculateTax, calculateTotal, getSizePrice } from '../utils/priceUtils';
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/Cart/OrderSummary';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, setCart } = useCart();
  const navigate = useNavigate();
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const subtotal = calculateSubtotal(cart);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  const handleCheckout = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const orderData = {
        items: cart.map(item => ({
          ...item,
          finalPrice: getSizePrice(item.price, item.size)
        })),
        subtotal: subtotal,
        tax: tax,
        total: total,
        orderNotes: orderNotes,
        orderDate: new Date().toISOString(),
        estimatedTime: "15-20 minutes"
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In a real app, you would send orderData to your backend:
      // await axios.post(`${API_URL}/orders`, orderData);
      console.log("Order submitted:", orderData);

      // Clear cart and navigate to confirmation
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-8 text-center">
          <div className="text-5xl sm:text-6xl mb-4">🛒</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 dark:text-white">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
            Add some delicious items to get started!
          </p>
          <Link
            to="/menu"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 rounded-full transition duration-300 inline-block text-sm sm:text-base font-medium"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Navigation */}
        <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
          <Link
            to="/menu"
            className="flex items-center text-amber-600 hover:text-amber-700 transition duration-300 text-sm sm:text-base"
          >
            <FiArrowLeft className="mr-1 sm:mr-2" size={16} />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        {/* Mobile Order Summary (Top) */}
        <div className="lg:hidden mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold mb-3 dark:text-white">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tax (8%)</span>
                <span className="dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span className="dark:text-white">Total</span>
                  <span className="text-amber-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">
                Your Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {cart.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.size}-${item.customization}`}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>

              {/* Order Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Any special requests or dietary requirements..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none text-sm"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden lg:block lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              total={total}
              isSubmitting={isSubmitting}
              error={error}
              onCheckout={handleCheckout}
            />
          </div>
        </div>

        {/* Mobile Checkout Button (Bottom) */}
        <div className="lg:hidden mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
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
              onClick={handleCheckout}
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
                `Place Order - $${total.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
