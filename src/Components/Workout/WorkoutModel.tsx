import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function WorkoutModel({
  isOpen,
  onClose,
  muscleName,
}: {
  isOpen: boolean;
  onClose: () => void;
  muscleName: string;
}) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4">
          Selected Muscle:{' '}
          {muscleName.charAt(0).toUpperCase() + muscleName.slice(1).toLocaleLowerCase()}
        </h3>
        <p className="mb-4">
          Check out different workouts for the{' '}
          {muscleName.charAt(0).toUpperCase() + muscleName.slice(1).toLowerCase()}.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
            onClick={onClose}
          >
            No
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={() => {
              navigate(`/dashboard/workouts/${muscleName}`);
            }}
          >
            Go
          </button>
        </div>
      </div>
    </motion.div>
  );
}
