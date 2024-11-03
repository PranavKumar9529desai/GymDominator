import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { TodaysPlans } from "@components/Todaysplan/Today'sPlan";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
export const TodaysPlanRoute = () => {
  return (
    <div className="h-full bg-[#f0f0f0] ">
      <div className="lg:grid lg:grid-cols-5 ">
        <div className="col-span-1 w-full hidden lg:block">
          <Sidebar2 />
        </div>
        <div className="lg:hidden block">
          <BottomNavigation />
        </div>
        <div className="col-span-4 -ml-2 h-full relative ">
          <TodaysPlans />
        </div>
      </div>
    </div>
  );
};
