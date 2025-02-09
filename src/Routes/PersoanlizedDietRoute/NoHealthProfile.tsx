import { motion } from 'framer-motion';
import { ClipboardEdit, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NoHealthProfile() {
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate('/onboarding/healthprofile'); // Updated route
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center
          "
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="mb-6 w-20 h-20 mx-auto bg-emerald-50 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <ClipboardEdit className="w-10 h-10 text-emerald-600" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-4 text-gray-900">Complete Your Health Profile</h2>

          <p className="text-gray-600 mb-8">
            To receive your personalized diet plan, we need some information about your health and
            fitness goals.
          </p>

          <motion.button
            onClick={handleUpdateProfile}
            className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-xl 
                     font-semibold shadow-lg hover:shadow-xl transition-all duration-200 
                     flex items-center justify-center w-full space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Update Health Profile</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="mt-6 text-sm text-gray-500">
            This will only take a few minutes to complete
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
