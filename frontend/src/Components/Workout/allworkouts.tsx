import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { useNavigate } from "react-router-dom";
export const Allworkouts = () => {
  const { isLoading, muscles } = FetchMusclesGroups();
  console.log("Muscles and isloadin", isLoading, muscles);
  return (
    <>
      <div className="">
        <div className=" h-dvh  bg-[#f5f5f5]  -ml-2 -mt-5">
          <div className="block w-full ">
            <div className="">
              <div className="flex w-full h-10 justify-center pt-8 lg:mb-5 ">
                <span className="font-extrabold  lg:text-5xl text-3xl flex text-center  font-montserrat">
                  Choose Muscle to train
                </span>
              </div>
              <div className="flex w-full ">
                {isLoading ? (
                  <div className="flex justify-center w-full h-full mt-3">
                    Loading.....
                    {/* <CustomSkelton size="large" /> */}
                  </div>
                ) : (
                  <div className="flex flex-wrap lg:gap-10 gap-5 w-full justify-center mb-2 mt-8 ">
                    {muscles.map((muscle) => {
                      return (
                        <MuscleGroup name={muscle.name} img={muscle.img} />
                      );
                    })}
                  </div>
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
    hover:-translate-y-3 transition-transform  duration-200 shadow-lg hover:shadow-2xl group   hover:outline  hover:outline-blue-400 hover:outline-offset-2 "
      onClick={() => {
        navigate(`${name.toLowerCase()}`);
      }}
    >
      <div className="flex justify-center pt-3 ">
        <img src={img} alt={name} className="w-9/12 rounded-2xl" />
      </div>
      <div className="flex justify-center items-center h-10 font-roboto font-bold lg:text-3xl text-2xl ">
        {name}
      </div>
    </button>
  );
};
