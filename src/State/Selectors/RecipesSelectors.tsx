import axios, { type AxiosResponse } from 'axios';
import { type RecoilValueReadOnly, selector } from 'recoil';

export interface Recipes {
  id: number;
  name: string;
  img: string;
  description: string;
}

interface res {
  msg: string;
  allrecipes: Recipes[];
}

export const RecipesSelectors: RecoilValueReadOnly<Recipes[]> = selector({
  key: 'RecipesSelectors',
  get: async () => {
    // TODO : handle fectching errors
    const response: AxiosResponse<res> = await axios(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/allrecipes`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );
    console.log('allrecipes', response.data.allrecipes);
    return response.data.allrecipes;
  },
});
