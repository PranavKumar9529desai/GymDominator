import { HealthProfileForm } from "@components/HealthProfile/healthprofileform";
import { Navbar2 } from "@components/Navbar/Navbar2";

export const HealthProfileFormRoute = () => {
  return (
    <div className="bg-[#f0f0f0] h-screen">
      <div className="">
        <Navbar2 TextColor="black" />
      </div>
      <div className="relative top-24 ">
        <HealthProfileForm />
      </div>
    </div>
  );
};
