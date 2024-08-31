import { atom } from "recoil";

// interface UserDetailsAtomType {
//     name: string
// }

export const UserDetailsAtom = atom<{ name: string }>({
    key: "UserDetailsAtom",
    default: {
        name: "Anonymous"
    }
})