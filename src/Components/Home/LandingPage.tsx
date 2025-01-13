import { useState, useEffect } from "react";
import { Footer } from "./Footer";
import HeroSection from "./mainsection/HeroSection";
import { MainSection } from "./mainsection/mainsecion";

export const LandingPage = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <HeroSection fontLoaded={fontLoaded} />
      <MainSection />
      <Footer />
    </div>
  );
};
