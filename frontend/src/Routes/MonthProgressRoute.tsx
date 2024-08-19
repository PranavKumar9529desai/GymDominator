import { MonthProgressComponent } from "@components/MonthComponent/MonthProgress";
import { Sidebar } from "@components/SideBar/sidebar";
export const MonthProgressRoute = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4 -ml-2 bg-[#f0f0f0] h-screen">
          <MonthProgressComponent />
        </div>
      </div>
    </div>
  );
};
