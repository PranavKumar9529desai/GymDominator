import type { MuscleGroupType } from "../Selectors/SingleWorkoutSelectorsFamily";
import { type  RecoilState, atom } from "recoil";

export const MuscleGrp: RecoilState<MuscleGroupType> = atom({
  key: "MuscleGrp",
  default: {
    id: 1,
    name: "as",
    img: "",
    fullimage: "",
  },
});
