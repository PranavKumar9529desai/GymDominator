import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@components/ui/ui/button";
import { Progress } from "@components/ui/ui/progress";
export const MonthProgressComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<Date[]>([
    new Date(2024, 7, 7),
    new Date(2024, 7, 8),
  ]);
  // TODO it should come from the database
  const enrollmentDate = new Date(2024, 8, 1); // August 1, 2024p
  const completionDate = new Date(2025, 1, 1); // February 1, 2025
  const today = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const toggleDayCompletion = (day: Date) => {
    setCompletedDays((prev) =>
      prev.some((d) => d.getTime() === day.getTime())
        ? prev.filter((d) => d.getTime() !== day.getTime())
        : [...prev, day]
    );
  };

  const isCompleted = (day: Date) =>
    completedDays.some((d) => d.getTime() === day.getTime());

  const progressPercentage = (completedDays.length / daysInMonth.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="font-montserrat text-3xl font-bold text-center">
        Track your progress with Gymdominator
      </h1>

      <div className="text-sm text-center space-x-4">
        <span>Enrolled: {format(enrollmentDate, "MMMM d, yyyy")}</span>
        <span>Completion: {format(completionDate, "MMMM d, yyyy")}</span>
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={handlePrevMonth} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button onClick={handleNextMonth} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center font-medium ">
            {day}
          </div>
        ))}
        {daysInMonth.map((day, index) => {
          return (
            <Button
              key={day.toString()}
              variant={isCompleted(day) ? "default" : "outline"}
              className={`h-12 ${
                !isSameMonth(day, currentDate) ? "opacity-50" : ""
              } ${
                format(day, "d") === format(today, "d") ? "bg-blue-300" : ""
              }`}
              onClick={() => toggleDayCompletion(day)}
            >
              {/* <div className=" relative -top-4 h-fit w-fit m-0 p-0">
                {format(day, "d") === format(today, "d") ? "today" : ""}
              </div> */}
              {format(day, "d")}
              {isCompleted(day) && (
                <Check className="h-4 w-4 absolute top-1 right-1" />
              )}
            </Button>
          );
        })}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Monthly Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="w-full" />
      </div>
    </div>
  );
};
