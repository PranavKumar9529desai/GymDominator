import { Navbar2 } from "@components/Navbar/Navbar2";
import { Workoutplace } from "@components/Workoutplace/Workoutplace";

export const WorkoutplaceRoute = () => {
  return (
    <div>
      <div>
        <Navbar2 TextColor="black" />
      </div>
      <div className="relative top-20">
        <Workoutplace />
      </div>
    </div>
  );
};
