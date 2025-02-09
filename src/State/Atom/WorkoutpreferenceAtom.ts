import { atom } from 'recoil';

export type WorkoutplaceType = string;

export type WorkoutpreferenceType = {
  workoutplace: string;
  gymname: null | string;
  // other properties specific to home workout preference
};

export const WorkoutPrefernenceAtom = atom<WorkoutpreferenceType>({
  key: 'Workoutpreference',
  default: {
    workoutplace: 'IN home',
    gymname: null,
  },
});
