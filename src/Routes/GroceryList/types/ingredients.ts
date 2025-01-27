export interface WeeklyIngredients {
	fruits?: string[];
	beverages?: string[];
	grains?: string[];
	vegetables?: string[];
	proteins?: string[];
	quantities: Record<string, string>;
	[key: string]: string[] | Record<string, string> | undefined;
}

export interface CategoryIngredients {
	week_1: WeeklyIngredients;
	week_2: WeeklyIngredients;
	week_3: WeeklyIngredients;
	week_4: WeeklyIngredients;
}

export interface WeekwiseIngredients {
	categories: {
		overweight: CategoryIngredients;
		underweight: CategoryIngredients;
		normal_weight: CategoryIngredients;
		obesity_class_1: CategoryIngredients;
	};
}
