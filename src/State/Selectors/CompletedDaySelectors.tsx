import axios, { type AxiosResponse } from 'axios';
import { type RecoilValueReadOnly, selector } from 'recoil';

interface getallcompletedDaysType {
  msg: string;
  completedDays: Date[];
  enrolledDate: Date;
  completionDate: Date;
}

export interface ReturnType {
  completedDays: Date[];
  enrolledDate: Date;
  completionDate: Date;
}

export const CompletedDaySelectors: RecoilValueReadOnly<ReturnType> = selector({
  key: 'CompletedDays',
  get: async () => {
    // TODO : handle fectching errors
    const response: AxiosResponse<getallcompletedDaysType> = await axios(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/compltedDays`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );
    console.log('alldiets', response.data.completedDays);
    return response.data;
  },
});
