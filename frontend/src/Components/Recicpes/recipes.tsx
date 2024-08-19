import { FetchrecipesGroups } from "@hooks/FetchRecipes";

export const Recipes = () => {
  const { isLoading, recipes } = FetchrecipesGroups();
  return (
    <div className="bg-[#f5f5f5] h-dvh -ml-2">
      <div className="text-center *:my-3 mt-2 ">
        <span className="text-3xl font-roboto font-bold text-blue-500 ">
          {"Recipe Categories"}
        </span>
        <div className="px-3 lg:px-0">
          <span className="text-gray-500 text-lg lg:px-10 lg:leading-relaxed ">
            Eating for your fitness goal doesn't mean bland, tasteless food.
            Find delicious and easy to prepare recipes by meal type or diet
            preferences.
          </span>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="text-center relative top-40 text-xl font-roboto">Loading....</div>
        ) : (
          <div>
            <div className="flex  flex-wrap w-full gap-10 justify-center mt-10">
              {recipes.map((recipe) => {
                return (
                  <div>
                    <RecipesCard name={recipe.name} img={recipe.img} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RecipesCard = ({ name, img }: { name: string; img: string }) => {
  return (
    <div className="w-[300px]  rounded-xl bg-white hover:-translate-y-3 hover:shadow-xl transition-transform duration-300 group">
      <div className="w-fit">
        <img className="w-fit" src={img} alt={name} />
      </div>
      <div className="px-4">
        <div className="my-2 text-center">
          <span className="text-xl font-roboto w-full group-hover:text-blue-600">
            {name}
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
};
