import {
  Calendar,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import {  useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import { Button } from "@components/ui/ui/button";
import { Progress } from "@components/ui/ui/progress";
// import { PropagateLoader } from "react-spinners";

export const MonthProgressComponent = () => {
  // Hardcoded default values for completed days, enrolled date, and completion date
  const defaultCompletedDays = [
    new Date(2024, 8, 5),
    new Date(2024, 8, 15),
    // Add more dates here as needed for testing
  ];
  const enrolledDate = new Date(2024, 7, 1);
  const completionDate = new Date(2025, 1, 1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [arrayOfCompletedDays, setArrayOfCompletedDays] =
    useState<Date[]>(defaultCompletedDays);

  const today = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const toggleDayCompletion = (day: Date) => {
    if (!arrayOfCompletedDays.some((d) => d.getTime() === day.getTime())) {
      setArrayOfCompletedDays([...arrayOfCompletedDays, day]);
    } else {
      alert("already completed the workout");
    }
  };

  const isCompleted = (day: Date) => {
    return arrayOfCompletedDays.some((d) => d.getTime() === day.getTime());
  };

  const progressPercentage =
    (arrayOfCompletedDays.length / daysInMonth.length) * 100;

  return (
    <div className="w-full h-full lg:max-w-6xl mx-auto px-6 space-y-6 pb-40 lg:pb-0">
      {/* Loader removed as no data fetching occurs */}
      <div>
        {/* Header and Buttons */}
        <div className="flex items-center justify-between lg:mt-8 my-4">
          <Button onClick={handlePrevMonth} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold lg:my-2">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <Button onClick={handleNextMonth} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4 lg:gap-4">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}
          {daysInMonth.map((day) => (
            <Button
              key={day.toString()}
              variant={isCompleted(day) ? "default" : "outline"}
              className={`h-12 lg:h-16 my-2 lg:my-0 lg:w-36 w-10 ${
                !isSameMonth(day, currentDate) ? "opacity-50" : ""
              } ${
                format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                  ? "text-xs px-2 bg-blue-200"
                  : ""
              }`}
              onClick={() => toggleDayCompletion(day)}
            >
              {isCompleted(day) ? (
                <div className="lg:text-4xl text-2xl">💪</div>
              ) : (
                format(day, "d")
              )}
              {isCompleted(day) && (
                <Check className="h-4 w-4 absolute top-1 right-1" />
              )}
            </Button>
          ))}
        </div>

        {/* Progress */}
        <div className="space-y-2 mt-10 lg:mt-2">
          <div className="flex justify-between text-sm">
            <span>Monthly Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>

        {/* Footer info for Enrolled and Completion Dates */}
        <div className="block lg:hidden text-gray-500 mt-4">
          <div className="flex items-center ">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="lg:text-base">
              <span className="">Enrolled Date: </span>
              {format(enrolledDate, "MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <Trophy className="w-4 h-4 mr-1" />
            <span className="lg:text-base">
              <span className="">Completion Date: </span>
              {format(completionDate, "MMMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
