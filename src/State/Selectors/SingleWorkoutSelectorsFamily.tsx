import axios, { AxiosResponse } from "axios";
import { RecoilValueReadOnly, selectorFamily } from "recoil";

interface ResponseType {
  msg: string;
  Excercises: Excercisetype;
}

export interface MuscleGroupType {
  id: number;
  name: string;
  img: string;
  fullimage: string;
}


export interface Excercisetype {
  name: string;
  img: string;
  instructions: string;
  videolink: string;
  MuscleGroup : MuscleGroupType
}

export const SingleWorkoutSelectorsFamily: (
  workoutname: string
) => RecoilValueReadOnly<Excercisetype> = selectorFamily({
  key: "singleworkoutselectorfamily",
  get:
    (workoutname: string) =>
    async ({}) => {
      const response: AxiosResponse<ResponseType> = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/workouts/singleworkout/${workoutname}`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("jwt"),
          },
        }
      );
      console.log("data fetched from the backend", response.data.Excercises);
      return response.data.Excercises;
    },
});
