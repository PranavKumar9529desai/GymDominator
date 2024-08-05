import axios, { AxiosResponse } from "axios";
import { RecoilValueReadOnly, selectorFamily } from "recoil";
import { Excercisetype } from "./ExcerciseSelectorsfamily";

interface ResponseType {
  msg: string;
  Excercise: Excercisetype;
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
       console.log("data fetched from the backend",response.data.Excercise);
        return response.data.Excercise;
    }
});
