import { HealthProfileForm } from "@components/HealthProfile/healthprofileform";
import { Navbar2 } from "@components/Navbar/Navbar2";

export const HealthProfileFormRoute = () => {
  return (
    <div className="bg-[#f0f0f0] h-dvh">
      <div className="">
        <Navbar2 TextColor="black" />
      </div>
      <div className="relative lg:top-20 top-20 px-4 pb-4 lg:px-0 lg:pb-0 ">
        <HealthProfileForm />
      </div>
    </div>
  );
};
