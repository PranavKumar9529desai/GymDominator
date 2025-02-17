import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { m } from '@util/lib/motion';
import { ArrowLeft, RefreshCcw, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttendanceFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 30 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white dark:from-red-900/20 dark:to-gray-900">
      <Card className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 text-center"
        >
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.7 }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/30 animate-pulse" />
              <XCircle className="relative w-full h-full text-red-500 dark:text-red-400" />
            </div>
          </m.div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Attendance Failed
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Unable to mark your attendance. Please try again.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/dashboard/attendance/qrscanner')}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              <RefreshCcw
                className="w-4 h-4 mr-2"
                onClick={() => {
                  navigate('/attendance/qrscanner');
                }}
              />
              Try Again
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

          <p className="text-sm text-gray-500 mt-4 animate-pulse">
            Redirecting to dashboard in 30 seconds...
          </p>
        </m.div>
      </Card>
    </div>
  );
}
