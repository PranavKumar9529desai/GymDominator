import { motion } from 'framer-motion';
import {
  QrCodeIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  ServerIcon,
  CakeIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Smart QR Attendance',
    description:
      'Revolutionary QR-based attendance system. Generate daily unique codes for seamless check-ins and automated tracking.',
    icon: <QrCodeIcon className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Personalized Diet',
    description:
      'Custom nutrition plans tailored to individual goals. Track meals and get real-time recommendations for optimal results.',
    icon: <CakeIcon className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Trainer Assignment Hub',
    description:
      'Effortlessly manage trainer-member relationships. Streamline communications and track progress in real-time.',
    icon: <UserGroupIcon className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Personalized Fitness Journey',
    description:
      'Custom workout plans and diet charts tailored to each member. Track progress and adjust goals dynamically.',
    icon: <ClipboardDocumentCheckIcon className="w-8 h-8" />,
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Advanced Analytics',
    description:
      'Comprehensive insights into attendance patterns, member engagement, and business performance metrics.',
    icon: <ChartBarIcon className="w-8 h-8" />,
    color: 'from-red-500 to-rose-500',
  },
  {
    title: 'Member Portal',
    description:
      'Empower members with easy access to workouts, diet plans, and attendance history through a dedicated portal.',
    icon: <ServerIcon className="w-8 h-8" />,
    color: 'from-indigo-500 to-violet-500',
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Powerful Features for Modern Gyms
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Transform your gym management with our comprehensive suite of digital tools designed to
            streamline operations and enhance member experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index as number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 
                        hover:border-blue-500/50 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg w-fit mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
