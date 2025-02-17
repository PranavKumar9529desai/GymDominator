import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { m } from '@util/lib/motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttendanceSuccess() {
  const navigate = useNavigate();
  const currentDate = new Date();

  useEffect(() => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard/myprogress/month');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-900">
      <Card className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 text-center"
        >
          {/* Success Icon with Animation */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', duration: 0.7 }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/30 animate-ping" />
              <CheckCircle className="relative w-full h-full text-green-500 dark:text-green-400" />
            </div>
          </m.div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Attendance Marked!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your attendance has been successfully recorded
          </p>

          {/* Time Display */}
          <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full mb-8">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-300">
              {currentDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/dashboard/myprogress/month')}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              View Monthly Progress
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="w-full group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Button>
          </div>

          {/* Auto-redirect Message */}
          <p className="text-sm text-gray-500 mt-4 animate-pulse">Redirecting in 30 seconds...</p>
        </m.div>
      </Card>
    </div>
  );
}
