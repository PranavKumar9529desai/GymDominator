// export const Recipes = () => {
//   return (
//     <div>
//       <div>
//         <span className="text-3xl font-montserrat text-blue-400 font-semibold">
//           Protein Shake Recipes
//         </span>
//       </div>
//       <div>
//         <span className="text-gray-400">
//           Hitting your protein goals has never been easier! Explore our huge
//           variety of quick and easy high-protein shake and smoothie recipes.
//         </span>
//       </div>
//     </div>
//   );
// };

export const Recipes = () => {
  return (
    <div className="bg-[#f5f5f5] h-dvh -ml-2">
      <div className="text-center *:my-3 mt-2 ">
        <span className="text-3xl font-montserrat font-bold text-blue-500 ">
          {"Recipe Categories"}
        </span>
        <div className="">
          <span className="text-gray-500 text-lg px-10 leading-relaxed ">
            Eating for your fitness goal doesn't mean bland, tasteless food.
            Find delicious and easy to prepare recipes by meal type or diet
            preferences.
          </span>
        </div>
      </div>
      <div className="flex  flex-wrap w-full gap-10 justify-center mt-10">
        <RecipesCard />
        <RecipesCard />
        <RecipesCard />
        <RecipesCard />
        <RecipesCard />
      </div>
    </div>
  );
};

const RecipesCard = () => {
  return (
    <div className="w-[300px]  rounded-xl bg-white hover:-translate-y-3 hover:shadow-xl transition-transform duration-300 group">
      <div className="w-fit">
        <img
          className="w-fit"
          src="https://cdn.muscleandstrength.com/sites/default/files/styles/400x250/public/taxonomy/image/recipes/highprotein_0.jpg?itok=pOPTD9Gr"
          alt=""
        />
      </div>
      <div className="px-4">
        <div className="my-2 text-center">
          <span className="text-xl font-roboto w-full group-hover:text-blue-600">High Protein</span>
        </div>
        <div></div>
      </div>
    </div>
  );
};
