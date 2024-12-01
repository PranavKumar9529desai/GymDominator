import { Loadable, useRecoilValueLoadable } from "recoil"
import { useEffect, useState } from "react";
import { RecipesSelectors } from "@state/Selectors/RecipesSelectors";
import { Recipes } from "@state/Selectors/RecipesSelectors";

export const FetchrecipesGroups = () => {
    const allrecipes: Loadable<Recipes[]> = useRecoilValueLoadable(RecipesSelectors);
    const [isLoading, SetisLoading] = useState<boolean>(false);
    const [recipes, Setrecipes] = useState<Recipes[]>([]);

    useEffect(() => {

        switch (allrecipes.state) {
            case "hasValue":
                SetisLoading(false);
                Setrecipes(allrecipes.contents);
                break;
            case "loading":
                SetisLoading(true)
                break;
            case "hasError":
                SetisLoading(true);
                throw allrecipes.contents;

        }
    }, [allrecipes]);
    console.log("allrecipes from the hooks ", allrecipes);
    return { isLoading, recipes }
}