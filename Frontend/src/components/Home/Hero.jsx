import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e"
          className="w-full h-full object-cover"
          alt="Coffee Hero"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Welcome to CoffeeClick
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up animation-delay-200">
            Order your favorite drinks in just a few clicks
          </p>
          <button 
            onClick={() => navigate("/menu")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full transition duration-300 transform hover:scale-105 btn-hover-lift text-lg font-medium"
          >
            Start Ordering
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
