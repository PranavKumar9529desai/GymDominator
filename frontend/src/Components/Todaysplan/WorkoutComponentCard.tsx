import { WorkoutComponent } from "./WorkoutComponent";
import { Excercisetype } from "@state/Selectors/SingleWorkoutSelectorsFamily";
import { SvgWorkout } from "@components/Svg/today'splanworkoutSvg";
import { useState } from "react";

export const WorkoutComponentCard = ({
  Excercise,
}: {
  Excercise: Excercisetype[];
}) => {
  const [completionStatus, setCompletionStatus] = useState<boolean[]>(
    new Array(Excercise.length).fill(false)
  );
  const [allcomplete, setallcomplete] = useState<boolean>(false);
  let handleCompletion = (index: number, iscomplete: boolean) => {
    let newStaus = [...completionStatus];
    newStaus[index] = iscomplete;
    setCompletionStatus(newStaus);
    console.log(completionStatus);
    if (newStaus.every((status) => status)) {
      setallcomplete((prevState) => !prevState);
      alert("have you completd the excercise");
    }
  };

  // TODO add this to the habit tracker
  return (
    <div className="relative">
      <div
        className={`${
          allcomplete ? "absolute z-10 " : "hidden"
        } flex justify-center items-center bg-gray-400  top-40 right-36`}
      >
        completed svg
      </div>
      <div
        className={`bg-white text-white  px-8 py-5 h-fit rounded-lg  ${
          allcomplete ? "blur-[1px] pointer-events-none" : ""
        } `}
      >
        <div className="text-center ">
          <div className="inline-flex gap-2 *:text-gray-600">
            <SvgWorkout />
            <span className="text-2xl font-pop ">Workouts</span>
          </div>
          <div className="text-gray-400">View All</div>
        </div>
        <div className="">
          <div className="space-y-4  mt-3 text-gray-600 ">
            {Excercise.map((ex, index) => {
              return (
                <div className="" key={index}>
                  <WorkoutComponent
                    name={ex.name}
                    onCompletionChange={(iscomplete: boolean) =>
                      handleCompletion(index, iscomplete)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="py-2  bg-black text-center font-montserrat font-semibold mt-8 text-base rounded-lg ">
          {allcomplete ? "all completed" : "complete the workout"}
        </div>
      </div>
    </div>
  );
};


