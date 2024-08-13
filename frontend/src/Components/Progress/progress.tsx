import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { excercise, MuscleGrp } from "@state/Selectors/MuscleGrpSelectot";
import { Dispatch, SetStateAction, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

// TODO when day is completed add cross to the day
export const Weekcomponent = () => {
  const [isClicked, setisClicked] = useState<boolean>(false);
  const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const { isLoading, muscles } = FetchMusclesGroups();
  console.log("data from the progress", muscles);
  // console.log(muscles);
  let SlicedMuscles = isClicked ? muscles.slice(0, 5) : muscles.slice(0, 3);

  return (
    <div className="lg:border border-gray-200 rounded-xl bg-[#f5f5f5]  lg:pb-4  pb-20">
      <div className="*:block text-center p-4 *:m-3">
        <span className=" text-5xl font-extrabold font-montserrat  ">
          Week 1
        </span>
        <span className="text-gray-400 lg:text-lg font-overpass">
          Track your progress and consistency using the Gymdominator.
        </span>
      </div>

      <div
        className={`lg:flex lg:flex-wrap gap-10  justify-center pb-8 space-y-10 lg:space-y-0 w-full  `}
      >
        {/* how to map to a specific key
         */}

        {isLoading ? (
          <div className="text-center text-xl">Loading ...</div>
        ) : (
          SlicedMuscles.map((mus, key) => {
            console.log("from the daycard ", mus.Exercise);
            return (
              <div className="">
                <DayCard
                  day={WeekDays[key]}
                  ExcerciseList={mus.Exercise}
                  muscle={mus.name}
                  img={mus.img}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="text-center mb-4">
        <div className=" grid grid-cols-5 *:m-auto">
          <div className="col-span-2 ">
            <Button text="Back" />
          </div>
          <div className="col-span-1 whitespace-nowrap">
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

const DayCard = ({
  day,
  img,
  muscle,
  ExcerciseList,
}: {
  day: string;
  muscle: string;
  img: string;
  ExcerciseList: excercise[];
}) => {
  // const location = useLocation();
  // console.log("current rotu is ", location);
  console.log("inside the day card", ExcerciseList);
  return (
    <div className="border border-gray-200 w-80 text-center justify-center pt-3 rounded-lg bg-white">
      <div className="text-center text-2xl font-semibold text-blue-400 font-montserrat">
        {day}
      </div>
      <div className="text-gray-400 text-lg font-roboto">{muscle}</div>

      <div className="mx-auto py-4">
        <img alt="muscle image " src={img} />
      </div>

      <div>
        <div className="text-left text-lg text-gray-500 ml-2 font-roboto">
          Excercises:
        </div>
        <div className="text-left ml-4 mt-2">
          <div className="">
            {ExcerciseList.map((excercise, key) => {
              return (
                <div
                  key={key}
                  className="hover:text-blue-400 py-1  hover:-translate-y-1 transition-all font-montserrat font-semibold text-gray-500 h-10 my-auto"
                >
                  <input
                    type="checkbox"
                    className="mr-2 size-[18px] relative  top-1"
                  />
                  {/* use / to the front to stat from the root route  */}
                  <Link to={`/dashboard/workouts/chest/${excercise.name}`}>
                    <span className="align-center">
                      {excercise.name ? excercise.name : "cardio"}
                    </span>
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
        className="text-lg text-blue-400 relative animate-bounce "
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
