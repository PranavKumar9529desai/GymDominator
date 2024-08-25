import { useEffect } from "react";
import { MealsaComponentCard } from "./MealsComponent";
import { WorkoutComponentCard } from "./WorkoutComponentCard";
import { FetchExcercise } from "@hooks/FetchExcercise";
import { Excercisetype } from "@state/Selectors/ExcerciseSelectorsfamily";
import { useState } from "react";
export const TodaysPlan = () => {
  const [currentDate, setCurrentDate] = useState("");
  let muscle = "chest";
  let { isLoading, Excercise } = FetchExcercise({ muscle });
  isLoading = false ;
 const Excercises: Excercisetype[] = [
  {
    name: "Push-ups",
    img: "push-ups.jpg",
    instructions: "Place your hands shoulder-width apart, lower your body until your chest touches the ground, and push back up.",
    videolink: "https://www.youtube.com/watch?v=d0s60-gX_8A",
    MuscleGroup: {
      id: 1,
      name: "Chest",
      img: "chest.jpg",
      fullimage: "chest_full.jpg",
    },
  },
  {
    name: "Squats",
    img: "squats.jpg",
    instructions: "Stand with your feet shoulder-width apart, lower your body as if sitting down, and then stand back up.",
    videolink: "https://www.youtube.com/watch?v=DES3-j8h87I",
    MuscleGroup: {
      id: 2,
      name: "Legs",
      img: "legs.jpg",
      fullimage: "legs_full.jpg",
    },
  },
  {
    name: "Plank",
    img: "plank.jpg",
    instructions: "Get into a push-up position and hold it, keeping your body in a straight line from your head to your heels.",
    videolink: "https://www.youtube.com/watch?v=c5_8f75200E",
    MuscleGroup: {
      id: 3,
      name: "Core",
      img: "core.jpg",
      fullimage: "core_full.jpg",
    },
  },
  // {
  //   name: "Lunges",
  //   img: "lunges.jpg",
  //   instructions: "Step forward with one leg, lower your body until both knees are bent at a 90-degree angle, and then step back.",
  //   videolink: "https://www.youtube.com/watch?v=5o259k-263Q",
  //   MuscleGroup: {
  //     id: 4,
  //     name: "Legs",
  //     img: "legs.jpg",
  //     fullimage: "legs_full.jpg",
  //   },
  // },
  // {
  //   name: "Pull-ups",
  //   img: "pull-ups.jpg",
  //   instructions: "Hang from a bar with your hands shoulder-width apart, pull your body up until your chin clears the bar, and then lower back down.",
  //   videolink: "https://www.youtube.com/watch?v=9B19nN2_n_c",
  //   MuscleGroup: {
  //     id: 5,
  //     name: "Back",
  //     img: "back.jpg",
  //     fullimage: "back_full.jpg",
  //   },
  // },
];

  // Excercise = Exercises.filter(
  //   (exercise) =>
  //     exercise.MuscleGroup &&
  //     exercise.MuscleGroup.name &&
  //     exercise.MuscleGroup.name.toLowerCase() === muscle.toLowerCase()
  // );

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
        <div className="text-4xl font-montserrat font-semibold lg:ml-0 ">
          <span className="">Today's plans </span>
        </div>
        <div className="ml-2">
          <span className="text-gray-500 ">{currentDate}</span>
        </div>
      </div>
      {/* figure this out */}
      {isLoading ? (
        <div className="flex justify-center items-center h-full">Loading</div>
      ) : (
        <div className="lg:flex gap-10 justify-evenly items-center lg:mt-16  mx-10 lg:mx-0  space-y-10 lg:space-y-0"> <WorkoutComponentCard Excercise={Excercises} />
          <MealsaComponentCard />
        </div>
      )}
    </div>
  );
};
