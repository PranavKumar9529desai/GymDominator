import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDaysIcon } from "lucide-react";
export const ChallegeComponent = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const challenges = [
    {
      title: "Free 28-Day Challenge",
      description:
        "Get everything you need to lose up to 8 kg in 28 days in the healthiest and most natural way. We provide meal plans, grocery lists, food ordering guides, and access to an accountability coach, as well as a personalized fat loss program.",
      icon: <CalendarDaysIcon className="h-8 w-8" />,
      duration: "28 days",
    },
    {
      title: "42-Day Detox",
      description:
        "It takes six weeks of commitment to fully detoxify your body and lose over 10 kg of unhealthy fat naturally. We offer meal plans, grocery lists, food ordering guides, and support from an accountability coach to help you detoxify your body.",
      icon: <CalendarDaysIcon className="h-8 w-8" />,
      duration: "42 days",
    },
    {
      title: "12-Week Transformation",
      description:
        "Transform yourself in 12 weeks into a completely new identity. Join this challenge to strategically reduce body fat, tone your physique, and reveal the beautiful body within you. Change your life and become a better version of yourself.",
      icon: <CalendarDaysIcon className="h-8 w-8" />,
      duration: "12 weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-slate-400 to-blue-600 bg-clip-text text-transparent">
          Exclusive Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    animate={{
                      rotate: hoveredIndex === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-blue-400"
                  >
                    {challenge.icon}
                  </motion.div>
                  <span className="text-sm font-semibold text-blue-400">
                    {challenge.duration}
                  </span>
                </div>
                <h3 className=" text-blue-400 text-xl font-bold mb-2">{challenge.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 ">
                  {challenge.description}
                </p>
              </div>
              <div className="px-6 py-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                  Join Challenge
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
