import axios, { AxiosResponse } from "axios";
import { RecoilValueReadOnly, selector } from "recoil";



export interface Diet{
    id : number,
    name : string 
    img : string
    description : string
}

interface res {
    msg: string;
    alldiets: Diet[];
}

export const DietSelectors  : RecoilValueReadOnly<Diet[]> = selector({
    key: 'DietSelctors',
    get: async () => {
     // TODO : handle fectching errors
        const response: AxiosResponse<res> = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/v1/diet/alldiets`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        console.log("alldiets" , response.data.alldiets);
        return response.data.alldiets;
    }
});