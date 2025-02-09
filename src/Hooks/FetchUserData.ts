import { UserDataSelector, type Userdata } from '@state/Selectors/UserDataSelctor';
import { useEffect, useState } from 'react';
import { type Loadable, useRecoilValueLoadable } from 'recoil';
import { toast } from 'sonner';

export const FetchUserData = () => {
  const [isLoading, SetisLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<Userdata | null>(null);
  const allUserData = useRecoilValueLoadable(UserDataSelector);

  useEffect(() => {
    switch (allUserData.state) {
      case 'hasValue':
        SetisLoading(false);
        setUserData(allUserData.contents);
        break;
      case 'loading':
        SetisLoading(true);
        break;
      case 'hasError':
        SetisLoading(false);
        toast.error('Error fetching user data');
        break;
    }
  }, [allUserData]);

  return { isLoading, userData };
};
