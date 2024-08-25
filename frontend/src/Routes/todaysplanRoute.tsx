import { TodaysPlan } from "@components/Todaysplan/Todaysplan";
import { Sidebar } from "@components/SideBar/sidebar";
import { TodaysPlans2 } from "@components/Todaysplan/Today'sPlan2";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
export const TodaysPlanRoute = () => {
  return (
    <div className="">
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1 w-full">
          <Sidebar2 />
        </div>
        <div className="col-span-4 -ml-2 bg-[#f0f0f0] h-dvh  ">
          <TodaysPlans2 />
        </div>
      </div>
    </div>
  );
};
