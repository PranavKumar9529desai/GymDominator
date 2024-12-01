import { atom, RecoilState } from "recoil";
import { MuscleGroupType } from "@state/Selectors/SingleWorkoutSelectorsFamily";

export const MuscleGrp: RecoilState<MuscleGroupType> = atom({
    key: "MuscleGrp",
    default: {
        id: 1,
        name: "as",
        img: "",
        fullimage: ""
    }
})