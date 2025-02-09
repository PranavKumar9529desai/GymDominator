import { Navbar2 } from '@components/Navbar/Navbar2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
export const Onbording = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full">
      <div className="">
        <Navbar2 TextColor="black" />
      </div>
      <div
        className={`
                 pb-[100px] -mt-2 duration-500 ease-in-out>
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
      >
        <div className="pt-40 flex  flex-col  text-center ">
          <div className="lg:text-7xl text-6xl font-bold font-roboto  lg:leading-none leading-[1.1]">
            Free Gym
            <div>Access for</div>
          </div>
          <div className="bg-gradient-to-tr from-[hsl(240,84%,90%)]  to-[#0f07ed] text-transparent bg-clip-text ">
            <span className="font-roboto text-7xl font-semibold border-b-2 border-blue-400">
              6 months
            </span>
          </div>

          <div className="flex h-10 items-center justify-center lg:mt-10 mt-12 px-2 font-overpass">
            <p className="font- text-lg leading-snug  ">
              Complete the 24 Weeks Challenge 🎯and get free gym
              <br className="lg:block hidden" />
              access. Sign up now to get started.
            </p>
          </div>
          <div className="lg:mt-10 mt-12">
            <CalltoActionButton />
          </div>
        </div>
        <div>{/* <CenterComponent /> */}</div>
      </div>
    </div>
  );
};

const CalltoActionButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="bg-blue-500 text-white font-roboto rounded-md text-center lg:w-[400px]  py-3 text-xl w-9/12 "
      onClick={() => {
        navigate('/onboarding/healthprofile');
      }}
    >
      Start Challenge
    </button>
  );
};
