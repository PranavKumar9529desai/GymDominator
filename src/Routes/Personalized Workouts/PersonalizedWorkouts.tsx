import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dumbbell, Clock, Flame, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { WorkoutPlan } from './GetPersonalizedWorkout';

// Define TypeScript interfaces
interface Workout {
  id: number;
  title: string;
  description: string;
  duration: string;
  caloriesBurned: number;
}

interface Exercise {
  id: number;
  order: number;
  name: string;
  sets: number;
  reps: string;
  description: string;
}


const dummyWorkoutPlan: WorkoutPlan = {
  id: 1,
  name: 'Science-Based Strength Program',
  description: 'A scientifically structured routine focusing on progressive overload.',
  schedules: [
    {
      id: 101,
      dayOfWeek: 'Monday',
      muscleTarget: 'Chest & Triceps',
      duration: 60,
      calories: 400,
      exercises: [
        { id: 1, order: 1, name: 'Bench Press', sets: 4, reps: '8-12', description: 'Flat bench barbell press' },
        { id: 2, order: 2, name: 'Incline Dumbbell Press', sets: 4, reps: '8-12', description: 'Incline bench for upper chest' },
        { id: 3, order: 3, name: 'Cable Flyes', sets: 3, reps: '12-15', description: 'Isolation exercise for chest' },
        { id: 4, order: 4, name: 'Triceps Pushdown', sets: 3, reps: '10-12', description: 'Cable pushdowns for triceps' },
        { id: 5, order: 5, name: 'Skull Crushers', sets: 3, reps: '10-12', description: 'Lying tricep extensions' },
        { id: 6, order: 6, name: 'Dips', sets: 3, reps: 'Max', description: 'Bodyweight or assisted dips' },
      ],
    },
    {
      id: 102,
      dayOfWeek: 'Tuesday',
      muscleTarget: 'Back & Biceps',
      duration: 60,
      calories: 400,
      exercises: [
        { id: 7, order: 1, name: 'Deadlifts', sets: 4, reps: '6-8', description: 'Conventional style' },
        { id: 8, order: 2, name: 'Pull-ups', sets: 3, reps: '8-12', description: 'Wide grip for lat width' },
        { id: 9, order: 3, name: 'Barbell Rows', sets: 3, reps: '8-10', description: 'Bent-over rows for back thickness' },
        { id: 10, order: 4, name: 'Seated Cable Row', sets: 3, reps: '10-12', description: 'Keep back neutral' },
        { id: 11, order: 5, name: 'Biceps Curl', sets: 3, reps: '10-12', description: 'Dumbbell or barbell curls' },
        { id: 12, order: 6, name: 'Hammer Curls', sets: 3, reps: '10-12', description: 'Focus on forearms and brachialis' },
      ],
    },
    {
      id: 103,
      dayOfWeek: 'Wednesday',
      muscleTarget: 'Legs',
      duration: 60,
      calories: 450,
      exercises: [
        { id: 13, order: 1, name: 'Squats', sets: 4, reps: '8-10', description: 'Barbell back squat' },
        { id: 14, order: 2, name: 'Romanian Deadlifts', sets: 3, reps: '10-12', description: 'Hamstring focus' },
        { id: 15, order: 3, name: 'Leg Press', sets: 3, reps: '10-12', description: 'Quad emphasis' },
        { id: 16, order: 4, name: 'Lunges', sets: 3, reps: '10-12', description: 'Alternate legs' },
        { id: 17, order: 5, name: 'Calf Raises', sets: 4, reps: '12-15', description: 'Standing or seated' },
        { id: 18, order: 6, name: 'Glute Bridges', sets: 3, reps: '10-12', description: 'Hip-driven movement' },
      ],
    },
    {
      id: 104,
      dayOfWeek: 'Thursday',
      muscleTarget: 'Shoulders',
      duration: 60,
      calories: 400,
      exercises: [
        { id: 19, order: 1, name: 'Military Press', sets: 4, reps: '8-10', description: 'Standing overhead press' },
        { id: 20, order: 2, name: 'Arnold Press', sets: 3, reps: '10-12', description: 'Rotational dumbbell press' },
        { id: 21, order: 3, name: 'Lateral Raises', sets: 3, reps: '12-15', description: 'Focus on medial deltoid' },
        { id: 22, order: 4, name: 'Rear Delt Flyes', sets: 3, reps: '10-12', description: 'Face-down or cable variation' },
        { id: 23, order: 5, name: 'Upright Rows', sets: 3, reps: '8-10', description: 'Grip width for comfort' },
        { id: 24, order: 6, name: 'Shrugs', sets: 3, reps: '10-12', description: 'Trap focus' },
      ],
    },
    {
      id: 105,
      dayOfWeek: 'Friday',
      muscleTarget: 'Arms & Core',
      duration: 60,
      calories: 400,
      exercises: [
        { id: 25, order: 1, name: 'Barbell Curls', sets: 3, reps: '10-12', description: 'Standing barbell curls' },
        { id: 26, order: 2, name: 'Concentration Curls', sets: 3, reps: '10-12', description: 'Isolate the biceps' },
        { id: 27, order: 3, name: 'Close-Grip Bench Press', sets: 3, reps: '8-10', description: 'Tricep emphasis' },
        { id: 28, order: 4, name: 'Cable Crunches', sets: 3, reps: '15-20', description: 'Weighted crunch' },
        { id: 29, order: 5, name: 'Planks', sets: 3, reps: '45-60s', description: 'Maintain neutral spine' },
      ],
    },
    {
      id: 106,
      dayOfWeek: 'Saturday',
      muscleTarget: 'Full Body Conditioning',
      duration: 60,
      calories: 450,
      exercises: [
        { id: 30, order: 1, name: 'Kettlebell Swings', sets: 4, reps: '12-15', description: 'Explosive hip hinge' },
        { id: 31, order: 2, name: 'Push Press', sets: 3, reps: '8-10', description: 'Full body power' },
        { id: 32, order: 3, name: 'Goblet Squats', sets: 3, reps: '10-12', description: 'Front-loaded squat' },
        { id: 33, order: 4, name: 'Renegade Rows', sets: 3, reps: '10-12', description: 'Core stabilization' },
        { id: 34, order: 5, name: 'Mountain Climbers', sets: 3, reps: '30s', description: 'Cardio & core' },
        { id: 35, order: 6, name: 'Farmer’s Walk', sets: 3, reps: '30s', description: 'Grip & core strength' },
      ],
    },
  ],
};

