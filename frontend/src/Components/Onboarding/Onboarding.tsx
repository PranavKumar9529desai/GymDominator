import { Navbar2 } from "@components/Navbar/Navbar2";
import { useNavigate } from "react-router-dom";

export const Onbording = () => {
  return (
    <div className="w-full">
      <div className="">
        <Navbar2 TextColor="black" />
      </div>

      <div className="pt-40 flex  flex-col  text-center ">
        <div className="text-7xl font-bold font-roboto  ">
          Free Gym
          <div>Access for</div>
        </div>
        <div className="bg-gradient-to-tr from-[hsl(240,84%,90%)]  to-[#0f07ed] text-transparent bg-clip-text ">
          <span className="font-roboto text-7xl font-semibold border-b-2 border-blue-400">
            6 months
          </span>
        </div>

        <div className="flex h-10 items-center justify-center mt-10">
          <p className="font- text-lg leading-snug  ">
            Complete the 24 Weeks Challenge and get free gym
            <br />
            access for the duration. Sign up now to get started.
          </p>
        </div>
        <div className="mt-10">
          <CalltoActionButton />
        </div>
      </div>
      <div>{/* <CenterComponent /> */}</div>
    </div>
  );
};

const CalltoActionButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-blue-500 text-white font-roboto rounded-md text-center w-[400px]  py-3 text-lg"
      onClick={() => {
        navigate("/onboarding/chooseacpartner/healthprofile");
      }}
    >
      Start Chanllenge
    </button>
  );
};
