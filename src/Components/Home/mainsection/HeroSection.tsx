import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import greenTick from "@assets/green-tick-icon.png";
import GymHero from "@assets/bg.jpg";

const optimizedBgImage = new Image();
optimizedBgImage.src = GymHero;

export default function HeroSection({ fontLoaded }: { fontLoaded: boolean }) {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <header className="flex items-center justify-center h-screen relative overflow-hidden text-center text-lg">
      {/* Mobile Particles Background */}
      <div className="block md:hidden w-full h-full absolute inset-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: {
              enable: false
            },
            background: {
              color: {
                value: "#050816"
              }
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: false
                },
                onHover: {
                  enable: true,
                  mode: "repulse"
                },
                resize: true
              },
              modes: {
                repulse: {
                  distance: 200,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: ["#64dff4", "#4db8f5", "#03a3d7"]
              },
              links: {
                color: "#4db8f5",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce"
                },
                random: false,
                speed: 2,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  area: 800
                },
                value: 80
              },
              opacity: {
                value: 0.5,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.1
                }
              },
              shape: {
                type: "circle"
              },
              size: {
                value: { min: 1, max: 5 }
              }
            },
            detectRetina: true
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Desktop Background Image */}
      <div className="hidden md:block absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${GymHero})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>
      
      <section className="container relative z-10 px-4 md:px-6">
        {/* Hero Content */}
        <div className={`
          text-white text-3xl md:text-5xl lg:text-6xl font-extrabold 
          mb-12 px-3 md:px-0 transition-all duration-300 ease-out
          ${fontLoaded ? 'font-overpass' : 'font-sans'}
        `}>
          <p className="flex flex-col items-center gap-4 md:gap-2">
            <span className="leading-tight relative">
              GymNavigator Will Ensure
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-t from-transparent via-blue-500 to-transparent"></span>
            </span>
            <span className={`
              inline-block bg-gradient-to-r from-[#64dff4] via-[#4db8f5] to-[#03a3d7] 
              text-transparent bg-clip-text relative leading-tight
              transition-all duration-300 ease-out transform hover:scale-105
              ${fontLoaded ? 'font-overpass' : 'font-sans'}
            `}>
              Your Consistency
              <span className="absolute -bottom-4 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-md"></span>
              <span className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/70 to-transparent"></span>
            </span>
          </p>
        </div>

        {/* Subtitle */}
        <div className="flex justify-center items-center text-white uppercase mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center space-x-2">
            <img src={greenTick} alt="" className="w-4 h-4 md:w-5 md:h-5" />
            <p className="relative z-10 text-sm md:text-base tracking-[0.5px]">Gym management made easy</p>
          </div>
        </div>

        {/* CTA Button */}
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
  );
}
