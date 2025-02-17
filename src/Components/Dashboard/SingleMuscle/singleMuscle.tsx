import { FetchExcercise } from '@hooks/FetchExcercise';
import type { Excercisetype } from '@state/Selectors/ExcerciseSelectorsfamily';
import type { ExerciseWithMuscle } from '@state/Selectors/SingleWorkoutSelectorsFamily';
import { m } from '@util/lib/motion';
import { ArrowRight, Check, ChevronDown, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    muscle = 'chest';
  }
  const { isLoading, Excercise } = FetchExcercise({ muscle });

  const filteredExercises =
    Excercise?.filter(
      (exercise) => exercise.muscle_group.toLowerCase() === muscle.toLowerCase()
    ).map(
      (exercise: ExerciseWithMuscle): Excercisetype => ({
        name: exercise.name,
        img: exercise.image_url || '',
        instructions: exercise.instructions,
        videolink: exercise.video_url || '',
        MuscleGroup: {
          id: exercise.MuscleGroup.id,
          name: exercise.MuscleGroup.name,
          img: exercise.MuscleGroup.image_url || '',
          fullimage: exercise.muscle_image || '',
        },
      })
    ) || [];

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-4 mx-4 rounded-2xl shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTExLjk5NyAwYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
          <m.div variants={itemVariants} className="relative flex flex-col items-center">
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
                Discover professional-grade exercises designed to target and strengthen your{' '}
                {muscle.toLowerCase()} muscles effectively.
              </p>
            </div>
          </m.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
            <p className="mt-4 text-blue-600 font-medium">Loading exercises...</p>
          </div>
        ) : (
          <m.div variants={itemVariants}>
            <RecommenedExcercise Excercises={filteredExercises} />
          </m.div>
        )}
      </div>
    </m.div>
  );
};

const RecommenedExcercise = ({
  Excercises,
}: {
  Excercises: Excercisetype[];
}): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const difficultyOptions = [
    { value: 'Beginner', color: 'bg-green-500', label: 'Beginner', icon: '🟢' },
    {
      value: 'Intermediate',
      color: 'bg-yellow-500',
      label: 'Intermediate',
      icon: '🟡',
    },
    { value: 'Advanced', color: 'bg-red-500', label: 'Advanced', icon: '🔴' },
  ];

  const toggleFilter = (filter: string) => {
    setDifficultyFilter((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredExercises = Excercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter.length === 0 ||
      (exercise.instructions.length > 500 && difficultyFilter.includes('Advanced')) ||
      (exercise.instructions.length > 200 && difficultyFilter.includes('Intermediate')) ||
      (exercise.instructions.length <= 200 && difficultyFilter.includes('Beginner'));

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className=" z-40 bg-white shadow-sm rounded-2xl border border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Mobile View */}
          <div className="block md:hidden">
            <div className="p-4 space-y-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Filter by Difficulty</span>
                  {difficultyFilter.length > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                      {difficultyFilter.length}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    isFilterOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Filter Options Dropdown */}
              {isFilterOpen && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    onClick={() => setIsFilterOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setIsFilterOpen(false);
                    }}
                    role="button"
                    tabIndex={0}
                  />
                  {/* Modal */}
                  <div className="fixed inset-0 z-[101] overflow-y-auto">
                    <div className="min-h-screen px-4 text-center">
                      {/* This element is to trick the browser into centering the modal contents. */}
                      <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                      </span>
                      <div className="inline-block w-full max-w-md p-0 my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-2xl">
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Filter by Difficulty
                          </h3>
                          <button
                            type="button"
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>

                        {/* Options */}
                        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
                          {difficultyOptions.map((option) => (
                            <button
                              type="button"
                              key={option.value}
                              onClick={() => {
                                toggleFilter(option.value);
                              }}
                              className={`
                                w-full flex items-center justify-between p-4 rounded-xl
                                ${
                                  difficultyFilter.includes(option.value)
                                    ? 'bg-blue-50 border-blue-200'
                                    : 'bg-gray-50 border-gray-200'
                                }
                                border transition-all hover:border-blue-200
                              `}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{option.icon}</span>
                                <span className="font-medium text-gray-900">{option.label}</span>
                              </div>
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  difficultyFilter.includes(option.value)
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300'
                                }`}
                              >
                                {difficultyFilter.includes(option.value) && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100">
                          {difficultyFilter.length > 0 ? (
                            <div className="space-y-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setDifficultyFilter([]);
                                  setIsFilterOpen(false);
                                }}
                                className="w-full py-3 text-red-500 font-medium bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                              >
                                Clear all filters
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full py-3 text-white font-medium bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
                              >
                                Apply ({difficultyFilter.length})
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsFilterOpen(false)}
                              className="w-full py-3 text-white font-medium bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block p-4">
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {difficultyOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => toggleFilter(option.value)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200 border
                      ${
                        difficultyFilter.includes(option.value)
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{option.icon}</span>
                    {option.label}
                    {difficultyFilter.includes(option.value) && (
                      <X
                        className="w-4 h-4 text-blue-500 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFilter(option.value);
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters Summary - Desktop */}
            {difficultyFilter.length > 0 && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {difficultyFilter.map((filter) => (
                    <span
                      key={filter}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700"
                    >
                      {filter}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setDifficultyFilter([])}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {filteredExercises.map((excercise) => (
          <m.div
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
          </m.div>
        ))}
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
      ? 'Advanced'
      : instructions.length > 200
        ? 'Intermediate'
        : 'Beginner';

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
        <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-1">{name}</h3>
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
