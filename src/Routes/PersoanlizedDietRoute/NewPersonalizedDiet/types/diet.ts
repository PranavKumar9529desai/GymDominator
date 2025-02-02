export interface MealPlan {
	breakfast: string;
	lunch: string;
	snacks: string;
	dinner: string;
}

export interface WeeklyPlan {
	week_1: MealPlan;
	week_2: MealPlan;
	week_3: MealPlan;
	week_4: MealPlan;
}

export interface DietCategories {
	categories: {
		underweight: WeeklyPlan;
		normal_weight: WeeklyPlan;
		overweight: WeeklyPlan;
		obesity_class_1: WeeklyPlan;
	};
}

export type BMICategory =
	| "underweight"
	| "normal_weight"
	| "overweight"
	| "obesity_class_1";

export const getBMICategory = (
	bmi: number,
): keyof DietCategories["categories"] => {
	if (bmi < 18.5) return "underweight";
	if (bmi >= 18.5 && bmi < 25) return "normal_weight";
	if (bmi >= 25 && bmi < 30) return "overweight";
	if (bmi >= 30) return "obesity_class_1";
	return "normal_weight"; // default case
};
