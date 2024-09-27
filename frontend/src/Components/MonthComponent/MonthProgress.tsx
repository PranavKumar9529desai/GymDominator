import { Calendar, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
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
import { FetchCompletedDays } from "@hooks/FetchCompltedDays";
import { useRecoilState } from "recoil";
import { DaysAtom } from "@state/Atom/completedDays";
import { PropagateLoader } from "react-spinners";

export const MonthProgressComponent = () => {
  let { CompltedDays, isLoading } = FetchCompletedDays();
  const [daysState] = useRecoilState(DaysAtom);
  const { enrolledDate, completiondate } = daysState;
  const [currentDate, setCurrentDate] = useState(new Date());
  let [arrayOfCompletedDays, setArrayOfCompletedDays] = useState<Date[]>([]);

  const today = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  useEffect(() => {
    setArrayOfCompletedDays([...arrayOfCompletedDays, ...CompltedDays]);
  }, [CompltedDays, isLoading]);

  console.log("does it worked or not ", arrayOfCompletedDays);

  const toggleDayCompletion = (day: Date) => {
    // make sure don't let them add the duplicate value

    arrayOfCompletedDays.some((d) => {
      let completedDay = new Date(d);
      console.log("compleday from the arrayofthedates", completedDay);
      console.log(day.getDate(), completedDay.getDate());
      console.log(completedDay.getMonth(), day.getMonth());
      console.log(completedDay.getFullYear(), day.getFullYear());
      if (
        completedDay.getDate() === day.getDate() &&
        completedDay.getMonth() === day.getMonth() &&
        completedDay.getFullYear() === day.getFullYear()
      ) {
        console.log("already completed the workout");
        alert("already completed the workout");
        return true;
        // this tell to stop the serch
      }
    });
    setArrayOfCompletedDays([...arrayOfCompletedDays, day]);
    console.log(arrayOfCompletedDays);
  };

  const isCompleted = (day: Date) => {
    let iscompleteflag = false;
    arrayOfCompletedDays.forEach((d) => {
      const completedDay = new Date(d);
      if (
        completedDay.getDate() === day.getDate() &&
        completedDay.getMonth() === day.getMonth() &&
        completedDay.getFullYear() === day.getFullYear()
      ) {
        iscompleteflag = true;
      }
    });
    return iscompleteflag;
  };

  const progressPercentage =
    (arrayOfCompletedDays.length / daysInMonth.length) * 100;
  return (
    <div className=" w-full  h-full lg:max-w-6xl mx-auto px-6  space-y-6  pb-40 lg:pb-0">
      {isLoading ? (
        <div className="flex h-full justify-center items-center">
          <PropagateLoader color="#81d4fa" />
        </div>
      ) : (
        <div>
          <div className="pt-8 lg:pt-0">
            <h1 className="font-montserrat text-3xl font-bold text-center hidden lg:block">
              Track your progress with Gymdominator
            </h1>

            <div className="text-sm text-center  lg:mt-2 lg:mb-0 text-gray-400 mt-2 mb-8 lg:flex justify-center gap-2 lg:gap-10">
              <div className="hidden lg:flex gap-4">
                <div className="flex items-center ">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="lg:text-base ">
                    <span className="">Enrolled Date: </span>
                    {format(
                      enrolledDate || new Date(2024, 7, 1),
                      "MMMM d, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="lg:text-base t">
                    <span className="">Completion Date: </span>
                    {format(
                      completiondate || new Date(2025, 1, 1),
                      "MMMM d, yyyy"
                    )}
                  </span>
                </div>
              </div>
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

            <div className="grid grid-cols-7 gap-4 lg:gap-4 ">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center font-medium ">
                  {day}
                </div>
              ))}
              {daysInMonth.map((day) => {
                return (
                  <Button
                    key={day.toString()}
                    variant={isCompleted(day) ? "default" : "outline"}
                    className={`h-12 lg:h-16 my-2 lg:my-0 lg:w-36 w-10 ${
                      !isSameMonth(day, currentDate) ? "opacity-50" : ""
                    } ${
                      format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                        ? "text-xs px-2 bg-blue-200 "
                        : ""
                    }`}
                    onClick={() => {
                      toggleDayCompletion(day);
                      console.log(
                        "returned the updated Array",
                        toggleDayCompletion(day)
                      );
                    }}
                  >
                    {isCompleted(day) ? (
                      <div className="lg:text-4xl text-2xl">💪</div>
                    ) : format(day, "yyyy-MM-dd") ===
                      format(today, "yyyy-MM-dd") ? (
                      "today"
                    ) : format(day, "yyyy-MM-dd") ===
                      format(
                        enrolledDate || new Date(2024, 1, 1),
                        "yyyy-MM-dd"
                      ) ? (
                      "Start"
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

            <div className="block lg:hidden text-gray-500">
              <div className="flex items-center ">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="lg:text-base ">
                  <span className="">Enrolled Date: </span>
                  {format(enrolledDate || new Date(2024, 7, 1), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                <span className="lg:text-base t">
                  <span className="">Completion Date: </span>
                  {format(
                    completiondate || new Date(2025, 1, 1),
                    "MMMM d, yyyy"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
