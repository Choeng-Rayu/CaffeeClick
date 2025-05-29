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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Add some delicious items to get started!
            </p>
            <Link 
              to="/menu" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full transition duration-300 inline-block"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Back Navigation */}
        <div className="flex items-center mb-6 md:mb-8">
          <Link 
            to="/menu" 
            className="flex items-center text-amber-600 hover:text-amber-700 transition duration-300"
          >
            <FiArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-6 dark:text-white">
                Your Order ({cart.length} items)
              </h2>
              
              <div className="space-y-4">
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
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
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
      </div>
    </div>
  );
};

export default CartPage;
