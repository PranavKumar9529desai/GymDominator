import PersonalizedDiets from "@components/Diet/PersonalizedDiets";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
export default function PersonalizedDietRoute() {
  return (
    <div className="h-screen bg-[#f0f0f0]">
      <div className="lg:grid grid-cols-5 h-screen">
        <div className="col-span-1 hidden lg:block">
          <Sidebar2 />
        </div>
        <div className="lg:hidden block">
          <BottomNavigation />
        </div>

        <div className="col-span-4 overflow-y-auto ">
          <PersonalizedDiets />
        </div>
      </div>
    </div>
  );
}