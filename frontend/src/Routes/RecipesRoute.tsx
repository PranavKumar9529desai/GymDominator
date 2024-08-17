import { BottomNavigation } from "@components/Dashboard/BottomNavigation";
import { Recipes } from "@components/Recicpes/recipes";
import { Sidebar } from "@components/SideBar/sidebar";
import { TodaysPlan } from "@components/Todaysplan/Todaysplan";

export const RecicpesRoute = () => {
  return (
    <div>
      
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
          {/* <Recipes /> */}
          <TodaysPlan />
        </div>
      </div>
    </div>
  );
};
