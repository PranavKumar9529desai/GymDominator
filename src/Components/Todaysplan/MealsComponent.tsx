import { SvgMeal } from "@components/Svg/mealsSvg";
export const MealsaComponentCard = () => {
	return (
		<div className="bg-black text-white  px-8 py-5 rounded-lg lg:w-[400px]">
			<div className="text-center ">
				<div className="inline-flex gap-2">
					<SvgMeal />
					<span className="text-2xl font-pop ">Meals</span>
				</div>
				<div className="">View All</div>
			</div>
			<div>
				<div className="space-y-4  mt-3">
					<div>
						<div className="text-lg font-pop">Breakfast</div>
						<div className="text-sm block text-gray-500">75% completed</div>
					</div>
					<div>
						<div className="text-lg font-pop">Lunch</div>
						<div className="text-sm block text-gray-500">75% completed</div>
					</div>
					<div>
						<div className="text-lg font-pop">Dinner</div>
						<div className="text-sm block text-gray-500">75% completed</div>
					</div>
				</div>
			</div>
			<div className="py-2  bg-white text-black text-center font-montserrat font-semibold mt-8 text-base rounded-lg ">
				Start Workout
			</div>
		</div>
	);
};
