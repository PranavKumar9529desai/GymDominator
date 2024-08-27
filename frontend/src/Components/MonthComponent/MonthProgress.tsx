import { ReactNode, useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight, Check, Divide } from "lucide-react";
import { Button } from "@components/ui/ui/button";
import { Progress } from "@components/ui/ui/progress";

import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { CompletedDaysAtom } from "@state/Atom/completedDays";

interface getallcompletedDaysType {
  msg: string;
  completedDays: Date[];
}

export const MonthProgressComponent = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<Date[]>([
    new Date(1, 7, 2024),
    new Date(24, 8, 2024),
  ]);
  // storing the dates in the atom so the dates should presist throughout the routes
  const [CachedCompletedDays, setCachedCompletedDays] =
    useRecoilState(CompletedDaysAtom);

  async function getallcompletedDays() {
    try {
      setisLoading(true);
      const response: AxiosResponse<getallcompletedDaysType> = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/compltedDays`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      let completedDaysArray = response.data.completedDays.map((dateString) => {
        console.log(dateString);
        return new Date(dateString);
      });
      setCompletedDays(completedDaysArray);
      setCachedCompletedDays({ DateArray: completedDaysArray });
      // setCompletedDays([...completedDays, response.data.completedDays]);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  // TODO it should come from the database
  const enrollmentDate = new Date(2024, 7, 1); // August 1, 2024
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

    setCachedCompletedDays((prev) => {
      const updatedDays = prev.DateArray.some(
        (d) => d.getTime() === day.getTime()
      )
        ? prev.DateArray.filter((d) => d.getTime() !== day.getTime())
        : [...prev.DateArray, day];
      return { DateArray: updatedDays };
    });
  };

  const extractDateParts = (date: Date) => {
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  };

  const isCompleted = (day: Date) => {
    const dayParts = extractDateParts(day);
    return CachedCompletedDays.DateArray.some((d) => {
      const completedDayParts = extractDateParts(d);
      return (
        completedDayParts.day === dayParts.day &&
        completedDayParts.month === dayParts.month &&
        completedDayParts.year === dayParts.year
      );
    });
  };

  const progressPercentage = (completedDays.length / daysInMonth.length) * 100;
  console.log("comleted days are", completedDays);
  console.log("atom has these values", CachedCompletedDays);

  useEffect(() => {
    // setCachedCompletedDays({ DateArray: [...completedDays , ] });
    if (CachedCompletedDays.DateArray.length == 0) {
      getallcompletedDays();
    }
  }, [completedDays]);

  return (
    <div className="w-full max-w-3xl lg:max-w-6xl mx-auto p-6 space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center">Loading.....</div>
      ) : (
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-center">
            Track your progress with Gymdominator
          </h1>

          <div className="text-sm text-center space-x-4 lg:mt-2 lg:mb-0 text-gray-400 mt-2 mb-8 ">
            <span>Enrolled: {format(enrollmentDate, "MMMM d, yyyy")}</span>
            <span>Completion: {format(completionDate, "MMMM d, yyyy")}</span>
          </div>

          <div className="flex items-center justify-between lg:mt-8 my-4">
            <Button onClick={handlePrevMonth} variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold  lg:my-2">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <Button onClick={handleNextMonth} variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-3 lg:gap-4 ">
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
                  className={`h-12 lg:h-16 my-2 lg:my-0 ${
                    !isSameMonth(day, currentDate) ? "opacity-50" : ""
                  } ${
                    format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                      ? "bg-blue-300"
                      : ""
                  }`}
                  onClick={() => toggleDayCompletion(day)}
                >
                  {format(day, "yyyy-MM-dd") ===
                  format(enrollmentDate, "yyyy-MM-dd") ? (
                    "Start"
                  ) : format(day, "yyyy-MM-dd") ===
                    format(today, "yyyy-MM-dd") ? (
                    "today"
                  ) : isCompleted(day) ? (
                    <div className="lg:text-4xl text-2xl">💪</div>
                  ) : (
                    format(day, "d")
                  )}

                  {isCompleted(day) && (
                    <Check className="h-4 w-4 absolute top-1 right-1" />
                  )}
                </Button>
              );
            })}
          </div>

          <div className="space-y-2 mt-10 lg:mt-2">
            <div className="flex justify-between text-sm">
              <span>Monthly Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
};
