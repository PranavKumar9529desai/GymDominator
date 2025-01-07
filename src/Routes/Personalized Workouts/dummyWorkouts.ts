export interface ExerciseDetail {
  name: string;
  sets: number;
  reps: string;
  description: string;
}

export interface WorkoutSchedule {
  id: number;
  dayOfWeek: string;
  muscleTarget: string;
  duration: number;
  calories: number;
  exercises: ExerciseDetail[];
}

export interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  schedules: WorkoutSchedule[];
}

export const dummyWorkoutPlan: WorkoutPlan = {
  id: 1,
  name: 'Science-Based Strength Program',
  description: 'A scientifically structured routine focusing on progressive overload.',
  schedules: [
    // ...existing schedules moved here...
    {
      id: 101,
      dayOfWeek: 'Monday',
      // ...existing code...
    },
    {
      id: 102,
      dayOfWeek: 'Tuesday',
      // ...existing code...
    },
    // ...existing code...
  ],
};
