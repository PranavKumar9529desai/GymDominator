import { Recipes } from "@components/Recicpes/recipes";
import { Sidebar } from "@components/SideBar/sidebar";
import { Sidebar2 } from "@components/SideBar/Sidebar2";

export const RecicpesRoute = () => {
  return (
    <div>
      
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar2 />
        </div>
        <div className="col-span-4">
          <Recipes />
        </div>
      </div>
    </div>
  );
};