export default function PersonalizedWorkouts() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Remove backend calls; directly set dummy data
    setWorkoutPlan(dummyWorkoutPlan);
    setIsLoading(false);
  }, []);

  const getWorkoutsForDate = (date: Date): Workout[] => {
    if (!workoutPlan || !workoutPlan.schedules) {
      console.log('No workout plan or schedules available');
      return [];
    }
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    console.log('Looking for workouts for:', dayName);
    
    const schedule = workoutPlan.schedules.find(s => s.dayOfWeek === dayName);
    console.log('Found schedule:', schedule);

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
        title: `${schedule.muscleTarget} Training`,
        description: schedule.exercises.map((ex: Exercise) => 
          `${ex.name} (${ex.sets}×${ex.reps})`
        ).join(' • '),
        duration: `${schedule.duration} minutes`,
        caloriesBurned: schedule.calories
      }];
    }

    console.log('No schedule found for this day');
    return [];
  };
  
  useEffect(() => {
    // Remove backend calls; directly set dummy data
    setWorkoutPlan(dummyWorkoutPlan);
    setIsLoading(false);
  }, []);

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
    const schedule = workoutPlan?.schedules?.find(s => s.dayOfWeek === dayName);

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
              {schedule && schedule.exercises.map((exercise: Exercise, index) => (
                <div key={index} className="mt-3 border-t pt-2">
                  <p className="font-medium text-gray-800">{exercise.name}</p>
                  <p className="text-sm text-gray-600">
                    {exercise.sets} sets × {exercise.reps}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{exercise.description}</p>
                </div>
              ))}
              {!schedule && workout.title !== 'Rest Day' && (
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
            // @ts-ignore
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
                onChange={(value) => value instanceof Date ? setSelectedDate(value) : null}
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
                  No workouts scheduled for this day
                </motion.div>
              ) : (
                <motion.div>
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
