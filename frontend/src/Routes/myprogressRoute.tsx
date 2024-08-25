import { Progress } from "@components/Progress/progress";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/BottomNavigation";
export const MyProgressRoute = () => {
  return (
    <div className="lg:grid grid-cols-5 h-screen">
      <div className="col-span-1 hidden lg:block ">
        <Sidebar2/>
      </div>
      <div className="lg:hidden block">
          <BottomNavigation />
        </div>
      <div className="col-span-4 pt-4 bg-[#f5f5f5] -ml-2 lg:overflow-y-auto">
        <Progress />
      </div>
    </div>
  );
};
