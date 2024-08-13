import { Diet } from "@components/Diet/diet";
import { Sidebar } from "@components/SideBar/sidebar";

export const DietRoute = () => {
  return (
    <div>
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Diet />
        </div>
      </div>
    </div>
  );
};
