export const Diet = () => {
  return (
    <div className="bg-[#f5f5f5] ">
      <div className="text-center *:my-2 mt-2">
        <span className="text-3xl font-montserrat font-bold text-blue-500">
          DIET GUIDE
        </span>
        <div>
          <span className="text-gray-500 text-lg px-10 leading-relaxed">
            Confused about what diet you should follow? Read these guides and
            choose a diet style that best suits your goals, food preferences and
            lifestyle.
          </span>
        </div>
      </div>
      <div className="flex  flex-wrap w-full gap-10 justify-center mt-4">
        <DietCard />
        <DietCard />
        <DietCard />
        <DietCard />
        <DietCard />
      </div>
    </div>
  );
};

const DietCard = () => {
  return (
    <div className="w-[300px]  bg-white rounded-xl p-2 hover:-translate-y-3  hover:shadow-xl transition-transform duration-500  hover:outline-indigo-400 group">
      <div className="w-fit">
        <img
          className="w-fit"
          src="https://cdn.muscleandstrength.com/sites/default/files/clean-eating-guide-feature.jpg"
          alt=""
        />
      </div>
      <div className="px-4 group-hover:text-blue-500">
        <div className="my-2 ">
          <span className="text-xl font-roboto ">
            The Clean Eating Diet Plan Guide
          </span>
        </div>
        <div>
          <span className="text-gray-500 font-roboto group-hover:text-blue-500">
            Learn everything you need to know before starting the Clean Eating
            Diet plan including it's history, guidelines & components, & all of
            the science behind it.
          </span>
        </div>
      </div>
    </div>
  );
};
