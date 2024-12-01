import { Recipes } from "@components/Recicpes/recipes";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
export const RecicpesRoute = () => {
  return (
    <div>
      
      <div className="lg:grid grid-cols-5 h-screen">
        <div className="col-span-1 hidden lg:block h-screen">
          <Sidebar2 />
        </div>
        <div className="lg:hidden block">
          <BottomNavigation />
        </div>
        <div className="col-span-4 overflow-y-auto -mt-4">
          <Recipes />
        </div>
      </div>
    </div>
  );
};
