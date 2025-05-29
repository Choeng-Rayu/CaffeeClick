import React, { useState } from 'react';
import { getSizePrice } from '../../utils/priceUtils';

const MenuItem = ({ item, addToCart }) => {
  const [size, setSize] = useState(item.sizes[0]);
  const [customization, setCustomization] = useState(item.customizations[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    addToCart({ ...item, size, customization });
    setIsAdding(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {item.prepTime}
        </div>
        <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          {item.category}
        </div>
      </div>
      
      <div className="p-4 md:p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg md:text-xl font-bold dark:text-white line-clamp-1">
            {item.name}
          </h3>
          <span className="text-xl md:text-2xl font-bold text-amber-600 ml-2">
            ${getSizePrice(item.price, size).toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        {/* Size Selection */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {item.sizes.map((s) => (
              <option key={s} value={s}>
                {s} - ${getSizePrice(item.price, s).toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Customization Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Customization
          </label>
          <select
            value={customization}
            onChange={(e) => setCustomization(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {item.customizations.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Additional Info Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-amber-600 hover:text-amber-700 text-sm font-medium mb-3 flex items-center"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
          <span className={`ml-1 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Expandable Details */}
        {showDetails && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Calories:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  {item.calories[size] || 'N/A'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Prep Time:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">{item.prepTime}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Allergens:</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                {item.allergens.join(', ')}
              </span>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
            isAdding
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 hover:shadow-lg transform hover:scale-105'
          } text-white`}
        >
          {isAdding ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </div>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
