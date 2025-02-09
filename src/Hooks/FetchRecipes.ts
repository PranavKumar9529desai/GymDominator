import { RecipesSelectors } from '@state/Selectors/RecipesSelectors';
import type { Recipes } from '@state/Selectors/RecipesSelectors';
import { useEffect, useState } from 'react';
import { type Loadable, useRecoilValueLoadable } from 'recoil';

export const FetchrecipesGroups = () => {
  const [isLoading, SetisLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const allRecipes = useRecoilValueLoadable(RecipesSelectors);

  useEffect(() => {
    switch (allRecipes.state) {
      case 'hasValue':
        SetisLoading(false);
        setRecipes(allRecipes.contents);
        break;
      case 'loading':
        SetisLoading(true);
        break;
      case 'hasError':
        SetisLoading(false);
        break;
    }
  }, [allRecipes]);

  return { isLoading, recipes };
};
