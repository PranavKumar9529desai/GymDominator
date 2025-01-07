import axios from 'axios';

export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  description: string;
  order: number;
}

export interface WorkoutSchedule {
  id: number;
  dayOfWeek: string;
  muscleTarget: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: number;
  name: string;
  description: string | null;
  schedules: WorkoutSchedule[];
}

interface WorkoutResponse {
  success: boolean;
  data?: WorkoutPlan;
  message?: string;
}

export const GetPersonalizedWorkout = async (): Promise<WorkoutResponse> => {
  try {
    const response = await axios.get<WorkoutResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/getpersonalizedworkout`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching personalized workout:', error);
    throw error;
  }
};
