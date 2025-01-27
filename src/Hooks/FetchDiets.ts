import { Loadable, useRecoilValueLoadable } from "recoil";
import { useEffect, useState } from "react";
import { Diet, DietSelectors } from "@state/Selectors/DietSelectors";

export const FetchdietsGroups = () => {
	const allDiets: Loadable<Diet[]> = useRecoilValueLoadable(DietSelectors);
	const [isLoading, SetisLoading] = useState<boolean>(false);
	const [diets, Setdiets] = useState<Diet[]>([]);

	useEffect(() => {
		switch (allDiets.state) {
			case "hasValue":
				SetisLoading(false);
				Setdiets(allDiets.contents);
				break;
			case "loading":
				SetisLoading(true);
				break;
			case "hasError":
				SetisLoading(true);
				throw allDiets.contents;
		}
	}, [allDiets]);
	console.log("alldiets from the hooks ", allDiets);
	return { isLoading, diets };
};
