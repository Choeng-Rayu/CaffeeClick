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
    <div className="min-h-screen bg-black">
      {/* Futuristic Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-red-900/20"></div>
          {/* Particle Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Futuristic Back Navigation */}
          <div className="flex items-center mb-12">
            <Link
              to="/"
              className="group flex items-center px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-amber-400/50 rounded-2xl text-white/80 hover:text-white transition-all duration-300 font-bold tracking-wider"
            >
              <FiArrowLeft className="mr-3 group-hover:-translate-x-2 transition-transform duration-300" size={20} />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          {/* Revolutionary Header */}
          <div className="text-center">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/40 rounded-full text-amber-200 text-lg font-black mb-12 shadow-2xl tracking-wider">
              <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-4 animate-pulse shadow-lg"></div>
              ⚡ PREMIUM MENU EXPERIENCE ⚡
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tight">
              <span className="block bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent drop-shadow-2xl">
                MENU
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white/90 tracking-widest mt-4">
                CRAFTED • CURATED • PERFECTED
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl mb-16 max-w-4xl mx-auto leading-relaxed text-gray-100 font-light">
              Discover our <span className="font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">revolutionary collection</span> of
              <span className="font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"> artisan beverages</span> and premium treats.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">{filteredItems.length}+</div>
                <div className="text-white/80 font-bold tracking-wider">PREMIUM ITEMS</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">5min</div>
                <div className="text-white/80 font-bold tracking-wider">LIGHTNING FAST</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-white/80 font-bold tracking-wider">ALWAYS OPEN</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Content Area */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Revolutionary Category Filter */}
          <div className="mb-16">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Futuristic Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <MenuItem item={item} addToCart={addToCart} />
              </div>
            ))}
          </div>

          {/* Futuristic Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="text-8xl mb-8 animate-bounce">☕</div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 blur-3xl"></div>
              </div>
              <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                NO ITEMS FOUND
              </h3>
              <p className="text-white/60 text-xl font-light tracking-wider">
                Try selecting a different category to explore our collection
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                VIEW ALL ITEMS
              </button>
            </div>
          )}

          {/* Revolutionary Stats Section */}
          <div className="mt-20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-center text-2xl font-black text-white mb-8 tracking-wider">COLLECTION OVERVIEW</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="group">
                <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {coffeeData.filter(item => item.category === 'Hot Coffee').length}
                </div>
                <div className="text-white/80 font-bold tracking-wider">HOT COFFEES</div>
              </div>
              <div className="group">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {coffeeData.filter(item => item.category === 'Cold Coffee').length}
                </div>
                <div className="text-white/80 font-bold tracking-wider">COLD DRINKS</div>
              </div>
              <div className="group">
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {coffeeData.filter(item => item.category === 'Pastries').length}
                </div>
                <div className="text-white/80 font-bold tracking-wider">PASTRIES</div>
              </div>
              <div className="group">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {coffeeData.filter(item => item.category === 'Specialty').length}
                </div>
                <div className="text-white/80 font-bold tracking-wider">SPECIALTIES</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
