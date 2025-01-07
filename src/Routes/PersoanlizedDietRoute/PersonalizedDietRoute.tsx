import PersonalizedDiets from "@routes/PersoanlizedDietRoute/PersonalizedDiets";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
export default function PersonalizedDietRoute() {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full">
        {/* Sidebar - fixed width */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar2 />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation />
        </div>

        {/* Main Content - takes remaining width */}
        <div className="flex-1 overflow-y-auto">
          <PersonalizedDiets />
        </div>
      </div>
    </div>
  );
}
