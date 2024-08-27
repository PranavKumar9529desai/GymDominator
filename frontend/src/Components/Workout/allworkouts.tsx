import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { useNavigate } from "react-router-dom";
export const Allworkouts = () => {
  const { isLoading, muscles } = FetchMusclesGroups();
  return (
    <>
      <div className="">
        <div className=" h-dvh  bg-[#f5f5f5]  -mt-5">
          <div className="block w-full ">
            <div className="">
              <div className="flex w-full h-10 justify-center pt-8 lg:mb-5 ">
                <span className="font-extrabold  lg:text-5xl text-4xl flex text-center font-montserrat">
                  Choose Muscle to train
                </span>
              </div>
              <div className="flex w-full ">
                {isLoading ? (
                  <div className="flex justify-center w-full mt-3 relative top-40">
                    Loading.....
                    {/* <CustomSkelton size="large" /> */}
                  </div>
                ) : (
                  <div className="flex flex-wrap lg:gap-10 gap-5 w-full justify-center lg:mb-0 !mb-40 mt-8 lg:mt-10 max-h-screen ">
                    {muscles.map((muscle) => {
                      return (
                        <MuscleGroup name={muscle.name} img={muscle.img} />
                      );
                    })}
                  </div>
                  // TODO add the customloader to the loading deparment 
                  // <div className="flex justify-center w-full ">Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MuscleGroup = ({ name, img }: { name: string; img: string }) => {
  const navigate = useNavigate();
  return (
    <button
      className=" lg:w-[300px] w-10/12 bg-gray-300 mt-5 rounded-lg h-fit
    hover:-translate-y-3 transition-transform  duration-500 shadow-lg hover:shadow-2xl group   hover:outline  hover:outline-blue-400 hover:outline-offset-2 "
      onClick={() => {
        navigate(`${name.toLowerCase()}`);
      }}
    >
      <div className="flex justify-center pt-3 ">
        <img src={img} alt={name} className="w-9/12 rounded-2xl" />
      </div>
      <div className="flex justify-center items-center h-10 font-montserrat font-bold lg:text-3xl text-4xl ">
        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
      </div>
    </button>
  );
};
