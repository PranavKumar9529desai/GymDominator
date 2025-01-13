import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";

export function HeroSection() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current!, {
      strings: [
        "Member Management",
        "Attendance Tracking",
        "Payment Solutions",
        "Equipment Maintenance"
      ],
      typeSpeed: 40,
      backSpeed: 30,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <div className="text-center py-20 px-6 bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Gym Management Made Easy
      </motion.h1>
      <span
        ref={typedRef}
        className="block text-2xl md:text-3xl text-cyan-300"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >
        <button className="bg-white text-gray-900 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
