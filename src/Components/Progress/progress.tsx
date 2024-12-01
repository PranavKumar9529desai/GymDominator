import { ProgressBar } from "@components/progressBar";
import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { excercise  } from "@state/Selectors/MuscleGrpSelectot";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export const Progress = () => {
  return (
    <div className=" flex justify-center ">
      <Weekcomponent />
    </div>
  );
};

export const Weekcomponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setisClicked] = useState<boolean>(false);
  const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const { isLoading, muscles } = FetchMusclesGroups();
  console.log("data from the progress", muscles);
  let SlicedMuscles = isClicked ? muscles.slice(0, 5) : muscles.slice(0, 3);

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true);
    }
  }, []);

  return (
    <div className="lg:h-dvh lg:border border-gray-200 rounded-xl bg-[#f5f5f5]  lg:pb-4 pb-20 lg:px-10">
      <div
        className={`
           duration-500 ease-in-out>
          ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }
          `}
      >
        <div className="*:block text-center p-4 *:m-2">
          <div>
            <ProgressBar width={10} />
          </div>
          <span className=" text-5xl font-extrabold font-montserrat  ">
            Week 1
          </span>
          <span className="text-gray-400 lg:text-lg font-overpass">
            Track your progress and consistency using the Gymdominator.
          </span>
        </div>

        <div
          className={`lg:flex lg:flex-wrap gap-10  justify-center pb-8 lg:pb-4 space-y-10 lg:space-y-0 w-full  `}
        >
          {isLoading ? (
            <div className="lg:min-w-[1040px] text-center text-xl">
              Loading ...
            </div>
          ) : (
            SlicedMuscles.map((mus, key) => {
              console.log("from the daycard ", mus.Exercise);
              return (
                <div className="flex justify-center ">
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
          {isLoading ? (
            " "
          ) : (
            <SeeMore setisClicked={setisClicked} isClicked={isClicked} />
          )}
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
  return (
    <div className="border border-gray-200 w-80 text-center justify-center pt-3 rounded-lg bg-white">
      <div className="text-center text-2xl font-semibold text-blue-400 font-montserrat">
        {day}
      </div>
      <div className="text-gray-400 text-lg font-montserrat">{muscle}</div>

      <div className="mx-auto py-4">
        <img alt="muscle image " src={img} />
      </div>

      <div>
        <div className="text-left text-lg text-gray-500 ml-2 font-montserrat">
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
        className="text-lg text-blue-400  "
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

// const Button = ({ text }: { text: string }) => {
//   return (
//     <button>
//       <div className="flex justify-center items-center px-4  py-2  bg-gray-800 text-white rounded-lg ">
//         <div className={`${text == "Next" ? "hidden" : " "} mr-1`}>
//           <svg
//             fill="#ffffff"
//             height="12px"
//             width="px"
//             version="1.1"
//             id="Layer_1"
//             xmlns="http://www.w3.org/2000/svg"
//             xmlnsXlink="http://www.w3.org/1999/xlink"
//             viewBox="0 0 330 330"
//             xmlSpace="preserve"
//             transform="rotate(180)"
//           >
//             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//             <g
//               id="SVGRepo_tracerCarrier"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             ></g>
//             <g id="SVGRepo_iconCarrier">
//               {" "}
//               <path
//                 id="XMLID_222_"
//                 d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
//               ></path>{" "}
//             </g>
//           </svg>
//         </div>
//         {text}
//         <div className={`${text == "Back" ? "hidden" : " "} ml-1`}>
//           <svg
//             fill="#ffffff"
//             height="12px"
//             width="20px"
//             version="1.1"
//             id="Layer_1"
//             xmlns="http://www.w3.org/2000/svg"
//             xmlnsXlink="http://www.w3.org/1999/xlink"
//             viewBox="0 0 330 330"
//             xmlSpace="preserve"
//           >
//             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//             <g
//               id="SVGRepo_tracerCarrier"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             ></g>
//             <g id="SVGRepo_iconCarrier">
//               {" "}
//               <path
//                 id="XMLID_222_"
//                 d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
//               ></path>{" "}
//             </g>
//           </svg>
//         </div>
//       </div>
//     </button>
//   );
// };
