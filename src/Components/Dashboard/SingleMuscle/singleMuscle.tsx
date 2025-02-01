import { FetchExcercise } from "@hooks/FetchExcercise";
import type { Excercisetype } from "@state/Selectors/ExcerciseSelectorsfamily";
import type { ExerciseWithMuscle } from "@state/Selectors/SingleWorkoutSelectorsFamily";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export const SingleMuscles = () => {
  let { muscle } = useParams<{ muscle: string }>();
  if (muscle === undefined) {
    muscle = "chest";
  }
  const { isLoading, Excercise } = FetchExcercise({ muscle });

  const filteredExercises = Excercise?.filter(
    (exercise) => exercise.muscle_group.toLowerCase() === muscle.toLowerCase()
  ).map((exercise: ExerciseWithMuscle): Excercisetype => ({
    name: exercise.name,
    img: exercise.image_url || "",
    instructions: exercise.instructions,
    videolink: exercise.video_url || "",
    MuscleGroup: {
      id: exercise.MuscleGroup.id,
      name: exercise.MuscleGroup.name,
      img: exercise.MuscleGroup.image_url || "",
      fullimage: exercise.muscle_image || "",
    },
  })) || [];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-4 mx-4 rounded-2xl shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTExLjk5NyAwYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
          <motion.div variants={itemVariants} className="relative flex flex-col items-center">
            <span className="px-4 py-1.5 bg-blue-500/20 rounded-full text-blue-100 text-sm font-medium mb-6">
              Workout Guide
            </span>
            <div className="space-y-4 text-center">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
                  {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                </span>
                <span className="ml-4 text-blue-100">Exercises</span>
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
                Discover professional-grade exercises designed to target and strengthen 
                your {muscle.toLowerCase()} muscles effectively.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Dumbbell className="w-12 h-12 text-blue-500 animate-bounce mb-4" />
            <PropagateLoader color="#3b82f6" />
          </div>
        ) : (
          <motion.div variants={itemVariants}>
            <RecommenedExcercise Excercises={filteredExercises} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const RecommenedExcercise = ({
  Excercises,
}: {
  Excercises: Excercisetype[];
}): JSX.Element => {
  const { muscle } = useParams<{ muscle: string }>();

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Available Exercises
          </h2>
          <p className="text-gray-500 mt-1">
            {Excercises.length} exercises available for {muscle?.toLowerCase()}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <Info className="w-4 h-4 text-blue-500" />
          <span>Click on any exercise to view detailed instructions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Excercises.map((excercise) => (
          <motion.div 
            key={`${excercise.name}-${excercise.MuscleGroup.id}`}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <ExcerciseCard name={excercise.name} img={excercise.img} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ExcerciseCard = ({
  name,
  img,
}: {
  name: string;
  img: string;
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl 
                 transition-all duration-300 border border-gray-100"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <img 
          src={img} 
          alt={`${name} exercise`} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-1">{name}</h3>
        <button
          type="button"
          onClick={() => navigate(`${name}`)}
          className="w-full inline-flex items-center justify-between px-5 py-3 text-sm font-medium
                   text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl
                   hover:from-blue-700 hover:to-blue-800 transition-all duration-200 group
                   shadow-sm hover:shadow-md"
        >
          <span>View Exercise</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
