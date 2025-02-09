import { atom } from 'recoil';

interface DaysAtomType {
  enrolledDate: Date;
  completiondate: Date;
}

export const DaysAtom = atom<DaysAtomType>({
  key: 'CompletedDaysAtom',
  default: {
    enrolledDate: new Date(2021, 1, 1),
    completiondate: new Date(2021, 1, 1),
  },
});
