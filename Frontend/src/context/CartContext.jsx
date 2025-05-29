import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((i) => 
        i.id === item.id && i.size === item.size && i.customization === item.customization
      );
      
      if (existingItemIndex !== -1) {
        return prevCart.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => 
      !(item.id === itemToRemove.id && 
        item.size === itemToRemove.size && 
        item.customization === itemToRemove.customization)
    ));
  };

  const updateQuantity = (itemToUpdate, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemToUpdate);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id === itemToUpdate.id && 
         item.size === itemToUpdate.size && 
         item.customization === itemToUpdate.customization)
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
