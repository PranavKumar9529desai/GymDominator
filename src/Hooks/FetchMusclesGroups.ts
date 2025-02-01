import { type MuscleGroup, MuscleSelector } from "@state/Selectors/MuscleGrpSelectot";
import { useEffect, useState } from "react";
import { type Loadable, useRecoilValueLoadable } from "recoil";

export const FetchMusclesGroups = () => {
  const allMusclesGroups: Loadable<MuscleGroup[]> =
    useRecoilValueLoadable(MuscleSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [muscles, setMuscles] = useState<MuscleGroup[]>([]);

  useEffect(() => {
    switch (allMusclesGroups.state) {
      case "hasValue":
        setIsLoading(false);
        setMuscles(allMusclesGroups.contents);
        break;
      case "loading":
        setIsLoading(true);
        break;
      case "hasError":
        setIsLoading(false);
        throw allMusclesGroups.contents;
    }
  }, [allMusclesGroups]);

  return { isLoading, muscles };
};
