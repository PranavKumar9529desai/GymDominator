import { Sidebar } from "@components/SideBar/sidebar";
import { useState } from "react";
import { useEffect } from "react";

export const Progress = () => {
  return (
    <div className="w-full">
      <WeekComponent />
    </div>
  );
};

const WeekComponent = () => {
  return (
    <div className="">
      <div className="w-full text-center">
        <span className="lg:text-4xl font-extrabold text-3xl">
          Welcome to 24 weeks challenge
        </span>
      </div>
      <div className="h-fit lg:ml-10 mt-8  mb-[500px] ml-8 ">
        <div className="flex flex-col lg:gap-96 gap-[450px]">
          <WeekButton weeknu={1} />
          <WeekButton weeknu={2} />
        </div>
      </div>
    </div>
  );
};

const WeekButton = ({ weeknu }: { weeknu: number }) => {
  const [isactive, setisactive] = useState<boolean>(true);
  return (
    <div>
      <button
        className=" "
        onClick={() => {
          setisactive((prevState) => !prevState);
        }}
      >
        <span className="text-xl font-semibold  bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 ">
          Week {weeknu}
          <svg
            className="inline ml-3"
            fill="#fff"
            height="15px"
            width="15px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 330 330"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="5"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              ></path>{" "}
            </g>
          </svg>
        </span>
      </button>

      {/* dropdown weeek component */}
      <div className="flex  justify-center w-full relative">
        <Week isactive={isactive} weeknumber={weeknu} />
      </div>
    </div>
  );
};

const Week = ({
  isactive,
  weeknumber,
}: {
  isactive: boolean;
  weeknumber: number;
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

  return (
    <div
      className={`${isactive ? `block` : `hidden`}   
    ${weeknumber == 2 ? `` : ``}
      absolute bg-gray-200 lg:w-10/12 lg:px-10 px-4 py-5 left-0 top-5 w-11/12 `}
    >
      <div
        className={`${
          weeknumber == 2 ? `absolute` : `hidden`
        }  lg:top-32 lg:left-96  top-44 left-32`}
      >
        <svg
          fill="#101fea"
          height="40px"
          width=""
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="XMLID_509_">
              {" "}
              <path
                id="XMLID_510_"
                d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
        <span className="w-fit text-base text-red-500"> Complete week 1 to unlock this !</span>
      </div>
      <div className={`${weeknumber == 2 ? `blur-sm` : ``}`}>
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
