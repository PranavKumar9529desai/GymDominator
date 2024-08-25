import { Diet } from "@components/Diet/diet";
import { Sidebar } from "@components/SideBar/sidebar";
import { Sidebar2 } from "@components/SideBar/Sidebar2";

export const DietRoute = () => {
  return (
    <div className="h-screen bg-[#f0f0f0j]">
      <div className="lg:grid grid-cols-5 ">
        <div className="col-span-1">
          <Sidebar2/>
        </div>
        <div className="col-span-4 lg:-ml-2">
          <Diet />
        </div>
      </div>
    </div>
  );
};
