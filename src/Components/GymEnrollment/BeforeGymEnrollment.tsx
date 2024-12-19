import { useState, useEffect } from "react";
import { CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { GetEnrollmentStatus } from "@hooks/Enrollment/GetEnrollmentStatus";

export default function BeforeGymEnrollment() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        setIsPending(true);
        const { msg, isEnrolled: enrollmentStatus } = await GetEnrollmentStatus();
        console.log("Enrollment status:", msg, enrollmentStatus);
        setIsEnrolled(enrollmentStatus);
      } catch (error) {
        console.error("Error checking enrollment:", error);
        setIsEnrolled(false);
      } finally {
        setIsPending(false);
      }
    };

    checkEnrollmentStatus();
  }, [shouldRefetch]);

  const handleRefresh = () => {
    setShouldRefetch(prev => !prev);
  };

  return (
    <Card className="w-full max-w-md mx-auto ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Gym Enrollment Status
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {isPending ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="w-12 h-12 animate-spin text-blue-500" />
            <p className="text-lg font-medium">Checking enrollment status...</p>
          </div>
        ) : isEnrolled ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <p className="text-xl font-medium text-green-700">
              You are enrolled in the gym!
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Clock className="w-16 h-16 text-yellow-500" />
            <p className="text-xl font-medium text-yellow-700">
              Your request has been submitted
            </p>
            <p className="text-lg text-gray-600">
              Please wait for the gym owner to accept your request.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={handleRefresh}
          disabled={isPending}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
          <span>Check Status</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
