import { Userdata, UserDataSelector } from "@state/Selectors/UserDataSelctor";
import { useEffect, useState } from "react";
import { Loadable, useRecoilValueLoadable } from "recoil";

export const FetchUserData = () => {
  const [isloading, setisloading] = useState<boolean>(true);
  const UserDataLoadble: Loadable<Userdata> =
    useRecoilValueLoadable(UserDataSelector);
  const [userdata, setuserdata] = useState<Userdata>({
    name: "Pranav",
    email: "dpranav7745@gmail.com",
  });
  useEffect(() => {
    switch (UserDataLoadble.state) {
      case "hasValue":
        setuserdata(UserDataLoadble.contents);
        setisloading(false);
        break;
      case "loading":
        setisloading(true);
        break;
      case "hasError":
        setisloading(false);
        break;
    }
  }, [isloading, UserDataLoadble]);

  return { isloading, userdata };
};
