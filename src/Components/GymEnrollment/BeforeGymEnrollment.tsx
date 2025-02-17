import { Button } from '@components/ui/button';
import { GetEnrollmentStatus } from '@hooks/Enrollment/GetEnrollmentStatus';
import { AnimatePresence, m } from '@util/lib/motion';
import { ArrowRight, CheckCircle, Clock, Dumbbell, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AttachUserToGym } from '../../Hooks/AttachUserToGym';

export default function BeforeGymEnrollment() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isAttaching, setIsAttaching] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false); // Add this state
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const params = {
    gymname: searchParams.get('gymname') || '',
    hash: searchParams.get('hash') || '',
    gymid: searchParams.get('gymid') || '',
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const attachAndCheckStatus = async () => {
      try {
        if (!params.gymid || !params.hash) {
          setIsPending(false);
          return;
        }

        // Only attach user if it hasn't been done before
        if (!isEnrolled && !isAttaching) {
          setIsAttaching(true);
          const attachResult = await AttachUserToGym(params.gymname, params.gymid, params.hash);
          setIsAttaching(false);

          if (!attachResult.user) {
            setIsPending(false);
            return;
          }
        }

        // Always check enrollment status
        setIsPending(true);
        const { isEnrolled: enrollmentStatus } = await GetEnrollmentStatus();
        setIsEnrolled(enrollmentStatus);
        setIsPending(false);
      } catch (error) {
        console.error('Error:', error);
        setIsEnrolled(false);
        setIsPending(false);
      }
    };

    attachAndCheckStatus();
  }, [params.gymid, params.hash, params.gymname, shouldRefetch]); // Add shouldRefetch to dependencies

  const handleRefresh = () => {
    setIsPending(true); // Show loading state immediately
    setShouldRefetch((prev) => !prev); // Toggle refetch trigger
  };

  return (
    <div className="min-h-screen lg:p-8  bg-gradient-to-b from-blue-50 to-white lg:bg:white">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-screen flex flex-col"
      >
        {/* Header - Fixed at top */}
        <div className="bg-blue-600 px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Dumbbell className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Gym Enrollment</h1>
          </div>
          {params.gymname && (
            <div className="mt-2 px-4">
              <div className="bg-white/10 rounded-lg py-2 px-3">
                <p className="text-white/90 text-center text-xl font-bold tracking-[0.5px]">
                  {params.gymname}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content - Scrollable if needed */}
        <div className="flex-1 flex items-center justify-center px-4 py-6">
          <AnimatePresence mode="wait">
            {isPending || isAttaching ? (
              <m.div
                key="pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Dumbbell className="w-8 h-8 text-blue-500 animate-bounce" />
                  </div>
                </div>
                <p className="mt-6 text-base sm:text-lg font-medium text-gray-600">
                  {isAttaching ? 'Attaching to gym...' : 'Verifying your enrollment...'}
                </p>
              </m.div>
            ) : isEnrolled ? (
              <m.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center px-4"
              >
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-green-500" />
                </m.div>
                <h2 className="mt-6 text-xl sm:text-2xl font-bold text-gray-900">
                  Welcome Aboard!
                </h2>
                <p className="mt-3 text-gray-600 text-sm sm:text-base">
                  You're successfully enrolled and ready to start your fitness journey
                </p>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="mt-8 w-full sm:w-full px-6 py-3 bg-green-500 hover:bg-green-600 
                           text-white rounded-xl sm:rounded-full flex items-center justify-center 
                           gap-2 transition-all duration-300"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </m.div>
            ) : (
              <m.div
                key="pending-approval"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center px-4"
              >
                <Clock className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-amber-500" />
                <h2 className="mt-6 text-xl sm:text-2xl font-bold text-gray-900">
                  Pending Approval
                </h2>
                <p className="mt-3 text-sm sm:text-base text-gray-600">
                  Your enrollment request is being reviewed by the gym staff
                </p>
                <Button
                  onClick={handleRefresh}
                  disabled={isPending}
                  className="mt-8 w-full max-w-40  px-6 py-3 bg-blue-600 hover:bg-blue-700 
                           text-white rounded-xl sm:rounded-full flex items-center justify-center 
                           gap-2 transition-all duration-300 mx-auto"
                >
                  <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
                  <span>{isPending ? 'Checking...' : 'Check Status'}</span>
                </Button>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="py-4 px-4 bg-transparent">
          <p className="text-xs text-center text-gray-500">
            Need help? Contact your gym administrator
          </p>
        </div>
      </m.div>
    </div>
  );
}
