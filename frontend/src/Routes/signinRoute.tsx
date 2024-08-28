import { Auth } from "@components/Auth/Auth";
import Quote from "@components/Auth/Quote";
import Signin2 from "@components/signin2";

export function SignIn() {
  return (
    <div
      className="lg:grid grid-cols-2 flex justify-center items-center h-screen bg-slate-200 
       lg:bg-gradient-to-tr from-gray-300 to-black"
    >


      <div className="flex justify-center items-center ">
        {/* <Signin2 /> */}
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}
