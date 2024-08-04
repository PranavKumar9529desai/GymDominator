import { DietSvg } from "@components/Svg/dietSvg";
import { ProgressSvg } from "@components/Svg/progressSvg";
import { RecipesSvg } from "@components/Svg/recipesSvg";
import { WorkoutSvg } from "@components/Svg/workoutSvg";
import gymLaunch from "@assets/gym-launch-logo.png";
import { BottomNavigation } from "@components/Dashboard/BottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  console.log("location", location);
  return (
    <div className="">
      {/* vertical sidbar  */}
      <div className="border border-r-1 border-gray-200 h-dvh hidden sm:flex w-[275px] flex-col  text-center  mt-[-2px] ml-[-2px]">
        <div className="w-full h-20 items-center justify-center flex text-xl border-b text-white bg-gray-950   font-semibold font-sans  ">
          <img src={gymLaunch} alt="" width={100} className="mt-2" />
          <p className="relative -left-5 font-roboto text-xl">Gymdomaintor</p>
        </div>
        <div className="relative top-20 flex flex-col gap-5  ">
          <NavigateDiv
            text="My Progress"
            svg={
              <ProgressSvg
                active={location.pathname == "/dashboard/myprogress"}
              />
            }
            active={location.pathname == "/dashboard/myprogress"}
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
  const navigate = useNavigate();
  return (
    <button
      style={{}}
      className={`grid grid-cols-5 hover:bg-gray-200 *:h-12 *:flex *:items-center *:justify-center  font-semibold text-lg transition-all  group ${
        active ? "bg-gray-200" : "hover:bg-gray-200"
      }`}
      // className="grid grid-cols-5 hover:bg-gray-200 *:h-12 *:flex *:items-center *:justify-center  font-semibold text-lg transition-all group"
      onClick={() => {
        navigate(`/dashboard/${text.split(" ").join("").toLowerCase()}`);
      }}
    >
      <div className="col-span-2 justify-self-end mr-2 ">{svg}</div>
      <span
        className={`col-span-3 justify-self-start border-b border-transparent text-gray-500 ${
          active ? `!text-blue-500` : `group-hover:text-blue-400`
        } `}
      >
        {text}
      </span>
    </button>
  );
};
