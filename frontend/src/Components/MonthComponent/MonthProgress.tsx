import { Calendar } from "@components/ui/ui/calendar";
import React from "react";
export const MonthProgressComponent = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  console.log(date);
  return (
    <div className="h-full">
        <div className="text-3xl font-semibold font-montserrat relative top-10 ml-16">
            <span className="">Track your progress with Gymdominator</span>
        </div>
      <div className="flex justify-center items-center h-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border-2 px-10 py-4"
        />
      </div>
    </div>
  );
};
