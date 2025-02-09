import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';

interface Props {
  startDate: Date | null;
  totalWeeks: number;
}

export const DietProgress = ({ startDate, totalWeeks }: Props) => {
  const calculateProgress = () => {
    if (!startDate) return { progressPercentage: 0, completedWeeks: 0, currentDay: 0 };

    const now = new Date();
    const diffTime = now.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const progressPercentage = Math.min((diffDays / (totalWeeks * 7)) * 100, 100);
    const completedWeeks = Math.min(Math.floor(diffDays / 7), totalWeeks);

    return { progressPercentage, completedWeeks, currentDay: diffDays + 1 };
  };

  const { progressPercentage, completedWeeks, currentDay } = calculateProgress();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Your Diet Journey</h3>

      <div className="relative mb-8">
        {/* Progress bar background */}
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-indigo-600 rounded-full"
          />
        </div>

        {/* Week markers */}
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalWeeks }).map((_, index) => {
            const isCompleted = index < completedWeeks;
            const isCurrent = index === Math.floor((currentDay - 1) / 7);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-indigo-100' : isCurrent ? 'bg-indigo-50' : 'bg-gray-50'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <ClockIcon
                      className={`w-5 h-5 ${isCurrent ? 'text-indigo-600' : 'text-gray-400'}`}
                    />
                  )}
                </div>
                <p
                  className={`mt-2 text-sm ${
                    isCompleted
                      ? 'text-indigo-600 font-medium'
                      : isCurrent
                        ? 'text-gray-900'
                        : 'text-gray-500'
                  }`}
                >
                  Week {index + 1}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Current Day" value={currentDay} unit="of 28" />
        <Stat label="Weeks Completed" value={completedWeeks} unit="of 4" />
        <Stat label="Progress" value={Math.round(progressPercentage)} unit="%" />
      </div>
    </div>
  );
};

const Stat = ({ label, value, unit }: { label: string; value: number; unit: string }) => (
  <div className="bg-gray-50 p-3 rounded-lg text-center">
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-gray-900 font-bold text-xl">
      {value}
      <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
    </p>
  </div>
);
