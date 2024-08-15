import { FetchdietsGroups } from "@hooks/FetchDiets";

export const Diet = () => {
  const { isLoading, diets } = FetchdietsGroups();
  return (
    <div className="bg-[#f5f5f5] pb-[100px] ">
      <div className="text-center *:my-2 mt-2">
        <span className="text-3xl font-montserrat font-bold text-blue-500">
          DIET GUIDE
        </span>
        <div>
          <span className="text-gray-500 lg:text-lg lg:px-10 lg:leading-relaxed px-2">
            Confused about what diet you should follow? Read these guides and
            choose a diet style that best suits your goals, food preferences and
            lifestyle.
          </span>
        </div>
      </div>
      <div className="flex  flex-wrap w-full gap-10 justify-center mt-4">
        {diets.map((diet) => {
          return (
            <div>
              <DietCard name={diet.name} img={diet.img} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DietCard = ({ name, img }: { name: string; img: string }) => {
  return (
    <div className="w-[300px] lg:h-[px] bg-white rounded-xl px-4 py-5  hover:-translate-y-4  hover:shadow-2xl transition-all duration-500  hover:outline-indigo-400 group">
      <div className="w-fit">
        <img className="w-fit rounded-t-xl" src={img} alt="" />
      </div>
      <div className=" group-hover:text-blue-500">
        <div className="my-2 line-clamp-1">
          <span className="text-xl font-roboto ">{name}</span>
        </div>
        <div className="">
          <span className="text-gray-500 font-roboto group-hover:text-blue-500 line-clamp-3 lg:line-clamp-4 leading-loose">
            Learn everything you need to know before starting the {name} plan
            including it's history, guidelines & components, & all of the
            science behind it.
          </span>
        </div>
      </div>
    </div>
  );
};
