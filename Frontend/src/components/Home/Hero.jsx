import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-amber-900/30 to-black/90"></div>
      </div>

      {/* Particle Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className={`text-center max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/40 rounded-full text-amber-200 text-sm font-bold mb-8 shadow-2xl">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-3 animate-pulse shadow-lg"></div>
            ✨ PREMIUM ARTISAN COFFEE EXPERIENCE ✨
          </div>

          {/* Revolutionary Heading */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 leading-none tracking-tight">
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl">
                COFFEE
              </span>
              <span className="block bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
                CLICK
              </span>
            </h1>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-widest">
              CRAFT • CLICK • CONSUME
            </div>
          </div>

          {/* Revolutionary Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-100 font-light">
            Where <span className="font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">artisan craftsmanship</span> meets
            <span className="font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"> digital innovation</span>.
            Experience coffee like never before.
          </p>

          {/* Revolutionary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <button
              onClick={() => navigate("/menu")}
              className="group relative w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-12 py-6 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 text-xl font-black shadow-2xl hover:shadow-amber-500/50 overflow-hidden border-2 border-amber-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-3 text-2xl">🚀</span>
                START YOUR JOURNEY
                <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300 text-2xl">→</span>
              </span>
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="group relative w-full sm:w-auto bg-white/5 backdrop-blur-xl border-2 border-white/40 hover:bg-white/15 hover:border-white/70 text-white px-12 py-6 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 text-xl font-black shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-3 text-2xl">📋</span>
                EXPLORE MENU
                <span className="ml-3 group-hover:rotate-12 transition-transform duration-300 text-2xl">✨</span>
              </span>
            </button>
          </div>

          {/* Revolutionary Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
            <div className="group relative text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-400/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center text-3xl mb-8 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                  ☕
                </div>
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-amber-300 transition-colors duration-300">ARTISAN CRAFT</h3>
                <p className="text-gray-300 leading-relaxed text-lg">Hand-selected beans from premium farms worldwide. Roasted to perfection by master craftsmen daily.</p>
              </div>
            </div>

            <div className="group relative text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-400/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center text-3xl mb-8 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                  ⚡
                </div>
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-green-300 transition-colors duration-300">LIGHTNING SPEED</h3>
                <p className="text-gray-300 leading-relaxed text-lg">Revolutionary ordering system. Your perfect coffee ready in under 10 minutes guaranteed.</p>
              </div>
            </div>

            <div className="group relative text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-3xl mb-8 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                  🚀
                </div>
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">FUTURE TECH</h3>
                <p className="text-gray-300 leading-relaxed text-lg">AI-powered recommendations. Smart ordering. Zero friction experience from click to sip.</p>
              </div>
            </div>
          </div>

          {/* Revolutionary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="group text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-amber-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-gray-300 text-sm font-bold tracking-wider">COFFEE LOVERS</div>
            </div>
            <div className="group text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">100+</div>
              <div className="text-gray-300 text-sm font-bold tracking-wider">PREMIUM BLENDS</div>
            </div>
            <div className="group text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">5min</div>
              <div className="text-gray-300 text-sm font-bold tracking-wider">LIGHTNING FAST</div>
            </div>
            <div className="group text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-gray-300 text-sm font-bold tracking-wider">ALWAYS OPEN</div>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <div className="flex flex-col items-center group cursor-pointer">
          <span className="text-sm mb-3 font-bold tracking-wider group-hover:text-amber-400 transition-colors">DISCOVER MORE</span>
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center group-hover:border-amber-400/60 transition-colors">
            <div className="w-2 h-4 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full mt-2 animate-pulse group-hover:animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
