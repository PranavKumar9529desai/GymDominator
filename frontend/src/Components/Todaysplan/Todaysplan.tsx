import { WorkoutSvg } from "@components/Svg/workoutSvg";
import { useEffect, useState } from "react";
export const TodaysPlan = () => {
  const [currentDate, setCurrentDate] = useState("");

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
    <div className="h-dvh bg-[#f0f0f0] ">
      <div className="ml-24 pt-10">
        <div className="text-4xl font-montserrat font-semibold">
          <span>Today's plans </span>
        </div>
        <div className="ml-2">
          <span className="text-gray-500 ">{currentDate}</span>
        </div>
      </div>

      <div className="flex justify-center gap-10 items-center mt-20">
        <ComponentCard />
        <MealsaComponentCard />
      </div>
    </div>
  );
};

const ComponentCard = () => {
  return (
    <div className="bg-white text-white min-w-[500px] px-8 py-5 rounded-lg">
      <div className="text-center ">
        <div className="inline-flex gap-2 text-gray-400">
          <Svg />
          <span className="text-2xl font-pop text-gray-400 ">Workouts</span>
        </div>
        <div className="text-gray-400">View All</div>
      </div>
      <div className="">
        <div className="space-y-4  mt-3 text-gray-600">
          <div>
            <div className="text-lg font-pop">Bench Press</div>
            <div className="inline ">
              <progress />
            </div>
            <div className="text-sm block text-gray-500">75% completed</div>
          </div>
          <div>
            <div className="text-lg font-pop">Bench Press</div>
            <div className="text-sm block text-gray-500">75% completed</div>
          </div>
          <div>
            <div className="text-lg font-pop">Bench Press</div>
            <div className="text-sm block text-gray-500">75% completed</div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="py-2  bg-black text-center font-montserrat font-semibold mt-8 text-base rounded-lg ">
        Start Workout
      </div>
    </div>
  );
};

const SvgMeal = () => {
  return (
    <div>
      <svg
        fill="CurrentColor"
        height="20px"
        width="px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
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
          <g>
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M422.7,305.365l-82.411,51.627c-5.867,3.136-17.899,4.693-31.211,5.44c-0.939-6.059-3.499-12.949-8.619-20.629 c-15.808-23.573-33.899-33.643-60.523-33.643h-31.552c-14.101,0-27.712-4.437-38.4-12.48 c-18.283-13.76-39.509-17.771-63.317-12.437v-5.909c0-11.776-9.536-21.333-21.333-21.333h-64 c-11.797,0-21.333,9.557-21.333,21.333v213.333C0.001,502.443,9.537,512,21.334,512h64c11.797,0,21.333-9.557,21.333-21.333 v-0.021l63.552-0.043l4.864,0.085c17.131,0,34.432-1.323,51.051-3.84l104.213-13.653c4.224-0.107,8.491-0.597,12.736-1.493 c11.968-1.813,23.275-7.424,32.853-16.299l122.667-95.531c14.891-12.331,17.749-34.24,6.528-49.899 C482.028,277.781,453.59,289.045,422.7,305.365z M64.001,313.643v155.691H42.668V298.667h21.333V313.643z"></path>{" "}
                <path d="M150.429,262.741c2.901,8.725,11.051,14.592,20.245,14.592h298.667c9.173,0,17.323-5.867,20.224-14.592l21.333-64 c2.176-6.507,1.088-13.653-2.923-19.2c-4.011-5.589-10.453-8.875-17.301-8.875h-1.493 c-9.664-77.056-70.805-138.176-147.84-147.861v-1.472C341.341,9.557,331.783,0,320.007,0c-11.797,0-21.333,9.557-21.333,21.333 v1.472c-77.056,9.685-138.176,70.805-147.861,147.861h-1.472c-6.869,0-13.291,3.285-17.323,8.875 c-3.989,5.547-5.099,12.693-2.923,19.2L150.429,262.741z M461.063,213.333l-7.104,21.333H186.034l-7.104-21.333H461.063z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </div>
  );
};
const MealsaComponentCard = () => {
  return (
    <div className="bg-black text-white min-w-[500px] px-8 py-5 rounded-lg">
      <div className="text-center ">
        <div className="inline-flex gap-2">
          <SvgMeal />
          <span className="text-2xl font-pop ">Meals</span>
        </div>
        <div className="">View All</div>
      </div>
      <div>
        <div className="space-y-4  mt-3">
          <div>
            <div className="text-lg font-pop">Breakfast</div>
            <div className="text-sm block text-gray-500">75% completed</div>
          </div>
          <div>
            <div className="text-lg font-pop">Lunch</div>
            <div className="text-sm block text-gray-500">75% completed</div>
          </div>
          <div>
            <div className="text-lg font-pop">Dinner</div>
            <div className="text-sm block text-gray-500">75% completed</div>
          </div>
        </div>
      </div>
      <div className="py-2  bg-white text-black text-center font-montserrat font-semibold mt-8 text-base rounded-lg ">
        Start Workout
      </div>
    </div>
  );
};

const Svg = () => {
  return (
    <div>
      <svg
        fill="CurrentColor"
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        // fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000000"
        strokeWidth="0.192"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 7.5H7.5V11.25V12.75V16.5H6V7.5ZM9 12.75V18H4.5V16.5H1.5V7.5H4.5V6H9V11.25L15 11.25V6H19.5V7.5L22.5 7.5V16.5H19.5V18H15V12.75L9 12.75ZM16.5 12.75L16.5 16.5H18L18 7.5L16.5 7.5L16.5 11.25V12.75ZM4.5 9H3V15H4.5V9ZM19.5 15H21V9H19.5V15Z"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
};
