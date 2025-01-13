import { motion } from "framer-motion";
import { ArrowRightIcon, BuildingOffice2Icon, UserGroupIcon, QrCodeIcon } from '@heroicons/react/24/outline';

export const CTASection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-700"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-left space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Compatible with All Types of Gyms
              </h2>
              <p className="text-gray-300 text-lg">
                Whether you're running a boutique fitness studio or a large gym chain, our platform adapts to your needs. Get started in minutes with our easy-to-use QR system.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Get Started Now
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
                <button className="px-6 py-3 border border-gray-600 hover:border-blue-500 text-white rounded-xl font-semibold transition-colors">
                  View Demo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <BuildingOffice2Icon className="w-8 h-8" />,
                  title: "Any Gym Size",
                  description: "From small studios to large facilities"
                },
                {
                  icon: <UserGroupIcon className="w-8 h-8" />,
                  title: "Multiple Trainers",
                  description: "Manage all your trainers efficiently"
                },
                {
                  icon: <QrCodeIcon className="w-8 h-8" />,
                  title: "Easy Setup",
                  description: "Get running in under 5 minutes"
                },
                {
                  icon: <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <div className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent" />
                  </motion.div>,
                  title: "24/7 Active",
                  description: "Always available system"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 p-4 rounded-xl border border-gray-700"
                >
                  <div className="text-blue-400 mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
