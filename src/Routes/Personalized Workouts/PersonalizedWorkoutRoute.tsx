import PersonalizedWorkouts from "@routes/Personalized Workouts/PersonalizedWorkouts";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
export default function PersonalizedWorkoutRoute() {
  return (
    <div className="h-screen bg-[#f0f0f0]">
      <div className="lg:flex h-screen">
        <div className="hidden lg:block lg:w-1/5">
          <Sidebar2 />
        </div>
        <div className="lg:hidden block">
          <BottomNavigation />
        </div>

        <div className="lg:w-4/5 overflow-y-auto border-2 border-red-600">
          <PersonalizedWorkouts />
        </div>
      </div>
    </div>
  );
}
