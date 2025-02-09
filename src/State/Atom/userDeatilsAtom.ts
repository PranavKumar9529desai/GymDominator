import { atom } from 'recoil';

interface UserDetailsType {
  name: string;
}

export const UserDetailsAtom = atom<UserDetailsType>({
  key: 'UserDetailsAtom',
  default: {
    name: '', // Changed from "Anonymous" to empty string
  },
});
