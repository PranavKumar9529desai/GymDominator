import axios, { type AxiosResponse } from 'axios';
import { type RecoilValueReadOnly, selector } from 'recoil';

export interface Userdata {
  name: string;
  email: string;
}

interface UserDataResponse {
  msg: string;
  data: Userdata;
}

export const UserDataSelector: RecoilValueReadOnly<Userdata> = selector({
  key: 'UserDataSelector',
  get: async () => {
    const response: AxiosResponse<UserDataResponse> = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/getuserdata`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );
    console.log('userdata is ', response.data);

    return response.data.data;
  },
});
