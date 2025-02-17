import { Card } from '@components/ui/card';
import { m } from '@util/lib/motion';
import { ChevronRight, Clock, Dumbbell, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GetPersonalizedWorkout } from './GetPersonalizedWorkouts';
import type { WorkoutSchedule } from './GetPersonalizedWorkouts';

const getDayOfWeek = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });
};

export default function PersonalizedWorkouts() {
  const [todayWorkout, setTodayWorkout] = useState<WorkoutSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await GetPersonalizedWorkout();
        if (response.success && response.data) {
          const schedules = response.data.schedules;
          const today = getDayOfWeek();
          const todaySchedule = schedules.find(
            (schedule) => schedule.dayOfWeek.toLowerCase() === today.toLowerCase()
          );

          if (todaySchedule) {
            setTodayWorkout(todaySchedule);
          } else {
            setError('No workout scheduled for today');
          }
        } else {
          setError(response.message || 'Failed to load workout');
        }
      } catch (err) {
        console.error('Error fetching workout:', err);
        setError('Error loading workout data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkout();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <m.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        >
          <Dumbbell className="w-12 h-12 text-blue-500" />
        </m.div>
      </div>
    );
  }

  if (error || !todayWorkout || !todayWorkout.exercises || todayWorkout.exercises.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Card className="p-8 text-center max-w-md">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <m.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                }}
              >
                <Dumbbell className="w-16 h-16 text-blue-400 opacity-80" />
              </m.div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Rest & Recovery Day</h2>
              <p className="text-gray-600 mb-6">
                Today is your body's time to rebuild and grow stronger. Rest days are an essential
                part of your fitness journey.
              </p>
            </div>

            <div className="bg-blue-50/80 rounded-lg p-5">
              <h3 className="font-semibold text-blue-800 mb-4">Recovery Essentials:</h3>
              <div className="grid gap-3 text-left">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    8 hours of quality sleep for optimal recovery
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Flame className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Stay hydrated and maintain good nutrition
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <m.div
                    animate={{ rotateY: 180 }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    }}
                  >
                    <Dumbbell className="w-5 h-5 text-blue-500 mt-0.5" />
                  </m.div>
                  <span className="text-sm text-gray-600">
                    Light stretching or gentle mobility work
                  </span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
              <p className="italic">
                "Recovery is not a break from training – it's an essential part of training."
              </p>
            </div>
          </m.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 pb-24 overflow-y-auto relative">
      <div className="max-w-2xl mx-auto space-y-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{todayWorkout.muscleTarget} Day</h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </m.div>

        <Card className="p-4 bg-white/80 backdrop-blur">
          <div className="flex justify-around p-4 border-b">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm">{todayWorkout.duration} mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm">{todayWorkout.calories} kcal</span>
            </div>
          </div>

          <div className="divide-y">
            {todayWorkout.exercises.map((exercise, index) => (
              <m.div
                key={exercise.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                    <p className="text-sm text-gray-600">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="mt-2 text-sm text-gray-500">{exercise.description}</p>
              </m.div>
            ))}
          </div>
        </Card>

        <m.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold
            shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
        >
          Start Workout
        </m.button>
      </div>
    </div>
  );
}
