import { ProgressSvg } from "@components/Svg/progressSvg";
import { WorkoutSvg } from "@components/Svg/workoutSvg";
import { DietSvg } from "@components/Svg/dietSvg";
import { useNavigate, useLocation } from "react-router-dom";
import { GoalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ChevronUp, BarChart2, TrendingUp } from "lucide-react";
export const BottomNavigation2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState<boolean>(false);
  return (
    <div className="fixed bottom-0 h-[70px] py-auto  w-full grid grid-cols-4  border-t border-gray-300 *:font-semibold *:text-balance  z-50 transition-all bg-white *:py-2">
      <button
        className={`flex flex-col justify-center w-full items-center group transition-all ${
          location.pathname === "/dashboard/myprogress" ||
          location.pathname === "/dashboard/myprogress/month" ||
          location.pathname === "/dashboard/myprogress/week"
            ? `bg-gray-200`
            : ` `
        } `}
        onClick={() => {
          setisOpen((prevState) => !prevState);
          // navigate("/dashboard/myprogress");
        }}
      >
        <div>
          <ProgressSvg
            active={
              location.pathname === "/dashboard/myprogress" ||
              location.pathname === "/dashboard/myprogress/month" ||
              location.pathname === "/dashboard/myprogress/week"
            }
          />
        </div>
        <span
          className={`text-base text-gray-500 ${
            location.pathname === "/dashboard/myprogress" ||
            location.pathname === "/dashboard/myprogress/month" ||
            location.pathname === "/dashboard/myprogress/week"
              ? `!text-blue-400`
              : ` `
          } `}
        >
          Progress{" "}
        </span>
      </button>
      <button
        className={`flex flex-col justify-center w-full items-center group transition-all ${
          location.pathname == "/dashboard/workouts" ||
          location.pathname.startsWith("/dashboard/workouts/")
            ? `bg-gray-200`
            : ` `
        } `}
        onClick={() => {
          navigate("/dashboard/workouts");
          console.log(
            "here is the boolean",
            location.pathname.startsWith("/dashboard/workouts")
          );
        }}
      >
        <WorkoutSvg
          active={
            location.pathname == "/dashboard/workouts" ||
            location.pathname.startsWith("/dashboard/workouts/")
          }
        />
        <span
          className={`text-base text-gray-500 ${
            location.pathname == "/dashboard/workouts" ||
            location.pathname.startsWith("/dashboard/workouts/")
              ? `!text-blue-400`
              : ` `
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
      {/* <button
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
      </button> */}
      <button
        onClick={() => {
          navigate("/dashboard/chanllenges");
          console.log(
            "today plan route ==",
            location.pathname == "/dashboard/challenges"
          );
        }}
        className={`flex flex-col justify-center w-full items-center group transition-all relative ${
          location.pathname == "/dashboard/challenges" ? `!bg-gray-200` : ` `
        } `}
      >
        {location.pathname == "/dashboard/challenges" ? (
          <GoalIcon color="#42A5F5" />
        ) : (
          <GoalIcon color="#9e9e9e" />
        )}

        <span
          className={`text-base text-gray-500  ${
            location.pathname == "/dashboard/challenges"
              ? `!text-blue-400 `
              : ` `
          } `}
        >
          {" "}
          chanllenges{" "}
        </span>
      </button>
      {isOpen ? (
        <div className="">
          <DrawerForTodaysPlan />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const DrawerForTodaysPlan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const closeDrawer = () => {
    setIsVisible(false);
    setTimeout(() => navigate("/dashboard/myprogress"), 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg transform transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        aria-labelledby="drawer-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4">
          <button
            onClick={closeDrawer}
            className="absolute top-3 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Close drawer"
          >
            <ChevronUp size={24} />
          </button>
          <h2
            id="drawer-title"
            className="text-2xl font-bold text-center mt-6 mb-4 text-gray-800"
          >
            Today's Plan
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/dashboard/myprogress/week")}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-left rounded-lg transition duration-200 ease-in-out flex items-center"
            >
              <BarChart2 className="mr-3 text-blue-500" size={20} />
              <span className="text-lg text-gray-700">Weekly Progress</span>
            </button>
            <button
              onClick={() => navigate("/dashboard/myprogress/month")}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-left rounded-lg transition duration-200 ease-in-out flex items-center"
            >
              <TrendingUp className="mr-3 text-blue-500" size={20} />
              <span className="text-lg text-gray-700">Monthly Progress</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
