export interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks?: string;
}

export interface WeeklyPlan {
  meal_1: MealPlan;
  meal_2: MealPlan;
  meal_3: MealPlan;
  meal_4: MealPlan;
}

export interface DietCategories {
  categories: {
    underweight: WeeklyPlan;
    normal_weight: WeeklyPlan;
    overweight: WeeklyPlan;
    obesity_class_1: WeeklyPlan;
  };
}

export const getBMICategory = (bmi: number): keyof DietCategories['categories'] => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal_weight';
  if (bmi < 30) return 'overweight';
  return 'obesity_class_1';
};
