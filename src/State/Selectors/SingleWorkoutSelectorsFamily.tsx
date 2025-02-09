import axios, { type AxiosResponse } from 'axios';
import { selectorFamily } from 'recoil';

export interface MuscleGroupType {
  id: number;
  name: string;
  img: string;
  fullimage: string;
  image_url?: string;
}

export interface Exercise {
  id: number;
  name: string;
  muscleGroupId: number;
  image_url?: string;
  video_url?: string;
  instructions: string;
  muscle_group: string;
  muscle_image?: string;
}

export interface ExerciseWithMuscle extends Exercise {
  MuscleGroup: MuscleGroupType & {
    exercises: Exercise[];
  };
}

interface SingleExerciseResponse {
  msg: string;
  exercises: ExerciseWithMuscle[];
}

// We'll use a string key in the format:
// For single muscle: "muscle"
// For specific exercise: "muscle|workoutname"
export const SingleWorkoutSelectorsFamily = selectorFamily<ExerciseWithMuscle[] | null, string>({
  key: 'singleworkoutselectorfamily',
  get: (param: string) => async () => {
    try {
      const parts = param.split('|');
      const muscle = parts[0];
      const workoutname = parts[1];

      if (!muscle) {
        console.error('Muscle parameter is required');
        return null;
      }

      // Capitalize first letter to match database format
      const formattedMuscle = muscle.charAt(0).toUpperCase() + muscle.slice(1).toLowerCase();

      const response: AxiosResponse<SingleExerciseResponse> = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/workouts/${encodeURIComponent(formattedMuscle)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );

      if (response.data.msg === 'success' && response.data.exercises.length > 0) {
        // If workoutname is provided, find that specific exercise
        if (workoutname) {
          const exercise = response.data.exercises.find(
            (e: ExerciseWithMuscle) => e.name.toLowerCase() === workoutname.toLowerCase()
          );
          return exercise ? [exercise] : null;
        }
        // Otherwise return all exercises for the muscle group
        return response.data.exercises;
      }
      return null;
    } catch (error) {
      console.error('Error fetching exercise:', error);
      return null;
    }
  },
});
