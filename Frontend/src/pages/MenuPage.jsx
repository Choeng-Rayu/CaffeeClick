import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { coffeeData, categories } from '../data/menuData';
import { useCart } from '../context/CartContext';
import CategoryFilter from '../components/Menu/CategoryFilter';
import MenuItem from '../components/Menu/MenuItem';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  
  const filteredItems = selectedCategory === "All" 
    ? coffeeData 
    : coffeeData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Back Navigation */}
        <div className="flex items-center mb-6 md:mb-8">
          <Link 
            to="/" 
            className="flex items-center text-amber-600 hover:text-amber-700 transition duration-300"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Our Menu
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            Freshly brewed coffee and delicious treats
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              addToCart={addToCart} 
            />
          ))}
        </div>

        {/* No Items Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
