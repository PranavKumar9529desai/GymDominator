import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { Allworkouts } from "@components/Workout/allworkouts";

export const WorkoutRoute = () => {
  return (
    <div className="lg:grid lg:grid-cols-5 h-screen bg-[#f0f0f0] ">
      <div className="lg:col-span-1 lg:block hidden  ">
        <Sidebar2 />
      </div>
      <div className="lg:hidden block ">
         <BottomNavigation />
      </div>

      <div className="col-span-4 overflow-y-scroll h-full bg-[#f0f0f0f0] ">
        <Allworkouts />
      </div>
    </div>
  );
};
