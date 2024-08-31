import { Loadable, useRecoilState, useRecoilValueLoadable} from "recoil"
import { useEffect, useState } from "react";
import { CompletedDaySelectors } from "@state/Selectors/CompletedDaySelectors";
import { ReturnType } from "@state/Selectors/CompletedDaySelectors";
import { DaysAtom } from "@state/Atom/completedDays";
export const FetchCompletedDays = () => {
    const allDates: Loadable<ReturnType> = useRecoilValueLoadable(CompletedDaySelectors);
    const [isLoading, SetisLoading] = useState<boolean>(false);
    const [CompltedDays, setdates] = useState<Date[]>([]);
    const [, setdaysinfo] = useRecoilState(DaysAtom);
    useEffect(() => {

        switch (allDates.state) {
            case "hasValue":
                SetisLoading(false);
                setdates(allDates.contents.completedDays);
                setdaysinfo({ enrolledDate: allDates.contents.enrolledDate, completiondate: allDates.contents.completionDate });
                break;
            case "loading":
                SetisLoading(true)
                break;
            case "hasError":
                SetisLoading(true);
                throw allDates.contents;

        }
    }, [allDates]);
    console.log("alldates from the  from the hooks ", allDates);
    return { isLoading, CompltedDays }
}