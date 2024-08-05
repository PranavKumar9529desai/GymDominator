import { ProgressSvg } from "@components/Svg/progressSvg";
import { WorkoutSvg } from "@components/Svg/workoutSvg";
import { DietSvg } from "@components/Svg/dietSvg";
import { RecipesSvg } from "@components/Svg/recipesSvg";
import { useNavigate, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 h-16 w-full grid grid-cols-4  border-t border-gray-300 *:font-semibold *:text-balance  z-50 transition-all bg-white ">
      <button
        className={`flex flex-col justify-center w-full items-center group transition-all ${
          location.pathname == "/dashboard/myprogress" ? `bg-gray-200` : ` `
        } `}
        onClick={() => {
          navigate("/dashboard/myprogress");
        }}
      >
        <div>
          <ProgressSvg active={location.pathname == "/dashboard/myprogress"} />
        </div>
        <span
          className={`text-base text-gray-500 ${
            location.pathname == "/dashboard/myprogress"
              ? `!text-blue-400`
              : ` `
          } `}
        >
          Progress{" "}
        </span>
      </button>
      <button
        className={`flex flex-col justify-center w-full items-center group transition-all ${
          location.pathname == "/dashboard/workouts" ? `bg-gray-200` : ` `
        } `}
        onClick={() => {
          navigate("/dashboard/workouts");
        }}
      >
        <WorkoutSvg active={location.pathname == "/dashboard/workouts"} />
        <span
          className={`text-base text-gray-500 ${
            location.pathname == "/dashboard/workouts" ? `!text-blue-400` : ` `
          } `}
        >
          {" "}
          Workout{" "}
        </span>
      </button>
      <button
        className={`flex flex-col justify-center w-full items-center group transition-all ${
          location.pathname == "/dashboard/diet" ? `bg-gray-200` : ` `
        } `}
        onClick={() => {
          navigate("/dashboard/diet");
        }}
      >
        <DietSvg active={location.pathname == "/dashboard/diet"} />
        <span
          className={`text-base text-gray-500  ${
            location.pathname == "/dashboard/diet" ? `!text-blue-400` : ` `
          } `}
        >
          {" "}
          Diet{" "}
        </span>
      </button>
      <button
        className={`flex flex-col justify-center w-full items-center group transition-all ${
          location.pathname == "/dashboard/recipes" ? `bg-gray-200` : ` `
        } `}
        onClick={() => {
          navigate("/dashboard/recipes");
        }}
      >
        <RecipesSvg active={location.pathname == "/dashboard/recipes"} />
        <span
          className={`text-base text-gray-500 ${
            location.pathname == "/dashboard/recipes" ? `!text-blue-400` : ` `
          } `}
        >
          {" "}
          Recipes
        </span>
      </button>
    </div>
  );
};
