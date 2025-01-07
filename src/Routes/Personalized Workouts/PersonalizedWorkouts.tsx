import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dumbbell, Clock, Flame, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { GetPersonalizedWorkout, WorkoutPlan } from './GetPersonalizedWorkout';
import { toast } from 'sonner';
import { GetHealthFormStatus } from '@routes/PersoanlizedDietRoute/gethealthFormStatus';
import NoHealthProfile from '@routes/PersoanlizedDietRoute/NoHealthProfile';

// Define TypeScript interfaces
interface Workout {
  id: number;
  title: string;
  description: string;
  duration: string;
  caloriesBurned: number;
}

interface WeeklyWorkouts {
  week: string;
  workoutsByDay: {
    [day: string]: Workout[];
  };
}

// Add new interfaces for muscle-specific workouts
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  description: string;
}

interface MuscleWorkout {
  muscle: string;
  exercises: Exercise[];
}

const muscleSchedule: { [key: string]: MuscleWorkout } = {
  'Monday': {
    muscle: 'Chest',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-12', description: 'Flat bench barbell press for upper chest development' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', description: 'Incline press for upper chest focus' },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', description: 'Cable crossovers for chest isolation' },
    ],
  },
  'Tuesday': {
    muscle: 'Back',
    exercises: [
      { name: 'Deadlifts', sets: 4, reps: '6-8', description: 'Conventional deadlifts for overall back strength' },
      { name: 'Pull-ups', sets: 3, reps: '8-12', description: 'Wide-grip pull-ups for lat development' },
      { name: 'Barbell Rows', sets: 3, reps: '10-12', description: 'Bent-over rows for middle back' },
    ],
  },
  'Wednesday': {
    muscle: 'Legs',
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', description: 'Barbell back squats for overall leg development' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', description: 'RDLs for hamstring focus' },
      { name: 'Leg Press', sets: 3, reps: '12-15', description: 'Machine leg press for quad development' },
    ],
  },
  'Thursday': {
    muscle: 'Shoulders',
    exercises: [
      { name: 'Military Press', sets: 4, reps: '8-10', description: 'Overhead press for shoulder strength' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', description: 'Dumbbell raises for lateral delts' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', description: 'Cable face pulls for rear delts' },
    ],
  },
  'Friday': {
    muscle: 'Arms',
    exercises: [
      { name: 'Barbell Curls', sets: 4, reps: '10-12', description: 'Standing barbell curls for biceps' },
      { name: 'Skull Crushers', sets: 3, reps: '12-15', description: 'Lying tricep extensions' },
      { name: 'Hammer Curls', sets: 3, reps: '12-15', description: 'Dumbbell hammer curls for forearms' },
    ],
  },
  'Saturday': {
    muscle: 'Core',
    exercises: [
      { name: 'Cable Crunches', sets: 4, reps: '15-20', description: 'Weighted cable crunches for abs' },
      { name: 'Planks', sets: 3, reps: '45-60s', description: 'Isometric hold for core stability' },
      { name: 'Russian Twists', sets: 3, reps: '20 each side', description: 'Weighted twists for obliques' },
    ],
  },
};

export default function PersonalizedWorkouts() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHealthProfile, setHasHealthProfile] = useState(false);

  useEffect(() => {
    const checkHealthFormStatus = async () => {
      try {
        const formStatus = await GetHealthFormStatus();
        if (formStatus.healthProfile) {
          setHasHealthProfile(true);
          // Only fetch workout plan if health profile exists
          const response = await GetPersonalizedWorkout();
          if (response.success && response.data) {
            setWorkoutPlan(response.data);
          } else {
            toast.error(response.message || 'Failed to load workout plan');
          }
        } else {
          setHasHealthProfile(false);
        }
      } catch (error) {
        console.error('Error checking health form status:', error);
        setHasHealthProfile(false);
        toast.error('Error checking health profile status');
      } finally {
        setIsLoading(false);
      }
    };

    checkHealthFormStatus();
  }, []);

  const getWorkoutsForDate = (date: Date): Workout[] => {
    if (!workoutPlan) return [];
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const schedule = workoutPlan.schedules.find(s => s.dayOfWeek === dayName);

    if (dayName === 'Sunday') {
      return [{ 
        id: 0,
        title: 'Rest Day',
        description: 'Take time to recover and prepare for next week',
        duration: '0 minutes',
        caloriesBurned: 0
      }];
    }

    if (schedule) {
      return [{
        id: schedule.id,
        title: `${schedule.muscleTarget} Day`,
        description: schedule.exercises.map(ex => ex.name).join(', '),
        duration: `${schedule.duration} minutes`,
        caloriesBurned: schedule.calories
      }];
    }

    return [];
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const isSelected = selectedDate.toDateString() === date.toDateString();

      if (isSelected) {
        return 'bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600';
      }
      if (dayName === 'Sunday') {
        return 'text-red-500';
      }
      return 'hover:bg-gray-100';
    }
    return '';
  };

  const WorkoutCard = ({ workout }: { workout: Workout }) => {
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const muscleDay = muscleSchedule[dayName];

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                {workout.title}
              </h3>
              {muscleDay && muscleDay.exercises && muscleDay.exercises.map((exercise, index) => (
                <div key={index} className="mt-3 border-t pt-2">
                  <p className="font-medium text-gray-800">{exercise.name}</p>
                  <p className="text-sm text-gray-600">
                    {exercise.sets} sets × {exercise.reps}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{exercise.description}</p>
                </div>
              ))}
              {!muscleDay && (
                <p className="text-gray-600 mt-1">{workout.description}</p>
              )}
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{workout.duration}</span>
            </div>
            <div className="flex items-center text-orange-600">
              <Flame className="h-4 w-4 mr-1" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Dumbbell className="w-10 h-10 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (!hasHealthProfile) {
    console.log('No health profile found');
    return <NoHealthProfile />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View Calendar Sheet */}
      <div className="md:hidden fixed bottom-4 right-4 z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
            >
              <CalendarIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[500px] rounded-t-3xl">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="mx-auto"
              tileClassName={getTileClassName}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Your Workout Plan
          </h1>
          <p className="text-gray-600 mt-2">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Calendar */}
          <div className="hidden md:block md:w-1/3">
            <div className="sticky top-6">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="shadow-lg rounded-xl border border-gray-200"
                tileClassName={getTileClassName}
              />
            </div>
          </div>

          {/* Workouts Section */}
          <ScrollArea className="md:w-2/3 h-[calc(100vh-200px)]">
            <AnimatePresence mode="wait">
              {getWorkoutsForDate(selectedDate).length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-8 text-center"
                >
                  <Dumbbell className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-600">No workouts scheduled for today.</p>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-4 px-1"
                  layout
                >
                  {getWorkoutsForDate(selectedDate).map(workout => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
