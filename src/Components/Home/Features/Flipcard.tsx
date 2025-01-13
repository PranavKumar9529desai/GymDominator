"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  QrCode, 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  BarChart3, 
  Smartphone,
  Bell,
  ClipboardList,
  Calendar,
  LineChart,
  Shield,
  Target
} from "lucide-react";

// Extended icon map to include both front and back features
const iconMap = {
  // Front card icons
  "Smart QR Attendance": QrCode,
  "Personalized Diet": LayoutDashboard,
  "Trainer Assignment Hub": Users,
  "Personalized Fitness Journey": Dumbbell,
  "Advanced Analytics": BarChart3,
  "Member Portal": Smartphone,
  // Back card icons
  "Real-Time Notifications": Bell,
  "Workout Plan Management": ClipboardList,
  "Schedule Management": Calendar,
  "Progress Analytics": LineChart,
  "Multi-Role Access": Shield,
  "Goal Tracking": Target,
};

// Added back side content for each card
const backFeatures = {
  "Smart QR Attendance": {
    title: "Real-Time Notifications",
    description: "Instant updates on new plans, schedule changes, and gym announcements delivered directly to members.",
  },
  "Personalized Diet": {
    title: "Workout Plan Management",
    description: "Complete system for creating, updating, and tracking personalized workout routines for each member.",
  },
  "Trainer Assignment Hub": {
    title: "Schedule Management",
    description: "Efficient scheduling system for trainer assignments and member sessions.",
  },
  "Personalized Fitness Journey": {
    title: "Progress Analytics",
    description: "Detailed tracking and visualization of member progress over time.",
  },
  "Advanced Analytics": {
    title: "Multi-Role Access",
    description: "Secure, role-based access control for owners, trainers, and members.",
  },
  "Member Portal": {
    title: "Goal Tracking",
    description: "Comprehensive goal setting and achievement tracking for members.",
  },
};

interface FlipCardProps {
  title: string;
  description: string;
}

export const FlipCard = ({ title, description }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  const FrontIcon = iconMap[title as keyof typeof iconMap];
  const backFeature = backFeatures[title as keyof typeof backFeatures];
  const BackIcon = iconMap[backFeature.title as keyof typeof iconMap];

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isDesktop) return;

    const handleMouseEnter = () => {
      if (!hasFlipped) {
        setIsFlipped(true);
        setHasFlipped(true);
      }
    };

    const handleMouseLeave = () => {
      setIsFlipped(false);
      // Reset the flip state after leaving
      setTimeout(() => {
        setHasFlipped(false);
      }, 300);
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasFlipped, isDesktop]);

  const handleClick = () => {
    if (!isDesktop) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="flip-card h-[400px] w-full [perspective:1000px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={handleClick}
    >
      <div 
        className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]" 
        style={{ transform: isFlipped ? 'rotateY(180deg)' : '' }}
      >
        {/* Front Card */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="h-full p-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-lg backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  {FrontIcon && <FrontIcon className="w-6 h-6 text-white" />}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {title}
              </h3>
              <p className="text-gray-300 flex-grow">{description}</p>
              <div className="mt-6 text-sm text-gray-400 flex items-center gap-2">
                Click to see feature <span className="animate-pulse">→</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-xl" />
          </div>
        </div>

        {/* Back Card */}
        <div 
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="h-full p-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-lg hover:border-gray-600/50 transition-all duration-300">
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  {BackIcon && <BackIcon className="w-6 h-6 text-white" />}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {backFeature.title}
              </h3>
              <p className="text-gray-300 flex-grow">{backFeature.description}</p>
              <div className="mt-6 text-sm text-gray-400 flex items-center gap-2">
                Click to flip back <span className="animate-pulse">←</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
