import { Progress } from "@components/Progress/progress";
import { Sidebar } from "@components/SideBar/sidebar";

export const MyProgressRoute = () => {
  return (
    <>
      <div className="">
        <div className="w-fit lg:flex hidden ">
          <Sidebar />
        </div>
        <div>
    
        </div>
        <div className="lg:mt-8 lg:ml-80 ">
            <div className="w-full"></div>
          <Progress />
        </div>
      </div>
    </>
  );
};
