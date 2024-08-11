import { Dispatch, SetStateAction, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WeekButton } from "./weekbutton";
import { Dashboard } from "@routes/dashboard ";

export const Progress = () => {
  return (
    <div className="w-11/12 ml-8">
      <Weekcomponent />
    </div>
  );
};

// const WeekComponent = () => {
//   return (
//     <div className="">
//       <div className="w-full text-center">
//         <span className="lg:text-4xl font-extrabold text-3xl">
//           Welcome to 24 weeks challenge
//         </span>
//       </div>
//       <div className="h-fit lg:ml-10 mt-8  mb-[500px] ml-8 ">
//         <div className="flex flex-col lg:gap-96 gap-[450px]">
//           <WeekButton weeknu={1} />
//           <WeekButton weeknu={2} />
//         </div>
//       </div>
//     </div>
//   );
// };

interface DayCardProps {
  day: string;
  musclegrp: string;
  img: string;
  ExcerciseList: Excercise[];
}

export const Weekcomponent = () => {
  const [isClicked, setisClicked] = useState<boolean>(false);
  const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const Musclegrp = [ "Chest" , "Uppearback" , "Biceps" , "Triceps" , "Shoulder"]

  let ExcerciseList = [
    {
      name: "Incline Bench Press",
    },
    {
      name: "Dumbbell Bench Press",
    },
    {
      name: "Bench Press",
    },
  ];

  let DayCardProps: DayCardProps = {
    day: WeekDays[0],
    musclegrp: Musclegrp[2],
    img: "",
    ExcerciseList: ExcerciseList,
  };

  return (
    <div className="border border-gray-200 ">
      <div className="*:block text-center p-4 *:m-3">
        <span className=" text-4xl font-extrabold">Week 1</span>
        <span className="text-gray-400 text-lg">
          track your progress and consistency using the Gymdominator.
        </span>
      </div>

      <div className={`flex flex-wrap gap-10 justify-center pb-8 `}>
        <DayCard DayCardProps={DayCardProps} />
        <DayCard DayCardProps={DayCardProps} />
        <DayCard DayCardProps={DayCardProps} />
        <div className={`${isClicked ? "flex  gap-10" : "hidden"}`}>
          <DayCard DayCardProps={DayCardProps} />
          <DayCard DayCardProps={DayCardProps} />
        </div>
      </div>
      <div className="text-center mb-4">
        <div className=" grid grid-cols-5 *:m-auto">
          <div className="col-span-2 ">
            <Button text="Back" />
          </div>
          <div className="col-span-1">
            <SeeMore setisClicked={setisClicked} isClicked={isClicked} />
          </div>
          <div className="col-span-2">
            <Button text="Next" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface Excercise {
  name: string;
}

const DayCard = ({ DayCardProps }: { DayCardProps: DayCardProps }) => {
  const location = useLocation();
  console.log("current rotu is ", location);
  return (
    <div className="border border-gray-200 w-80 text-center justify-center pt-3 ">
      <div className="text-center text-2xl font-semibold text-blue-400">
        {DayCardProps.day}
      </div>
      <div className="text-gray-400 text-lg">{DayCardProps.musclegrp}</div>

      <div className="mx-auto py-4">
        <img
          src="https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/chest_0.jpg"
          alt="muscle image "
        />
      </div>

      <div>
        <div className="text-left text-lg text-gray-500 ml-2">Excercises:</div>
        <div className="text-left ml-24 space-y-3 ">
          <div className="">
            {DayCardProps.ExcerciseList.map((excercise, key) => {
              return (
                <div
                  key={key}
                  className="hover:*:text-blue-400 transition-colors"
                >
                  <input type="checkbox" className="mr-2 size-4" />
                  {/* use / to the front to stat from the root route  */}
                  <Link to={`/dashboard/workouts/chest/${excercise.name}`}>
                    {excercise.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SeeMore = ({
  setisClicked,
  isClicked,
}: {
  setisClicked: Dispatch<SetStateAction<boolean>>;
  isClicked: boolean;
}) => {
  return (
    <div>
      <button
        className="text-lg text-blue-400 relative "
        onClick={() => {
          setisClicked((prevState) => !prevState);
        }}
      >
        {isClicked ? "See less" : "See more"}
      </button>
      <div></div>
    </div>
  );
};

const Button = ({ text }: { text: string }) => {
  return (
    <button>
      <div className=" px-5  py-2  bg-gray-800 text-white rounded-lg ">
        {text}
      </div>
    </button>
  );
};
