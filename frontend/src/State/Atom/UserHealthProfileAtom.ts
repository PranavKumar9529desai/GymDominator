import { DietType } from "@components/HealthProfile/healthprofileform";
import { atom } from "recoil";

export interface UserHealthprofileType {
  fullname: string;
  contact: number;
  height: number;
  weight: number;
  diet: DietType;
  otp: string;
}

export const UserHealthprofileAtom = atom<UserHealthprofileType>({
  key: "UserHealthProfile",
  default: {
    fullname: "",
    contact: 0,
    height: 0,
    weight: 0,
    otp: "",
    diet: "non-vegetarian"
  }
});
