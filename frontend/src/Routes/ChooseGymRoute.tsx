import { ChooseGym } from "@components/choosegym/choosegym";
import { Navbar2 } from "@components/Navbar/Navbar2";

export const ChooseGymRoute = () => {
  return (
    <div className="bg-[#f0f0f0] ">
      <div>
        <Navbar2 TextColor="black" />
      </div>
      <div className="relative top-20 ">
        <ChooseGym />
      </div>
    </div>
  );
};
