import { Recipes } from "@components/Recicpes/recipes";
import { Sidebar } from "@components/SideBar/sidebar";

export const RecicpesRoute = () => {
  return (
    <div>
      
      <div className="lg:grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Recipes />
        </div>
      </div>
    </div>
  );
};
