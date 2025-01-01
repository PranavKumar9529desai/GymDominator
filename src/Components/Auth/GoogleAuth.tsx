import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserDetailsAtom } from "@state/Atom/userDeatilsAtom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export function GoogleAuth() {
  const [, setUserDetails] = useRecoilState(UserDetailsAtom);
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const decoded: any = jwtDecode(
                credentialResponse.credential || ""
              );

              // Send to your backend
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/google-auth`,
                {
                  token: credentialResponse.credential,
                  email: decoded.email,
                  name: decoded.name,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                  },
                }
              );

              localStorage.setItem("jwt", response.data.newToken);
              setUserDetails({ name: decoded.name });
              toast.success("Successfully logged in!", {
                description: `Welcome back, ${decoded.name}!`,
              });
              // Navigate to welcome page
              navigate('/welcome');
            } catch (error) {
              console.error("Google auth error:", error);
              toast.error("Authentication Failed", {
                description: "Unable to login with Google. Please try again.",
              });
            }
          }}
          onError={(error) => {
            console.error("Login Failed:", error);
            toast.error("Google Login Failed", {
              description: "Something went wrong with Google authentication.",
            });
          }}
          useOneTap
          auto_select
        />
      </div>
    </div>
  );
}
