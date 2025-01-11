import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, LockClosedIcon, ClockIcon } from '@heroicons/react/24/solid';
import { MealPlan } from '../types/diet';

interface Props {
  currentWeek: number;
  mealPlan: MealPlan;
  onWeekChange: (direction: 'prev' | 'next') => void;
  isLocked: boolean;
  totalWeeks: number;
}

const mealTimes = ['breakfast', 'lunch', 'dinner', 'snacks'] as const;

const WeekNavigator = ({ 
  currentWeek, 
  totalWeeks, 
  onWeekChange 
}: { 
  currentWeek: number; 
  totalWeeks: number; 
  onWeekChange: (direction: 'prev' | 'next') => void; 
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onWeekChange('prev')}
        disabled={currentWeek === 1}
        className={`p-2 rounded-full transition ${
          currentWeek === 1
            ? 'text-gray-300'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">Week {currentWeek}</h3>
        <p className="text-sm text-gray-500">of {totalWeeks}</p>
      </div>

      <button
        onClick={() => onWeekChange('next')}
        disabled={currentWeek === totalWeeks}
        className={`p-2 rounded-full transition ${
          currentWeek === totalWeeks
            ? 'text-gray-300'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

const LockedWeek = ({ currentWeek }: { currentWeek: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="rounded-lg bg-gray-50 p-8 text-center"
  >
    <LockClosedIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
    <p className="text-gray-600">Complete Week {currentWeek - 1} to unlock</p>
  </motion.div>
);

const MealCard = ({ time, meal }: { time: string; meal: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-gray-50 rounded-lg"
  >
    <div className="flex items-center mb-2">
      <ClockIcon className="h-5 w-5 text-gray-600 mr-2" />
      <h4 className="font-medium text-gray-900 capitalize">{time}</h4>
    </div>
    <p className="text-gray-600 ml-7">{meal}</p>
  </motion.div>
);

export const WeeklyMealPlan = ({ currentWeek, mealPlan, onWeekChange, isLocked, totalWeeks }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-8">
        <WeekNavigator
          currentWeek={currentWeek}
          totalWeeks={totalWeeks}
          onWeekChange={onWeekChange}
        />
      </div>

      <AnimatePresence>
        {isLocked ? (
          <LockedWeek currentWeek={currentWeek} />
        ) : (
          <div className="space-y-6">
            {mealTimes.map((time) => (
              mealPlan[time] && (
                <MealCard
                  key={time}
                  time={time}
                  meal={mealPlan[time]}
                />
              )
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
