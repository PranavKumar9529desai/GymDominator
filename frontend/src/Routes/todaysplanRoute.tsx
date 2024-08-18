import { TodaysPlan } from "@components/Todaysplan/Todaysplan";
import { Sidebar } from "@components/SideBar/sidebar";
export const TodaysPlanRoute = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4 -ml-2 ">
          <TodaysPlan />
        </div>
      </div>
    </div>
  );
};
