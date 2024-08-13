import { Progress } from "@components/Progress/progress";
import { Sidebar } from "@components/SideBar/sidebar";

export const MyProgressRoute = () => {
  return (
    <div className="lg:grid grid-cols-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-4 pt-4 bg-[#f5f5f5] -ml-2">
        <Progress />
      </div>
    </div>
  );
};
