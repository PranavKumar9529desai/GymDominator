import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Dumbbell, Check, Timer } from "lucide-react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Progress } from "@components/ui/progress";
import { GetPersonalizedWorkout } from "./GetPersonalizedWorkouts";
import type { Exercise } from "./GetPersonalizedWorkouts";
import { toast } from "sonner";
import { CompletedTodaysWorkout } from "./CompletedTodaysWorkout";
import {
  checkWorkoutCompletion,
  markWorkoutCompleted,
} from "./IsCompletedTodaysWorkouts";

interface WorkoutSession {
  id: number;
  title: string;
  description: string;
  duration: string;
  caloriesBurned: number;
  exercises: Exercise[];
  progress: number;
  currentExerciseIndex: number;
  streak: number;
  totalCompleted: number;
}

export default function PersonalizedWorkouts() {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState<number>(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [workoutStats, setWorkoutStats] = useState({
    streak: 0,
    totalCompleted: 0,
  });

  useEffect(() => {
    const fetchTodayWorkout = async () => {
      try {
        const response = await GetPersonalizedWorkout();
        if (response.success && response.data) {
          const today = new Date().toLocaleDateString("en-US", {
            weekday: "long",
          });
          const todaySchedule = response.data.schedules.find(
            (s: { dayOfWeek: string }) => s.dayOfWeek === today
          );

          if (todaySchedule) {
            // Ensure exercises are sorted by order
            const sortedExercises = [...todaySchedule.exercises].sort(
              (a, b) => a.order - b.order
            );

            setSession({
              id: todaySchedule.id,
              title: `${todaySchedule.muscleTarget} Training`,
              description: `Today's ${todaySchedule.muscleTarget.toLowerCase()} workout`,
              duration: `${todaySchedule.duration} minutes`,
              caloriesBurned: todaySchedule.calories,
              exercises: sortedExercises, // Use sorted exercises
              progress: 0,
              currentExerciseIndex: 0,
              streak: response.data.progress.currentStreak,
              totalCompleted: response.data.progress.completedWorkouts,
            });

            setWorkoutStats({
              streak: response.data.progress.currentStreak,
              totalCompleted: response.data.progress.completedWorkouts,
            });
          } else {
            toast.info("It's your rest day! Take time to recover.");
          }
        }
      } catch (err) {
        toast.error("Failed to load your workout");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayWorkout();
  }, []);

  useEffect(() => {
    const checkCompletion = async () => {
      const isCompleted = await checkWorkoutCompletion();
      setIsCompleted(isCompleted);
      setIsLoading(false);
    };

    checkCompletion();
  }, []);

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    toast.success("Workout started! Let's crush it! 💪");
  };

  const handleExerciseComplete = async (index: number) => {
    if (!session) return;

    const totalExercises = session.exercises.length;
    const isLastExercise = index === totalExercises - 1;
    const newProgress = ((index + 1) / totalExercises) * 100;

    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        progress: newProgress,
        currentExerciseIndex: index + 1,
      };
    });

    if (isLastExercise) {
      await markWorkoutCompleted();
      setIsCompleted(true);
      setActiveExercise(index + 1);
      toast.success("Congratulations! Workout completed! 🎉");
    } else {
      setActiveExercise(index + 1);
      toast.success(
        `Exercise ${index + 1} of ${totalExercises} completed! Keep going! 🔥`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Dumbbell className="w-12 h-12 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Rest Day</h2>
          <p className="text-gray-600">
            Take time to recover and prepare for your next session
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold text-gray-900">{session.title}</h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{session.duration}</span>
            </div>
            <div className="flex items-center text-orange-600">
              <Flame className="h-4 w-4 mr-1" />
              <span>{session.caloriesBurned} kcal</span>
            </div>
          </div>
        </motion.div>

        {session && (
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700">Current Streak</h3>
              <p className="text-2xl text-blue-600">
                {workoutStats.streak} days
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700">
                Workouts Completed
              </h3>
              <p className="text-2xl text-green-600">
                {workoutStats.totalCompleted}
              </p>
            </div>
          </div>
        )}

        {isCompleted ? (
          <CompletedTodaysWorkout
            duration={session.duration}
            caloriesBurned={session.caloriesBurned}
            exercisesCompleted={session.exercises.length}
          />
        ) : (
          <>
            {!isWorkoutStarted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleStartWorkout}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold
                    hover:bg-blue-700 transform transition hover:scale-105"
                >
                  Start Workout
                </button>
              </motion.div>
            ) : (
              <>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700">Progress</h3>
                    <span className="text-sm text-gray-500">
                      {session.currentExerciseIndex}/{session.exercises.length}{" "}
                      exercises
                    </span>
                  </div>
                  <Progress value={session.progress} className="h-2" />
                </div>

                <ScrollArea className="h-[calc(100vh-300px)]">
                  <AnimatePresence mode="wait">
                    {session.exercises.map((exercise, index) => (
                      <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`bg-white rounded-xl border border-gray-200 overflow-hidden 
                          hover:shadow-md transition-all mb-4 ${
                            index === activeExercise
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-gray-900">
                                  {exercise.name}
                                </span>
                                {index < session.currentExerciseIndex && (
                                  <Check className="h-5 w-5 text-green-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {exercise.sets} sets × {exercise.reps}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {exercise.description}
                              </p>

                              <div className="mt-4 flex items-center gap-2">
                                <Timer className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  Estimated time: {exercise.sets * 2} mins
                                </span>
                              </div>
                            </div>

                            {index === activeExercise && (
                              <button
                                onClick={() => {
                                  handleExerciseComplete(index);
                                  setActiveExercise(index + 1);
                                }}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm
                                  hover:bg-green-600 transition-colors"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
