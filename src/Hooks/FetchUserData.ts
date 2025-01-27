import { Userdata, UserDataSelector } from "@state/Selectors/UserDataSelctor";
import { useEffect, useState } from "react";
import { Loadable, useRecoilValueLoadable } from "recoil";
import { toast } from "sonner";

export const FetchUserData = () => {
	const [isloading, setisloading] = useState<boolean>(true);
	const [userdata, setuserdata] = useState<Userdata | null>(null);
	const UserDataLoadble: Loadable<Userdata> =
		useRecoilValueLoadable(UserDataSelector);

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
				toast.error("Failed to fetch user data");
				throw new Error("Failed to fetch user data");
		}
	}, [UserDataLoadble]);

	return { isloading, userdata };
};
