import { useEffect } from "react";
import { MealsaComponentCard } from "./MealsComponent";
import { WorkoutComponentCard } from "./WorkoutComponentCard";
import { FetchExcercise } from "@hooks/FetchExcercise";
import { useState } from "react";
export const TodaysPlan = () => {
  const [currentDate, setCurrentDate] = useState("");
  let muscle = "chest";
  let { isLoading, Excercise } = FetchExcercise({ muscle });

  Excercise = Excercise.filter(
    (exercise) =>
      exercise.MuscleGroup &&
      exercise.MuscleGroup.name &&
      exercise.MuscleGroup.name.toLowerCase() === muscle.toLowerCase()
  );

  console.log(Excercise);
  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  }, []);
  return (
    <div className="pb-20 bg-[#f0f0f0] lg:h-dvh ">
      <div className="lg:ml-24 lg:pt-10 pt-5 ml-5 w-fit mb-10">
        <div className="text-4xl font-montserrat font-semibold ">
          <span>Today's plans </span>
        </div>
        <div className="ml-2">
          <span className="text-gray-500 ">{currentDate}</span>
        </div>
      </div>
      {/* figure this out */}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">Loading</div>
      ) : (
        <div className=" lg:flex gap-10 justify-evenly items-center lg:mt-16  mx-10 lg:mx-0  space-y-10 lg:space-y-0">
          <WorkoutComponentCard Excercise={Excercise} />
          <MealsaComponentCard />
        </div>
      )}
    </div>
  );
};
