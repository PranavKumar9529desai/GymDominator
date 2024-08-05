import { Excercisetype, } from "@state/Selectors/ExcerciseSelectorsfamily"
import { SingleWorkoutSelectorsFamily } from "@state/Selectors/SingleWorkoutSelectorsFamily"
import { useEffect, useState } from "react"
import { Loadable, useRecoilValueLoadable } from "recoil"

export const FetchSingleWorkout = ({ workoutname }: { workoutname: string }) => {
    const Excercise: Loadable<Excercisetype> =  useRecoilValueLoadable(SingleWorkoutSelectorsFamily(workoutname))
    console.log("fetch ts",Excercise)
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [excercise, setexcercise] = useState<Excercisetype>();

    useEffect(() => {
        console.log("excercsie from the fetch.ts",excercise);
        switch (Excercise.state) {
            case "hasValue":
                setisLoading(false);
                setexcercise(Excercise.contents);
                break;
            case "loading":
                setisLoading(true);
                break;
            case "hasError":
                setisLoading(false);
                console.log("fetch error", Excercise.contents);
        }
    }, [Excercise]);
     return { isLoading, excercise };
}