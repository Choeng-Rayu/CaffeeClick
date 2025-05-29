// Utility functions for price calculations

export const getSizePrice = (basePrice, selectedSize) => {
  const sizeMultiplier = {
    'Small': 1,
    'Medium': 1.2,
    'Large': 1.4,
    'Regular': 1
  };
  return basePrice * (sizeMultiplier[selectedSize] || 1);
};

export const calculateSubtotal = (cart) => {
  return cart.reduce((sum, item) => sum + getSizePrice(item.price, item.size) * item.quantity, 0);
};

export const calculateTax = (subtotal, taxRate = 0.08) => {
  return subtotal * taxRate;
};

export const calculateTotal = (subtotal, tax) => {
  return subtotal + tax;
};
