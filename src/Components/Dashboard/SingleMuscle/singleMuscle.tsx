import { FetchExcercise } from "@hooks/FetchExcercise";
import type { Excercisetype } from "@state/Selectors/ExcerciseSelectorsfamily";
import type { ExerciseWithMuscle } from "@state/Selectors/SingleWorkoutSelectorsFamily";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Dumbbell,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const SingleMuscles = () => {
  let { muscle } = useParams<{ muscle: string }>();
  if (muscle === undefined) {
    muscle = "chest";
  }
  const { isLoading, Excercise } = FetchExcercise({ muscle });

  const filteredExercises =
    Excercise?.filter(
      (exercise) => exercise.muscle_group.toLowerCase() === muscle.toLowerCase()
    ).map(
      (exercise: ExerciseWithMuscle): Excercisetype => ({
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
      })
    ) || [];

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
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col items-center"
          >
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
                Discover professional-grade exercises designed to target and
                strengthen your {muscle.toLowerCase()} muscles effectively.
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
  // const { muscle } = useParams<{ muscle: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const difficultyOptions = [
    { value: "Beginner", color: "bg-green-500", label: "Beginner" },
    { value: "Intermediate", color: "bg-yellow-500", label: "Intermediate" },
    { value: "Advanced", color: "bg-red-500", label: "Advanced" },
  ];

  const toggleFilter = (filter: string) => {
    setDifficultyFilter((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
    // Close filter after selection
    setIsFilterOpen(false);
  };

  const filteredExercises = Excercises.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter.length === 0 ||
      (exercise.instructions.length > 500 &&
        difficultyFilter.includes("Advanced")) ||
      (exercise.instructions.length > 200 &&
        difficultyFilter.includes("Intermediate")) ||
      (exercise.instructions.length <= 200 &&
        difficultyFilter.includes("Beginner"));

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-8 relative">
      {" "}
      {/* Added relative positioning */}
      {/* Overlay when filter is open */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-30"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
      {/* Search and Filter Bar */}
      <div className=" z-40 backdrop-blur-sm py-4">
        {" "}
        {/* Increased z-index */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span>Filter</span>
                <div className="relative">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                  {difficultyFilter.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {difficultyFilter.length}
                    </span>
                  )}
                </div>
              </button>

              {isFilterOpen && (
                <div className="fixed md:absolute inset-x-0 bottom-0 md:bottom-auto md:right-0 md:top-full mt-2 md:mt-0 md:w-48 bg-white border border-gray-200 rounded-t-2xl md:rounded-2xl shadow-2xl md:shadow-lg p-4 md:p-2 z-50 max-h-[70vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4 md:hidden">
                    <h3 className="text-lg font-semibold">
                      Filter by Difficulty
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {difficultyOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={difficultyFilter.includes(option.value)}
                          onChange={() => toggleFilter(option.value)}
                          className="hidden"
                        />
                        <div
                          className={`w-3 h-3 rounded-full ${option.color} ${
                            difficultyFilter.includes(option.value)
                              ? "ring-2 ring-offset-2 ring-blue-500"
                              : ""
                          }`}
                        />
                        <span className="text-sm whitespace-nowrap">
                          {option.label}
                        </span>
                        {difficultyFilter.includes(option.value) && (
                          <Check className="w-4 h-4 ml-auto text-blue-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Exercise Grid with lower z-index */}
      <div className="relative z-10">
        {" "}
        {/* Added relative positioning and lower z-index */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {filteredExercises.map((excercise) => (
            <motion.div
              key={`${excercise.name}-${excercise.MuscleGroup.id}`}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <ExcerciseCard
                name={excercise.name}
                img={excercise.img}
                instructions={excercise.instructions}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExcerciseCard = ({
  name,
  img,
  instructions,
}: {
  name: string;
  img: string;
  instructions: string;
}): JSX.Element => {
  const navigate = useNavigate();

  // Calculate difficulty based on instruction length
  const difficulty =
    instructions.length > 500
      ? "Advanced"
      : instructions.length > 200
      ? "Intermediate"
      : "Beginner";

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl 
                 transition-all duration-300 border border-gray-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <img
          src={img}
          alt={`${name} exercise`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2 right-2 px-3 py-1 text-sm font-medium rounded-full backdrop-blur-sm bg-white/50">
          {difficulty}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(`${name}`)}
            className="flex-1 inline-flex items-center justify-between px-5 py-3 text-sm font-medium
                     text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl
                     hover:from-blue-700 hover:to-blue-800 transition-all duration-200 group
                     shadow-sm hover:shadow-md"
          >
            <span>View Exercise</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
