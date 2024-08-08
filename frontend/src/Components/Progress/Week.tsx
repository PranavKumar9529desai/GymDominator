import { WeekSvg } from "@components/Svg/weekSvg";
import { useState, useEffect } from "react";
export const Week = ({
  isactive,
  weeknumber,
  muscle 
}: {
  isactive: boolean;
  weeknumber: number;
  muscle : string
}) => {
  type ExerciseKeys = "dumbellPress" | "benchPress" | "pushUps";

  const [exercises, setexcercise] = useState<{
    dumbellPress: boolean;
    benchPress: boolean;
    pushUps: boolean;
  }>({
    dumbellPress: false,
    benchPress: false,
    pushUps: false,
  });

  const [WeekComplete, setWeekComplete] = useState<boolean>();
  const [iscompleted, setcompleted] = useState<boolean>(true);

  useEffect(() => {
    const allChecked = Object.values(exercises).every(Boolean);
    setcompleted(allChecked);
    console.log(exercises);
    console.log("allechecked", allChecked);
    console.log("iscompleted is :", iscompleted);
  }, [exercises]);

  const handleCheckboxChange = (exercise: ExerciseKeys) => {
    setexcercise((prev) => ({
      ...prev,
      [exercise]: !prev[exercise],
    }));
  };

  const HandleWeekCompletion = () => {
    setWeekComplete(true);
  };

  // pointer-events-none disbale the intraction to the conten to the user
  return (
    <div
      className={`${isactive ? `block` : `hidden`}   
    ${weeknumber == 2 ? `hover:cursor-no-drop` : ``}
      absolute bg-gray-200 lg:w-10/12 lg:px-10 px-4 py-5 left-0 top-5 w-11/12 `}
    >
      <div
        className={`${
          weeknumber == 2 ? `absolute` : `hidden`
        }  lg:top-32 lg:left-96  top-44 left-32 `}
      >
        <WeekSvg />
        <span className="w-fit text-base text-red-500">
          {" "}
          Complete week 1 to unlock this !
        </span>
      </div>
      <div className={`${weeknumber == 2 ? `blur-sm pointer-events-none` : ``}`}>
        <div className="text-xl whitespace-nowrap font-semibold ">
          {" "}
          Muscle : Chest{" "}
        </div>
        <div className="mt-5 w-fit ">
          <div className="text-xl text-gray-600"> Excercise : 3</div>
          <div className="text-xl my-2 w-fit text-gray-600">Excercises:</div>
          <div className="lg:grid grid-cols-2">
            {/* the input boxes */}
            <div className="text-lg  gap-2 ml-5 cols-span-1">
              <div className="">
                <input
                  className="size-4 mr-3 "
                  type="checkbox"
                  checked={exercises.dumbellPress}
                  onChange={() => handleCheckboxChange("dumbellPress")}
                />
                Dumbell Press
              </div>
              <div>
                <input
                  className="size-4 mr-3 "
                  type="checkbox"
                  checked={exercises.benchPress}
                  onChange={() => handleCheckboxChange("benchPress")}
                />
                Bench Press
              </div>
              <div>
                <input
                  className="size-4 mr-3 "
                  type="checkbox"
                  checked={exercises.pushUps}
                  onChange={() => handleCheckboxChange("pushUps")}
                />
                Push Ups
              </div>
            </div>
            {/* add the image here */}
            {/* <div className="w-full cols-span-1 flex justify-end items-start">
            <img
            className="w-7/12"
            src="https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/chest_0.jpg"
            alt="chest image"
            />
            </div> */}
          </div>
        </div>

        <div className="mt-5">
          {iscompleted ? (
            <div>
              <div
                className={` px-2 py-1 justify-center items-center text-blue-400 text-lg`}
              >
                <input
                  className="size-4 ml-3 whitespace-nowrap "
                  type="checkbox"
                  onChange={() => {
                    HandleWeekCompletion();
                  }}
                />{" "}
                Do you sucessfully completeed all the excercises ?.Click on the
                Checkbox to go the next week
                {/* <div className="">
                <button className="">Completed</button>
                </div> */}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
