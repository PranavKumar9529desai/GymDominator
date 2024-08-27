import { atom } from "recoil";

interface CompletedDaysAtomType {

}

export const CompletedDaysAtom = atom<{ DateArray: Date[] }>({
    key: "CompletedDaysAtom",
    default: {
        DateArray: []
    }
})