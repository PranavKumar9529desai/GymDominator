import { Progress } from "@components/Progress/progress";
import { Sidebar } from "@components/SideBar/sidebar";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { Sidebar3 } from "@components/SideBar/sidebar3";

export const MyProgressRoute = () => {
  return (
    <div className="lg:grid grid-cols-5">
      <div className="col-span-1">
        <Sidebar2/>
      </div>
      <div className="col-span-4 pt-4 bg-[#f5f5f5] -ml-2">
        <Progress />
      </div>
    </div>
  );
};
