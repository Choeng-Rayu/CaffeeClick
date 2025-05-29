import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-amber-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Revolutionary Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                ☕
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent tracking-tight">
                COFFEE
              </span>
              <span className="text-lg font-light text-white/80 tracking-widest -mt-1">
                CLICK
              </span>
            </div>
          </Link>

          {/* Futuristic Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="group relative px-6 py-3 text-white/90 hover:text-white transition-all duration-300 font-bold tracking-wider">
              <span className="relative z-10">HOME</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>

            <Link to="/menu" className="group relative px-6 py-3 text-white/90 hover:text-white transition-all duration-300 font-bold tracking-wider">
              <span className="relative z-10">MENU</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>

            <Link to="/cart" className="group relative px-6 py-3 text-white/90 hover:text-white transition-all duration-300 font-bold tracking-wider">
              <span className="relative z-10">CART</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-black animate-pulse shadow-lg">
                  {cart.length}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
            </Link>

            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-white/20">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="group p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                {darkMode ? (
                  <FiSun className="text-yellow-400 group-hover:scale-125 group-hover:rotate-180 transition-all duration-500" size={22} />
                ) : (
                  <FiMoon className="text-white/80 group-hover:scale-125 group-hover:rotate-180 transition-all duration-500" size={22} />
                )}
              </button>

              <Link to="/cart" className="group relative">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-110">
                  <FiShoppingCart className="text-white group-hover:scale-110 transition-transform duration-300" size={22} />
                </div>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-black animate-bounce shadow-xl">
                    {cart.length}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Futuristic Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="group p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              {darkMode ? (
                <FiSun className="text-yellow-400 group-hover:scale-125 group-hover:rotate-180 transition-all duration-500" size={20} />
              ) : (
                <FiMoon className="text-white/80 group-hover:scale-125 group-hover:rotate-180 transition-all duration-500" size={20} />
              )}
            </button>

            <Link to="/cart" className="group relative">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 transition-all duration-300 shadow-xl hover:scale-110">
                <FiShoppingCart className="text-white group-hover:scale-110 transition-transform duration-300" size={20} />
              </div>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black animate-bounce shadow-lg">
                  {cart.length}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300"></div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-white group-hover:scale-125 group-hover:rotate-180 transition-all duration-500" size={24} />
              ) : (
                <FiMenu className="text-white group-hover:scale-125 transition-all duration-300" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Futuristic Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-amber-500/20 bg-black/90 backdrop-blur-2xl">
            <div className="px-6 pt-6 pb-8 space-y-4">
              <Link
                to="/"
                className="group flex items-center px-6 py-4 rounded-2xl text-lg font-black text-white/90 hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-4 text-2xl group-hover:scale-125 transition-transform">🏠</span>
                <span className="tracking-wider">HOME</span>
                <span className="ml-auto group-hover:translate-x-2 transition-transform">→</span>
              </Link>

              <Link
                to="/menu"
                className="group flex items-center px-6 py-4 rounded-2xl text-lg font-black text-white/90 hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-4 text-2xl group-hover:scale-125 transition-transform">📋</span>
                <span className="tracking-wider">MENU</span>
                <span className="ml-auto group-hover:translate-x-2 transition-transform">→</span>
              </Link>

              <Link
                to="/cart"
                className="group flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-black text-white/90 hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <span className="mr-4 text-2xl group-hover:scale-125 transition-transform">🛒</span>
                  <span className="tracking-wider">CART</span>
                </div>
                <div className="flex items-center space-x-3">
                  {cart.length > 0 && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full px-4 py-2 text-sm font-black shadow-lg">
                      {cart.length}
                    </span>
                  )}
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>

              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-400/30">
                  <span className="mr-3 text-xl">📍</span>
                  <span className="text-amber-300 font-bold tracking-wider">AVAILABLE FOR PICKUP</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
