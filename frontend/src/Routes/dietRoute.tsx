import { Diet } from "@components/Diet/diet";
import { Sidebar } from "@components/SideBar/sidebar";

export const DietRoute = () => {
  return (
    <div className="h-screen bg-[#f0f0f0j]">
      <div className="lg:grid grid-cols-5 ">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4 lg:-ml-2">
          <Diet />
        </div>
      </div>
    </div>
  );
};
