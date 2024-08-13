import { Sidebar } from "@components/SideBar/sidebar";
import { Allworkouts } from "@components/Workout/allworkouts";

export const WorkoutRoute = () => {
  return (
    <div className="lg:grid grid-cols-5 ">
      <div className="col-span-1">
        <Sidebar />
      </div>

      <div className="col-span-4">
        <Allworkouts />
      </div>
    </div>
  );
};
