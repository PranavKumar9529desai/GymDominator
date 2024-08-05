import { Sidebar } from "@components/SideBar/sidebar";
// import { CustomSkelton } from "@components/Skeltons/customskelton";
import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { useNavigate } from "react-router-dom";
export const Allworkouts = () => {
  const { isLoading, muscles } = FetchMusclesGroups();
  console.log("Muscles and isloadin", isLoading, muscles);
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex w-full h-10 justify-center mt-5 lg:mb-5 lg:mb-2">
            <span className="font-extrabold font-roboto lg:text-4xl text-2xl flex text-center">
              Choose Muscle to train
            </span>
          </div>
          <div className="flex w-full">
            {isLoading ? (
              <div className="flex justify-center w-full h-full mt-3">
                Loading.....
                {/* <CustomSkelton size="large" /> */}
              </div>
            ) : (
              <div className="flex flex-wrap lg:gap-10 gap-5 w-full justify-center mb-20 ">
                {muscles.map((muscle) => {
                  return <MuscleGroup name={muscle.name} img={muscle.img} />;
                })}
              </div>
              // <div className="flex justify-center w-full ">Loading...</div>
            )}
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
    hover:-translate-y-3 transition-transform  duration-200 shadow-lg hover:shadow-xl group   hover:outline  hover:outline-blue-400 hover:outline-offset-2 "
     onClick={()=>{ 
      navigate(`${name.toLowerCase()}`)
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
