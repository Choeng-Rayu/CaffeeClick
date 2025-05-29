import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 px-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 md:px-6 py-2 md:py-3 rounded-full transition duration-300 font-medium text-sm md:text-base ${
            selectedCategory === category
              ? "bg-amber-600 text-white shadow-lg transform scale-105"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-md hover:scale-105"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
