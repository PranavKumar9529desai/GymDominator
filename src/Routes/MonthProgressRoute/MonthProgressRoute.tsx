import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
import MonthlyProgress from "@routes/MonthProgressRoute/NewMonthlyProgressComponent";
// import { MonthProgressComponent } from "@components/MonthComponent/MonthProgress";
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
        <div className="col-span-4 lg:h-screen flex items-center justify-center ">
          <MonthlyProgress />
        </div>
      </div>
    </div>
  );
};
