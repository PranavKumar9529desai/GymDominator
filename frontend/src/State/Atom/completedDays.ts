import { atom } from "recoil";



export const CompletedDaysAtom = atom<{ DateArray: Date[] }>({
    key: "CompletedDaysAtom",
    default: {
        DateArray: []
    }
})