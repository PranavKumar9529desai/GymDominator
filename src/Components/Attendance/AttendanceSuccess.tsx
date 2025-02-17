import { m } from '@util/lib/motion';
import { ArrowRight, Calendar, CheckCircle2, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AttendanceConfirmation() {
  const navigate = useNavigate();

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center space-y-6">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </m.div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">Attendance Marked Successfully!</h1>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <p className="text-lg">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dashboard/workouts/personalizedworkout')}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              View Today's Workout
            </m.button>

            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dashboard/myprogress/month')}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              <LineChart className="w-5 h-5" />
              Check Progress
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
  );
}
