import { atom } from "recoil";

export type WorkoutplaceType = "IN home" | "IN the Gym";

export type HomeWorkoutpreferenceType = {
    WorkoutPlaceType: "IN home";
    // other properties specific to home workout preference
};

export type GymWorkoutpreferenceType = {
    WorkoutPlaceType: "IN the Gym";
    gymname: string;
    // other properties specific to gym workout preference
};

export type WorkoutpreferenceType = HomeWorkoutpreferenceType | GymWorkoutpreferenceType;


export const WorkoutPrefernenceAtom = atom<WorkoutpreferenceType>({
    key: "Workoutpreference",
    default: {
        WorkoutPlaceType: "IN home",
    } as HomeWorkoutpreferenceType,
});