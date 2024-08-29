import { DietSvg } from "@components/Svg/dietSvg";
import { ProgressSvg } from "@components/Svg/progressSvg";
import { RecipesSvg } from "@components/Svg/recipesSvg";
import { WorkoutSvg } from "@components/Svg/workoutSvg";
import gymLaunch from "@assets/gym-launch-logo.png";
import { BottomNavigation } from "@components/Dashboard/BottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { RigthArrow } from "@components/Svg/rigtharrow";
import { useState } from "react";

export const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="">
      {/* vertical sidbar  */}
      <div className="border border-r-1 border-gray-200 h-dvh hidden sm:flex w-[300px] flex-col  text-center  mt-[-2px] ml-[-2px] fixed left-0 ">
        <div
          className="w-full h-20 items-center justify-center flex text-xl border-b text-white bg-black
           font-semibold  pr-6 "
        >
          <img src={gymLaunch} alt="" width={100} className="mt-2" />
          <p className="relative -left-5 text-xl font-extrabold">
            GymDominator
          </p>
        </div>
        <div className="relative top-20 flex flex-col gap ">
          <NavigateDivDropDown
            text="My Progress"
            svg={
              <ProgressSvg
                active={location.pathname == "/dashboard/myprogress"}
              />
            }
            active={location.pathname == "/dashboard/myprogress"}
            svg2={<RigthArrow />}
            DropDown={<SideDropDown />}
          />
          <NavigateDiv
            text="Workouts"
            svg={
              <WorkoutSvg active={location.pathname == "/dashboard/workouts"} />
            }
            active={location.pathname == "/dashboard/workouts"}
          />
          <NavigateDiv
            text="Diet"
            svg={<DietSvg active={location.pathname == "/dashboard/diet"} />}
            active={location.pathname == "/dashboard/diet"}
          />
          <NavigateDiv
            text="Recipes"
            svg={
              <RecipesSvg active={location.pathname == "/dashboard/recipes"} />
            }
            active={location.pathname == "/dashboard/recipes"}
          />
          <NavigateDiv
            text="Today's plan"
            svg={
              <WorkoutSvg
                active={location.pathname == "/dashboard/today'splan"}
              />
            }
            active={location.pathname == "/dashboard/today'splan"}
          />
        </div>
      </div>

      <div className="grid md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

const NavigateDiv = ({
  text,
  svg,
  active,
}: {
  text: string;
  svg?: JSX.Element;
  active: boolean;
}) => {
  // const [ showdropdown , setshowdropdown ] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center w-full peer">
        <button
          style={{}}
          className={`w-full grid grid-cols-5 hover:bg-gray-200 h-16 items-center *:flex *:items-center *:justify-center  font-semibold text-lg transition-all  group relative ${
            active ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          // className="grid grid-cols-5 hover:bg-gray-200 *:h-12 *:flex *:items-center *:justify-center  font-semibold text-lg transition-all group"
          onClick={() => {
            navigate(`/dashboard/${text.split(" ").join("").toLowerCase()}`);
          }}
        >
          <div className="col-span-2 justify-self-end ">{svg}</div>
          <span
            className={`col-span-3 justify-self-start border-b border-transparent text-gray-500 ${
              active ? `!text-blue-500` : `group-hover:text-blue-400`
            } `}
          >
            {text}
          </span>
        </button>
      </div>
    </>
  );
};

const NavigateDivDropDown = ({
  text,
  svg,
  active,
  svg2,
  DropDown,
}: {
  text: string;
  svg?: JSX.Element;
  active: boolean;
  svg2?: JSX.Element;
  DropDown?: JSX.Element;
}) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  console.log(isDropDownVisible);
  return (
    <>
      <div className="flex justify-center w-full peer">
        <button
          className={`w-full grid grid-cols-5 hover:bg-gray-200 h-16 items-center *:flex *:items-center *:justify-center  font-semibold text-lg transition-all  group relative ${
            active ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          // className="grid grid-cols-5 hover:bg-gray-200 *:h-12 *:flex *:items-center *:justify-center  font-semibold text-lg transition-all group"
          onClick={() => {
            setIsDropDownVisible((prevState) => !prevState);
            //  navigate(`/dashboard/${text.split(" ").join("").toLowerCase()}`);
          }}
        >
          <div className="col-span-2 justify-self-end ">{svg}</div>
          <span
            className={`col-span-3 justify-self-start border-b border-transparent text-gray-500 ${
              active ? `!text-blue-500` : `group-hover:text-blue-400`
            } `}
          >
            {text}
            <span className="relative left-10">{svg2}</span>
          </span>
        </button>
      </div>
      <div className={`${isDropDownVisible == true ? "block -mt-2" : "hidden"}`}>
        {DropDown}
      </div>
    </>
  );
};

const SideDropDown = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className=" *:w-full  text-center text-gray-600 space-y-2 my-2 hover:*:bg-gray-200 hover:*:text-blue-400 *:py-3 *:border-b-2 border-gray-200">
        <button
          onClick={() => {
            navigate("/dashboard/myprogress/week");
          }}
        >
          Weekly Progress
        </button>
        <button className="relative -top-2"
          onClick={() => {
            navigate("/dashboard/myprogress/month");
          }}
        >
          Monthly Progress
        </button>
    </div>
  );
};
