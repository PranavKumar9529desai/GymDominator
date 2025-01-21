import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Dumbbell, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { GetAttendanceDays } from "@routes/MonthProgressRoute/GetAttendandedDays";

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
  const [gymAttendanceDays, setGymAttendanceDays] = useState<Date[]>([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await GetAttendanceDays();
        if (response.success && response.data) {
          console.log("Fetched attendance data:", response.data);
          // Convert ISO date strings to Date objects
          const attendanceDates = response.data.map((date) => new Date(date));
          console.log("dates are this", attendanceDates);
          setGymAttendanceDays(attendanceDates);
        }
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
      }
    };

    fetchAttendance();
  }, []);

  useEffect(() => {
    // Get all days in the current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Count non-Sunday days (available workout days)
    let availableWorkoutDays = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() !== 0) {
        // Skip Sundays
        availableWorkoutDays++;
      }
    }

    // Count attended days (excluding Sundays)
    const attendedDays = gymAttendanceDays.filter(
      (date) =>
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear() &&
        date.getDay() !== 0 // Exclude Sundays
    ).length;

    // Calculate progress percentage
    const calculatedProgress =
      availableWorkoutDays > 0
        ? Math.round((attendedDays / availableWorkoutDays) * 100)
        : 0;

    setProgress(calculatedProgress);
  }, [currentDate, gymAttendanceDays]);

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

  const getDayClasses = (date: Date) => {
    const isSunday = date.getDay() === 0;
    const isGymAttendance = isGymDay(date);

    return `
      flex flex-col items-center justify-center
      w-12 h-12 md:w-14 md:h-14 rounded-xl
      text-center relative
      transition-all duration-300 ease-in-out
      backdrop-blur-sm
      hover:scale-105 hover:shadow-lg
      cursor-default
      ${
        isGymAttendance
          ? "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg shadow-green-200/50 dark:shadow-green-900/50"
          : ""
      }
      ${
        isToday(date) && !isGymAttendance
          ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-200/50 dark:shadow-blue-900/50"
          : ""
      }
      ${
        isMissedDay(date)
          ? "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50"
          : ""
      }
      ${
        isSunday
          ? "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-700/50 text-gray-400 dark:text-gray-600"
          : ""
      }
    `;
  };

  const renderDay = (date: Date | null) => {
    if (!date) return <div className="w-12 h-12 md:w-14 md:h-14" />;

    return (
      <div key={date.toString()} className={getDayClasses(date)}>
        <span className="text-base md:text-lg font-semibold">
          {date.getDate()}
        </span>
        {isGymDay(date) && date.getDay() !== 0 && (
          <Dumbbell className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
        )}
        {isMissedDay(date) && (
          <X className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 ">
      <Card className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80  backdrop-blur-x bordler-t border-white/60 dark:border-gray-800/60">
        <CardHeader className="flex flex-col items-center space-y-4 pb-6">
          <div className="w-full lg:w-full justify-center flex items-center space-x-8 py-8 pt-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300"
              onClick={() => setCurrentDate(addMonths(currentDate, -1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              {isGymDay(new Date()) ? (
                <span className="mt-2 px-4 py-1.5 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-sm font-medium shadow-lg shadow-green-200/50 dark:shadow-green-900/50">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  • Workout Complete ✨
                </span>
              ) : (
                <span className="mt-2 text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-8 lg:gap-4 mb-6">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-600 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3 lg:gap-4">
            {getDaysInMonth(currentDate).map((date, index) => (
              <div
                className="inline-flex justify-center animate-fadeIn"
                key={index}
                style={{ animationDelay: `${index * 20}ms` }}
              >
                {renderDay(date)}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 md:mb-0">
              {/* Legend items with enhanced styling */}
              <div className="flex items-center space-x-3 transition-transform hover:scale-105">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-200/50 dark:shadow-green-900/50"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gym Day
                </span>
              </div>
              <div className="flex items-center space-x-3 transition-transform hover:scale-105">
                <div className="w-5 h-5 rounded-md bg-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-900"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Today
                </span>
              </div>
              <div className="flex items-center space-x-3 transition-transform hover:scale-105">
                <div className="w-5 h-5 rounded-md bg-red-100 dark:bg-red-900/50 shadow-lg shadow-red-200 dark:shadow-red-900"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Missed
                </span>
              </div>
              <div className="flex items-center space-x-3 transition-transform hover:scale-105">
                <div className="w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-800/50 shadow-lg shadow-gray-200 dark:shadow-gray-900"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Off Day (Sunday)
                </span>
              </div>
            </div>
            <div className="relative w-32 h-32 transform hover:scale-105 transition-transform">
              {/* Progress circle with gradient */}
              <svg className="w-full h-full transform -rotate-90">
                <defs>
                  <linearGradient
                    id="progress-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200 dark:text-gray-800"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#progress-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 3.39}, 339.292`}
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
