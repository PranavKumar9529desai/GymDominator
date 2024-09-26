import { BottomNavigation } from "@components/Dashboard/BottomNavigation";
import { MonthProgressComponent } from "@components/MonthComponent/MonthProgress";
import MonthProgressComponent2 from "@components/MonthComponent/Monthprogress2";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
export const MonthProgressRoute = () => {
  return (
    <div className="h-screen ">
      <div className="lg:grid lg:grid-cols-5">
        <div className="lg:col-span-1 lg:block hidden">
          <Sidebar2 />
        </div>
        <div className="block lg:hidden">
          <BottomNavigation />
        </div>
        <div className="col-span-4 -ml-2  h-screen lg:-mt-0 -mt-8">
        <MonthProgressComponent />
        </div>
      </div>
    </div>
  );
};
