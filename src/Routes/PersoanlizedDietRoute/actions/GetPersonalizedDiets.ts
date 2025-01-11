import axios from "axios";

interface MealIngredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface Meal {
  id: number;
  name: string;
  timeOfDay: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  instructions?: string;
  ingredients: MealIngredient[];
}

interface DietPlan {
  id: number;
  name: string;
  description: string;
  targetCalories: number;
  proteinRatio: number;  // Stored as percentage (40 for 40%)
  carbsRatio: number;    // Stored as percentage (45 for 45%)
  fatsRatio: number;     // Stored as percentage (15 for 15%)
  meals: Meal[];
  progress?: {
    currentWeight: number | null;
    targetWeight: number | null;
    compliance: number;
    startDate: string;
    lastTrackedDate: string | null;
  };
}

interface PersonalizedDietResponse {
  success: boolean;
  data: DietPlan;
  error?: string;
  details?: string;
}

export const GetPersonalizedDiets = async (): Promise<PersonalizedDietResponse> => {
  try {
    const response = await axios.get<PersonalizedDietResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/getpersonalizeddiet`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching personalized diet data:', error);
    throw error;
  }
};
