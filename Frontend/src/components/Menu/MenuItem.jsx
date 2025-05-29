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
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 h-full flex flex-col border border-gray-100 dark:border-gray-700">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⏱️ {item.prepTime}
        </div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          {item.category}
        </div>

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="text-2xl mb-2">👀</div>
            <div className="text-sm font-medium">Quick View</div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
        <div className="flex flex-col mb-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black dark:text-white mb-2 group-hover:text-amber-600 transition-colors duration-300">
            {item.name}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">(4.8)</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ${getSizePrice(item.price, size).toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
            🌱 Organic
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs font-medium rounded-full">
            ❄️ Available Iced
          </span>
          {item.calories[size] && item.calories[size] < 100 && (
            <span className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs font-medium rounded-full">
              💪 Low Cal
            </span>
          )}
        </div>

        {/* Size and Customization Grid */}
        <div className="space-y-4 mb-6">
          {/* Size Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Choose Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {item.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                    size === s
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-bold">{s}</div>
                    <div className="text-xs opacity-75">${getSizePrice(item.price, s).toFixed(2)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Customization Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Customization
            </label>
            <select
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              className="w-full p-3 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white transition-all duration-300 font-medium"
            >
              {item.customizations.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Info Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-amber-600 hover:text-amber-700 text-xs sm:text-sm font-medium mb-3 flex items-center w-full justify-center sm:justify-start"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
          <span className={`ml-1 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Expandable Details */}
        {showDetails && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex justify-between sm:block">
                <span className="font-medium text-gray-700 dark:text-gray-300">Calories:</span>
                <span className="text-gray-600 dark:text-gray-400 sm:ml-1">
                  {item.calories[size] || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between sm:block">
                <span className="font-medium text-gray-700 dark:text-gray-300">Prep Time:</span>
                <span className="text-gray-600 dark:text-gray-400 sm:ml-1">{item.prepTime}</span>
              </div>
            </div>
            <div className="mt-2 flex justify-between sm:block">
              <span className="font-medium text-gray-700 dark:text-gray-300">Allergens:</span>
              <span className="text-gray-600 dark:text-gray-400 sm:ml-1">
                {item.allergens.join(', ')}
              </span>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`group relative w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden ${
              isAdding
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1'
            } text-white shadow-xl`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isAdding ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span>Adding to Cart...</span>
                </>
              ) : (
                <>
                  <span className="mr-2 text-lg">🛒</span>
                  Add to Cart
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </span>
            {!isAdding && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            )}
          </button>

          {/* Quick Add Info */}
          <div className="mt-3 text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                In Stock
              </span>
              <span className="flex items-center">
                <span className="mr-1">⚡</span>
                Fast Prep
              </span>
              <span className="flex items-center">
                <span className="mr-1">🔥</span>
                Popular
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
