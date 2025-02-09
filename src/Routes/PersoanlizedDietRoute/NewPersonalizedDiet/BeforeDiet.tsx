import { postStartDate } from './hooks/poststartdata';
import { motion } from 'framer-motion';

export default function BeforeDiet() {
  const handleGetStarted = async () => {
    try {
      const response = await postStartDate();
      if (response.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error starting diet:', error);
    }
  };

  const features = [
    {
      title: 'Personalized Meal Plans',
      description: 'Custom-tailored nutrition plans based on your goals and preferences',
      icon: '🍽️',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your journey with detailed progress insights',
      icon: '📊',
    },
    {
      title: 'Expert Guidance',
      description: 'Professional support throughout your transformation',
      icon: '👨‍⚕️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-12"
        >
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
              Your <span className="text-indigo-600">Personalized Diet Plan</span>
            </h1>
            <div className="space-y-4">
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Expertly crafted based on your health parameters and fitness goals
              </p>
              <p className="max-w-2xl mx-auto text-lg text-gray-500">
                Developed by nutrition experts and fine-tuned by your personal trainer. Feel free to
                discuss your plan and make adjustments during your sessions.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full 
                       text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Begin Your Journey
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-16 text-sm text-gray-500">
            <p>Your personalized diet plan will be tailored based on your profile and goals.</p>
            <p>Get ready to embark on a transformative journey!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
