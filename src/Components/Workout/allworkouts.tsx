import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Dumbbell, ArrowRight } from 'lucide-react';
import { Input } from "@components/ui/input";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export const Allworkouts = () => {
  const { isLoading, muscles } = FetchMusclesGroups();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMuscles, setFilteredMuscles] = useState(muscles);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredMuscles(
      muscles.filter(muscle => 
        muscle.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, muscles]);

  const handleMuscleClick = (muscleName: string) => {
    navigate(`/dashboard/workouts/${muscleName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen  p-4 md:p-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
          Choose Your Training Focus
        </h1>
        <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
          Select a muscle group to explore targeted exercises
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search muscle groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Dumbbell className="w-10 h-10 text-blue-500" />
          </motion.div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {filteredMuscles.map((muscle) => (
            
              <motion.div
                key={muscle.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative group"
                onClick={() => handleMuscleClick(muscle.name)}
              >
                <div 
                  className="cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={muscle.img} 
                      alt={muscle.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-100 mb-2">
                      {muscle.name.charAt(0).toUpperCase() + muscle.name.slice(1).toLowerCase()}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Discover exercises targeting your {muscle.name.toLowerCase()} muscles
                    </p>
                    <button className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                      View Exercises
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
