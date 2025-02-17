import { m } from '@util/lib/motion';
import { HelpCircle, MessageCircle, RefreshCcw, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function AttendanceFailure() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    // Add retry logic here
    setTimeout(() => setIsRetrying(false), 2000);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center space-y-6">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center"
          >
            <XCircle className="w-14 h-14 text-red-500" />
          </m.div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">Attendance Marking Failed</h1>
            <p className="text-gray-600">
              We couldn't mark your attendance. Please try again or contact support.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isRetrying}
              onClick={handleRetry}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCcw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </m.button>

            <div className="grid grid-cols-2 gap-4">
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Staff
              </m.button>

              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                Get Help
              </m.button>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Common reasons for failure:
            <ul className="mt-2 space-y-1 text-left list-disc list-inside">
              <li>Network connectivity issues</li>
              <li>Location services disabled</li>
              <li>Outside gym premises</li>
              <li>Already marked for today</li>
            </ul>
          </div>
        </div>
      </div>
    </m.div>
  );
}
