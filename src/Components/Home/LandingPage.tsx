import { useNavigate } from "react-router-dom";
import { MainSection } from "./mainsection/mainsecion";
import { Footer } from "./Footer";
import greenTick from "@assets/green-tick-icon.png";
import GymHero from "@assets/bg.jpg";

const optimizedBgImage = new Image();
optimizedBgImage.src = GymHero;

export const LadingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="flex items-center justify-center h-screen relative overflow-hidden text-center text-lg">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
          style={{
            backgroundImage: `url(${GymHero})`,
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <section className="container relative z-10">
          <div className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 font-overpass"
               style={{ animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}>
            <p className="flex flex-col items-center gap-2">
              GymNavigator Will Ensure
              <span className="inline-block bg-gradient-to-r from-[#64dff4] to-[#03a3d7] text-transparent bg-clip-text">
                Your Consistency
              </span>
            </p>
          </div>

          <div className="flex justify-center text-white uppercase mb-12"
               style={{ animation: 'fadeInUp 0.5s ease-out 0.3s forwards' }}>
            <div className="my-1 mr-2">
              <img src={greenTick} alt="" width={20} height={18} loading="lazy" />
            </div>
            <p>start now and get 50% discount</p>
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
              className="bg-blue-600 px-5 py-3 rounded-lg text-white font-bold hover:bg-blue-800 transition-colors"
              style={{ animation: 'fadeInUp 0.5s ease-out 0.4s forwards' }}
            >
              Get Started
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
