import { DaysAtom } from '@state/Atom/completedDays';
import { CompletedDaySelectors } from '@state/Selectors/CompletedDaySelectors';
import type { ReturnType } from '@state/Selectors/CompletedDaySelectors';
import { useEffect, useState } from 'react';
import { type Loadable, useRecoilState, useRecoilValueLoadable } from 'recoil';

export const FetchCompletedDays = () => {
  const allDates = useRecoilValueLoadable(CompletedDaySelectors);
  const [isLoading, SetisLoading] = useState<boolean>(true);
  const [CompltedDays, setdates] = useState<Date[]>([]);
  const [, setdaysinfo] = useRecoilState(DaysAtom);

  useEffect(() => {
    switch (allDates.state) {
      case 'hasValue':
        SetisLoading(false);
        setdates(allDates.contents.completedDays);
        setdaysinfo({
          enrolledDate: allDates.contents.enrolledDate,
          completiondate: allDates.contents.completionDate,
        });
        break;
      case 'loading':
        SetisLoading(true);
        break;
      case 'hasError':
        SetisLoading(false);
        break;
    }
  }, [allDates, setdaysinfo]);

  return { isLoading, CompltedDays };
};
