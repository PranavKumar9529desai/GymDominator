import { type Diet, DietSelectors } from "@state/Selectors/DietSelectors";
import { useEffect, useState } from "react";
import { type Loadable, useRecoilValueLoadable } from "recoil";

export const FetchdietsGroups = () => {
  const [isLoading, SetisLoading] = useState<boolean>(true);
  const [diets, setdiets] = useState<Diet[]>([]);
  const allDiets: Loadable<Diet[]> = useRecoilValueLoadable(DietSelectors);

  useEffect(() => {
    switch (allDiets.state) {
      case "hasValue":
        SetisLoading(false);
        setdiets(allDiets.contents);
        break;
      case "loading":
        SetisLoading(true);
        break;
      case "hasError":
        SetisLoading(false);
        break;
    }
  }, [allDiets]);

  return { isLoading, diets };
};
