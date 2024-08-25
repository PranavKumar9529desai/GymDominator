import { MonthProgressComponent } from "@components/MonthComponent/MonthProgress";
import { Sidebar } from "@components/SideBar/sidebar";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
export const MonthProgressRoute = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1 lg:block hidden">
          <Sidebar2 />
        </div>
        <div className="col-span-4 -ml-2  h-screen ">
          <MonthProgressComponent />
        </div>
      </div>
    </div>
  );
};
