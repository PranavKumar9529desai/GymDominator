import { ArrowTrendingUpIcon, HeartIcon, ScaleIcon, UserIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { HealthData } from '../types/health';

interface Props {
  healthData: HealthData;
  bmi: number;
}

export const HealthSummary = ({ healthData, bmi }: Props) => {
  const stats = [
    {
      label: 'Current Weight',
      value: `${healthData.weight} kg`,
      icon: ScaleIcon,
      color: 'blue',
    },
    {
      label: 'Height',
      value: `${healthData.height} cm`,
      icon: ArrowTrendingUpIcon,
      color: 'emerald',
    },
    {
      label: 'BMI',
      value: bmi.toFixed(1),
      icon: HeartIcon,
      color: 'violet',
    },
    {
      label: 'Age',
      value: `${healthData.age} years`,
      icon: UserIcon,
      color: 'amber',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Your Health Profile</h2>
        <p className="mt-2 text-gray-600">Personalized nutrition plan based on your metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`bg-${color}-50 p-4 rounded-lg`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{label}</p>
              <Icon className={`w-5 h-5 text-${color}-500`} />
            </div>
            <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-center text-gray-900">
          Your Goal:{' '}
          {healthData.goal
            .split('_')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')}
        </h3>
      </div>
    </motion.div>
  );
};
