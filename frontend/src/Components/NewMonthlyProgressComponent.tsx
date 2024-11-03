import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Dumbbell, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/ui/card";
import { Button } from "@components/ui/ui/button";

// This would typically come from your backend or state management
const gymAttendanceDays = [
  new Date(2024, 10, 13),
  new Date(2024, 10, 4),
  new Date(2024, 10, 7),
  new Date(2024, 10, 9),
  new Date(2024, 10, 11),
  new Date(2024, 10, 14),
  new Date(2024, 10, 16),
  new Date(2024, 10, 18),
  new Date(2024, 10, 21),
  new Date(2024, 10, 23),
  new Date(2024, 10, 25),
  new Date(2024, 10, 28),
  new Date(2024, 10, 30),
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ProfessionalMonthlyProgress() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const attendedDays = gymAttendanceDays.filter(
      (date) =>
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    ).length;
    const workoutDays = daysInMonth - Math.floor(daysInMonth / 7); // Excluding Sundays
    setProgress(Math.round((attendedDays / workoutDays) * 100));
  }, [currentDate]);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isGymDay = (date: Date) => {
    return gymAttendanceDays.some(
      (gymDate) =>
        gymDate.getDate() === date.getDate() &&
        gymDate.getMonth() === date.getMonth() &&
        gymDate.getFullYear() === date.getFullYear()
    );
  };

  const isMissedDay = (date: Date) => {
    const today = new Date();
    return (
      date < today && !isGymDay(date) && date.getDay() !== 0 && date <= today
    );
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const addMonths = (date: Date, months: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  };

  const renderDay = (date: Date | null) => {
    if (!date) return <div className="w-10 h-10 md:w-12 md:h-12" />;

    const isSunday = date.getDay() === 0;
    const dayClasses = `
      flex flex-col items-center justify-center
      w-10 h-10 md:w-12 md:h-12 rounded-full text-center
      transition-all duration-200 ease-in-out
      ${isToday(date) ? "!bg-blue-500 text-white" : ""}
      ${isGymDay(date) ? "bg-green-400 text-primary-foreground p-1" : ""}
      ${isMissedDay(date) ? "bg-red-100 dark:bg-red-900" : ""}
      ${
        isSunday
          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
          : ""
      }
    `;

    return (
      <div key={date.toString()} className={dayClasses}>
        <span className="text-sm md:text-base font-medium">
          {date.getDate()}
        </span>
        {isGymDay(date) && !isSunday && (
          <Dumbbell className="w-3 h-3 md:w-4 md:h-4" />
        )}
        {isMissedDay(date) && (
          <X className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="hidden lg:block font-bold text-gray-800 dark:text-gray-200">
          Gym Progress
        </CardTitle>
        <div className="w-full lg:w-fit justify-center py-4 flex items-center space-x-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(addMonths(currentDate, -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-7 gap-2 mb-4 ">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 lg:gap-x-3 lg:gap-y-6  gap-2 gap-y-10">
          {getDaysInMonth(currentDate).map((date, index) => (
            <div className=" inline-flex justify-center" key={index}>
              {renderDay(date)}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Gym Day
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Today
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Missed
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-800 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Off Day (Sunday)
              </span>
            </div>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray={`${progress}, 100`}
              />
              <text
                x="18"
                y="20.35"
                className="text-xs font-bold text-gray-800 dark:text-gray-200"
                textAnchor="middle"
              >
                {progress}%
              </text>
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
