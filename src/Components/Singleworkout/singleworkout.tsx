import { FetchSingleWorkout } from "@hooks/FetchSingleWorkout";
import type { ExerciseWithMuscle } from "@state/Selectors/SingleWorkoutSelectorsFamily";
import { AnimatePresence, motion } from "framer-motion";
import { BookMarked, ChevronRight, Heart, Play, Share2, Target } from "lucide-react";
import { useState } from 'react';
import { useParams } from "react-router-dom";

export const SingleWorkout = () => {
  const { workoutname = "", muscle = "" } = useParams<{
    workoutname: string;
    muscle: string;
  }>();

  const { isLoading, exercise, error } = FetchSingleWorkout({ workoutname, muscle });
  const [isLiked, setIsLiked] = useState(false);

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[60vh] bg-red-50 mx-4 rounded-2xl"
      >
        <div className="text-center space-y-4 p-8">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-500">Exercise Not Found</h2>
          <p className="text-gray-600 max-w-md">We couldn't load this exercise. Please try again or choose a different one.</p>
        </div>
      </motion.div>
    );
  }

  if (isLoading || !exercise) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          <div className="mt-4 text-blue-600 font-medium">Loading exercise...</div>
        </div>
      </div>
    );
  }

  const videoId = exercise.video_url?.split("/").pop() || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Exercise Header */}
      <div className="space-y-6 mb-12">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
        >
          {exercise.name}
        </motion.h1>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-blue-700 font-medium">{muscle}</span>
          </div>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <BookMarked className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        <VideoComponent videoId={videoId} />
      </div>

      {/* Exercise Details */}
      <div className="mt-16">
        <ExerciseDescription
          img={exercise.muscle_image || ""}
          instruction={exercise.instructions}
          muscleName={exercise.muscle_group}
        />
      </div>
    </motion.div>
  );
};

const VideoComponent = ({ videoId }: { videoId: string }) => {
  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?start=0`}
        title="Exercise demonstration video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

const ExerciseDescription = ({
  instruction,
  muscleName,
  img,
}: {
  instruction: string;
  muscleName: string;
  img: string;
}) => {
  // Clean and process instructions
  const instructions = instruction
    .split(".")
    .map(line => {
      // Remove leading numbers and dots if they exist
      const cleanLine = line.replace(/^\d+\.?\s*/, '')
        // Remove all \n characters and multiple spaces
        .replace(/\\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return cleanLine;
    })
    .filter(line => line.length > 0); // Remove empty lines

  return (
    <div className="space-y-12">
      {/* Muscle Group Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl">
        <div className="flex items-center justify-center gap-4">
          <Target className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-blue-900">
            {muscleName.toUpperCase()}
          </h2>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 gap-12">
        {/* Muscle Image */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          <img 
            src={img} 
            alt={`Diagram showing ${muscleName} muscle group`}
            className="w-full rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 lg:mt-0 space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Step-by-Step Guide</h3>
          {instructions.map((line, index) => (
            <motion.div
              key={`${muscleName}-instruction-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{line}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full text-blue-600 font-medium">
          <Heart className="w-4 h-4" />
          <span>Subscribe to GymNavigator for more content</span>
        </div>
      </div>
    </div>
  );
};
