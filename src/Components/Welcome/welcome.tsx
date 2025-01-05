import { motion } from "framer-motion";
import { QrCode, ArrowRight, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetIsValidPeriod } from "./GetUserValidPeriod";

export default function Welcome() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkValidity = async () => {
      try {
        const response = await GetIsValidPeriod();
        setIsValid(response.user.isValid);
      } catch (error) {
        console.error("Error checking validity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkValidity();
  }, []);

  const renderButton = () => {
    if (isLoading) {
      return <div className="animate-pulse">Loading...</div>;
    }

    if (isValid) {
      return (
        <>
          {/* Desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="hidden sm:inline-flex items-center justify-center px-6 py-3 animate-pulse
                     bg-green-600 text-white rounded-lg mx-auto
                     shadow-lg hover:bg-green-700 transition-all duration-300
                     gap-2"
          >
            <Dumbbell className="h-6 w-6" />
            <span>Go to Dashboard</span>
          </motion.button>
          {/* Mobile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="flex sm:hidden flex-col items-center justify-center w-16 h-16 animate-pulse
                     bg-green-600 text-white rounded-full 
                     shadow-lg hover:bg-green-700 transition-all duration-300 
                     fixed bottom-8 left-1/2 transform -translate-x-1/2
                     z-10 active:bg-green-800"
          >
            <Dumbbell className="h-8 w-8" />
          </motion.button>
        </>
      );
    }

    return (
      <>
        {/* Desktop */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/qr-scanner")}
          className="hidden sm:inline-flex items-center justify-center px-6 py-3
                   bg-blue-600 text-white rounded-lg mx-auto
                   shadow-lg hover:bg-blue-700 transition-all duration-300
                   gap-2"
        >
          <QrCode className="h-6 w-6" />
          <span>Scan QR Code</span>
        </motion.button>
        {/* Mobile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/qr-scanner")}
          className="flex sm:hidden flex-col items-center justify-center w-16 h-16 
                   bg-blue-600 text-white rounded-full 
                   shadow-lg hover:bg-blue-700 transition-all duration-300 
                   fixed bottom-8 left-1/2 transform -translate-x-1/2
                   z-10 active:bg-blue-800"
        >
          <QrCode className="h-8 w-8" />
        </motion.button>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6 sm:mb-8">
            <Dumbbell className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Welcome to Gym Navigator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Your personal fitness journey starts here. Join your gym by scanning
            their QR code.
          </p>
          {renderButton()}
          <div
            className="mt-8 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-8 pb-20 sm:pb-0 
                        sm:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg 
                         transition-shadow"
              >
                <feature.icon
                  className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-3 
                                    sm:mb-4 mx-auto"
                />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Easy Registration",
    description:
      "Simply scan the QR code at your gym to get started with your fitness journey.",
    icon: QrCode,
  },
  {
    title: "Track Progress",
    description: "Monitor your attendance and workout progress in real-time.",
    icon: Dumbbell,
  },
  {
    title: "Stay Connected",
    description:
      "Get updates and notifications about your gym activities and schedules.",
    icon: ArrowRight,
  },
];
