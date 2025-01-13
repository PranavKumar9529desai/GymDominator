import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainSection } from "./mainsection/mainsecion";
import { Footer } from "./Footer";
import greenTick from "@assets/green-tick-icon.png";
import GymHero from "@assets/bg.jpg";

const optimizedBgImage = new Image();
optimizedBgImage.src = GymHero;

export const LadingPage = () => {
  const navigate = useNavigate();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if the custom font is loaded
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  return (
    <div>
      <header className="flex items-center justify-center h-screen relative overflow-hidden text-center text-lg">
        {/* Enhanced background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#080B15] via-[#0A1A3E] to-[#080B15] md:bg-none animate-gradient"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 25%, rgba(14, 37, 108, 0.4), transparent 50%),
              radial-gradient(circle at 80% 75%, rgba(5, 13, 40, 0.35), transparent 50%),
              radial-gradient(circle at center, rgba(14, 37, 108, 0.25), transparent 45%),
              linear-gradient(45deg, rgba(14, 37, 108, 0.15) 0%, transparent 70%),
              linear-gradient(135deg, rgba(5, 13, 40, 0.25) 10%, transparent 80%),
              radial-gradient(circle at 60% 30%, rgba(30, 64, 175, 0.15), transparent 35%)
            `,
            backgroundColor: '#050816'
          }}
        >
          {/* Image background only for md and larger screens */}
          <div 
            className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${GymHero})`,
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
        </div>
        
        <section className="container relative z-10 px-4 md:px-6">
          <div 
            className={`
              text-white text-3xl md:text-5xl lg:text-6xl font-extrabold 
              mb-12 px-3 md:px-0 transition-all duration-300 ease-out
              ${fontLoaded ? 'font-overpass' : 'font-sans'}
            `}
            style={{ animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}
          >
            <p className="flex flex-col items-center gap-4 md:gap-2">
              <span className="leading-tight relative">
                GymNavigator Will Ensure
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
              </span>
              <span className={`
                inline-block bg-gradient-to-r from-[#64dff4] via-[#4db8f5] to-[#03a3d7] 
                text-transparent bg-clip-text relative leading-tight
                transition-all duration-300 ease-out transform hover:scale-105
                ${fontLoaded ? 'font-overpass' : 'font-sans'}
              `}>
                Your Consistency
                {/* Enhanced glow effect */}
                <span className="absolute -bottom-4 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-md"></span>
                <span className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/70 to-transparent"></span>
              </span>
            </p>
          </div>

          <div className="flex justify-center text-white uppercase mb-16 relative group"
               style={{ animation: 'fadeInUp 0.5s ease-out 0.3s forwards' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="my-1 mr-2">
              <img src={greenTick} alt="" width={20} height={18} loading="lazy" />
            </div>
            <p className="relative z-10">start now and get 50% discount</p>
          </div>

          <div className="w-full flex justify-center items-end h-full mt-8">
            <button
              onClick={() => {
                if (localStorage.getItem("jwt") === null) {
                  navigate("/signin");
                } else {
                  navigate("/dashboard/");
                }
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-in-out"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-lg group-hover:opacity-90"></span>
              <span className="relative flex items-center gap-2 text-lg">
                Get Started
                <svg 
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </section>
      </header>

      <section className="bg-white h-screen w-full" id="about-us">
        <MainSection />
        <div className="border-t border-gray-800">
          <Footer />
        </div>
      </section>
    </div>
  );
};
