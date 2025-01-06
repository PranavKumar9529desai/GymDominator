import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dumbbell, Clock, Flame, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";

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

export default function PersonalizedWorkouts() {
  const [workouts, setWorkouts] = useState<WeeklyWorkouts[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Helper function to get the current week's date range
  const getCurrentWeekRange = () => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const last = first + 6;
    const firstDay = new Date(curr.setDate(first));
    const lastDay = new Date(curr.setDate(last));
    return `${firstDay.toISOString().split('T')[0]} to ${lastDay.toISOString().split('T')[0]}`;
  };

  // Define dummy workout data
  const dummyWorkouts: WeeklyWorkouts[] = [
    {
      week: getCurrentWeekRange(),
      workoutsByDay: {
        'Sunday': [
          {
            id: 1,
            title: 'Rest Day',
            description: 'Active recovery and stretching',
            duration: '30 minutes',
            caloriesBurned: 100,
          },
        ],
        'Monday': [
          {
            id: 2,
            title: 'Chest and Triceps',
            description: 'Bench press, Incline dumbbell press, Tricep extensions',
            duration: '1 hour',
            caloriesBurned: 500,
          },
        ],
        'Tuesday': [
          {
            id: 3,
            title: 'Back and Biceps',
            description: 'Deadlifts, Pull-ups, Barbell curls',
            duration: '1 hour',
            caloriesBurned: 450,
          },
        ],
        'Wednesday': [
          {
            id: 4,
            title: 'Legs',
            description: 'Squats, Lunges, Leg press',
            duration: '1 hour',
            caloriesBurned: 600,
          },
        ],
        'Thursday': [
          {
            id: 5,
            title: 'Shoulders',
            description: 'Military press, Lateral raises, Face pulls',
            duration: '45 minutes',
            caloriesBurned: 400,
          },
        ],
        'Friday': [
          {
            id: 6,
            title: 'Full Body',
            description: 'Compound movements and HIIT',
            duration: '1 hour',
            caloriesBurned: 550,
          },
        ],
        'Saturday': [
          {
            id: 7,
            title: 'Cardio',
            description: 'Running, Cycling, Swimming',
            duration: '45 minutes',
            caloriesBurned: 400,
          },
        ],
      },
    },
  ];

  useEffect(() => {
    setWorkouts(dummyWorkouts);
  }, []);

  const getWorkoutsForDate = (date: Date): Workout[] => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return workouts[0]?.workoutsByDay[dayName] || [];
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isSelected = selectedDate.toDateString() === date.toDateString();
      if (isSelected) {
        return 'bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600';
      }
      const hasWorkouts = getWorkoutsForDate(date).length > 0;
      if (hasWorkouts) {
        return 'font-semibold hover:bg-gray-100';
      }
    }
    return '';
  };

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
                    <motion.div
                      key={workout.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {workout.title}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {workout.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
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
