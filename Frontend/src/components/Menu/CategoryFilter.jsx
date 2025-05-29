import { useRef, useEffect } from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const scrollRef = useRef(null);

  // Category icons mapping
  const categoryIcons = {
    'All': '🌟',
    'Hot Coffee': '☕',
    'Cold Coffee': '🧊',
    'Specialty': '✨',
    'Pastries': '🥐',
    'Food': '🍽️'
  };

  // Auto-scroll to selected category on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const selectedButton = scrollRef.current.querySelector(`[data-category="${selectedCategory}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedCategory]);

  return (
    <div className="w-full">
      {/* Futuristic Section Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/40 rounded-full text-amber-200 text-lg font-black mb-8 shadow-2xl tracking-wider">
          <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-4 animate-pulse shadow-lg"></div>
          🎯 SELECT YOUR EXPERIENCE 🎯
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-4 tracking-tight">
          CATEGORIES
        </h2>
        <p className="text-xl text-white/80 font-light tracking-wider">
          Navigate through our premium collection
        </p>
      </div>

      {/* Futuristic Mobile Horizontal Scroll */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-8 px-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              data-category={category}
              onClick={() => onCategoryChange(category)}
              className={`group relative flex-shrink-0 flex flex-col items-center px-8 py-6 rounded-3xl transition-all duration-500 font-black text-sm whitespace-nowrap shadow-2xl border-2 ${
                selectedCategory === category
                  ? "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white shadow-amber-500/50 border-amber-400/50 transform scale-110"
                  : "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl text-white border-white/20 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-400/50 hover:shadow-amber-500/30 hover:scale-105"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <span className="relative z-10 text-3xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                {categoryIcons[category] || '📋'}
              </span>
              <span className="relative z-10 tracking-wider">{category}</span>
              {selectedCategory === category && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-pulse shadow-lg"></div>
              )}
            </button>
          ))}
        </div>
        <div className="text-center text-amber-400 mt-4 font-bold tracking-wider animate-pulse">
          ← SWIPE TO EXPLORE MORE →
        </div>
      </div>

      {/* Futuristic Desktop Grid */}
      <div className="hidden sm:flex flex-wrap justify-center gap-6 lg:gap-8 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`group relative flex flex-col items-center px-8 lg:px-12 py-6 lg:py-8 rounded-3xl transition-all duration-500 font-black text-base lg:text-lg shadow-2xl border-2 ${
              selectedCategory === category
                ? "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white shadow-amber-500/50 border-amber-400/50 transform scale-115"
                : "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl text-white border-white/20 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-400/50 hover:shadow-amber-500/30 hover:scale-110"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <span className="relative z-10 text-4xl lg:text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
              {categoryIcons[category] || '📋'}
            </span>
            <span className="relative z-10 text-center leading-tight tracking-wider">{category}</span>
            {selectedCategory === category && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full animate-pulse shadow-xl"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
          </button>
        ))}
      </div>

      {/* Futuristic Category Stats */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-lg text-white font-bold shadow-2xl tracking-wider">
          <span className="mr-3 text-2xl">🎯</span>
          SHOWING {selectedCategory === 'All' ? 'ALL' : selectedCategory.toUpperCase()} ITEMS
          <span className="ml-3 text-2xl animate-pulse">✨</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
