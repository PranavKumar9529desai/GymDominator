import { TodaysPlan } from "@components/Todaysplan/Todaysplan";
import { Sidebar } from "@components/SideBar/sidebar";
import { TodaysPlans2 } from "@components/Todaysplan/Today'sPlan2";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/BottomNavigation";
export const TodaysPlanRoute = () => {
  return (
    <div className="h-screen bg-[#f0f0f0] ">
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1 w-full hidden lg:block">
          <Sidebar2 />
        </div>
        <div className="lg:hidden block">
          <BottomNavigation />
        </div>
        <div className="col-span-4 -ml-2 h-dvh  ">
          <TodaysPlans2 />
        </div>
      </div>
    </div>
  );
};
