import { Loadable, useRecoilValueLoadable } from "recoil"
import { MuscleGrp, MuscleSelector } from "@components/State/Selectors/MuscleGrpSelectot"
import { useEffect, useState } from "react";
export const FetchMusclesGroups = () => {
    const allMusclesGroups: Loadable<MuscleGrp[]> = useRecoilValueLoadable(MuscleSelector);
    const [isLoading, SetisLoading] = useState<boolean>(false);
    const [muscles, Setmuscles] = useState<MuscleGrp[]>([]);

    useEffect(() => {

        switch (allMusclesGroups.state) {
            case "hasValue":
                SetisLoading(false);
                Setmuscles(allMusclesGroups.contents);
                break;
            case "loading":
                SetisLoading(true)
                break;
            case "hasError":
                SetisLoading(true);
                throw allMusclesGroups.contents;

        }
    }, [allMusclesGroups]);
    console.log("Muscles are from fetchMuscles", muscles);
    return { isLoading, muscles }
}