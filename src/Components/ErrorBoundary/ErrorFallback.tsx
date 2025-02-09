import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const handleHomeClick = () => {
    // This will cause a full page refresh when redirecting to home
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center"
          >
            <AlertCircle className="w-14 h-14 text-red-500" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">Oops! Something went wrong</h1>
            <p className="text-gray-600">
              {error?.message || "We're having trouble connecting to our servers"}
            </p>
          </div>

          <div className="space-y-4">
            {resetErrorBoundary && (
              <button
                type="button"
                onClick={resetErrorBoundary}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
            )}

            <button
              type="button"
              onClick={handleHomeClick}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>

          <div className="text-sm text-gray-500">
            If the problem persists, please contact support
          </div>
        </div>
      </motion.div>
    </div>
  );
}
