import { Auth } from "@components/Auth/Auth";
import Quote from "@components/Auth/Quote";

export function SignIn() {
  return (
    <div
      className="lg:grid grid-cols-2 flex justify-center items-center h-screen bg-slate-200 
       lg:bg-gradient-to-tl  from-blue-600 to-violet- 600"
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
