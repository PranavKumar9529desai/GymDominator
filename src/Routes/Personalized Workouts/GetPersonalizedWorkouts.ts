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

export const GetPersonalizedWorkout = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/getpersonalizedworkout`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    );
    console.log('Workout data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    return { success: false, message: 'Failed to fetch workout plan' };
  }
};
