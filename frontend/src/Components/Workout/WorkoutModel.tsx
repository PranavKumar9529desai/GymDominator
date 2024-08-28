import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const WorkoutModal = ({ muscleName }: { muscleName: string }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">
          Selected Muscle: {muscleName}
        </h3>
        <p className="mb-4">
          Checkouts different workouts with for the {muscleName}.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 "
          onClick={() => {
            navigate(`/dashboard/workouts/${muscleName}`);
          }}
        >
          go
        </button>
      </div>
    </motion.div>
  );
};
