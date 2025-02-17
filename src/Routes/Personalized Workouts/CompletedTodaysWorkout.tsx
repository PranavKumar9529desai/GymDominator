import { m } from '@util/lib/motion';
import { Calendar, Flame, Timer, Trophy } from 'lucide-react';

interface CompletedWorkoutProps {
  duration: string;
  caloriesBurned: number;
  exercisesCompleted: number;
}

export function CompletedTodaysWorkout({
  duration,
  caloriesBurned,
  exercisesCompleted,
}: CompletedWorkoutProps) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[400px] bg-white rounded-2xl shadow-lg p-8 text-center"
    >
      <m.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-6">
        <div className="flex justify-center">
          <m.div
            animate={{
              rotate: [0, 20, -20, 20, 0],
              scale: [1, 1.2, 1.2, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          >
            <Trophy className="w-20 h-20 text-yellow-500" />
          </m.div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Workout Complete! 🎉</h2>

        <p className="text-gray-600">Great job! You've completed all your exercises for today.</p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Timer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-800">{duration}</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <Flame className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Calories</p>
            <p className="font-semibold text-gray-800">{caloriesBurned} kcal</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Exercises</p>
            <p className="font-semibold text-gray-800">{exercisesCompleted}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">Remember to stay hydrated and get proper rest!</p>
      </m.div>
    </m.div>
  );
}
