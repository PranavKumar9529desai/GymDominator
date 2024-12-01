import { AlertCircle, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@components/ui/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/ui/card";

export default function AttendanceFailed() {
  const name = "John"; // This would typically come from your app's state or context
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // const failureReasons = [
  //   "Network connectivity issues",
  //   "Server error",
  //   "Location services not enabled",
  //   "Outside gym premises",
  //   "Attendance already marked for today",
  // ];

  const handleRetry = () => {
    console.log("Retrying attendance...");
    // Add retry logic here
  };

  const handleContactSupport = () => {
    console.log("Contacting support...");
    // Add support contact logic here
  };

  return (
    <Card className="max-w-md mx-auto ">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-red-600">
          Attendance Failed
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-6">
          <div className="inline-block p-4 bg-red-100 rounded-full">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>
        <p className="mb-4 text-lg text-gray-700">
          Sorry {name}, we couldn't mark your attendance
        </p>
        <p className="text-sm text-gray-500 mb-4">{date}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          onClick={handleRetry}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
        <Button
          onClick={handleContactSupport}
          variant="outline"
          className="w-full"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Contact Support
        </Button>
      </CardFooter>
    </Card>
  );
}
