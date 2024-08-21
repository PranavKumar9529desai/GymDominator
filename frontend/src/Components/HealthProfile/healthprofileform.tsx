import {
  UserHealthprofileAtom,
  UserHealthprofileType,
} from "@state/Atom/UserHealthProfileAtom";
import { useRecoilState } from "recoil";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@components/ui/ui/card";
import { Label } from "@components/ui/ui/label";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@components/ui/ui/input-otp";
import { Input } from "@components/ui/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/ui/select";
import { Button } from "@components/ui/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type DietType = "vegetarian" | "non-vegetarian";

export const HealthProfileForm = () => {
  const [fullname, setfullname] = useState<string>("");
  const [contact, setcontact] = useState<number>(0);
  const [height, setheight] = useState<number>(0);
  const [weight, setweight] = useState<number>(0);
  const [otp, setotp] = useState<string>("");
  const [diet, setdiet] = useState<DietType>("non-vegetarian");
  const [userHealthProfile, setUserHealthProfile] =
    useRecoilState<UserHealthprofileType>(UserHealthprofileAtom);
  const navigate = useNavigate();

  return (
    <div className="">
      <form
        className=""
        action=""
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setUserHealthProfile({
            fullname,
            contact,
            height,
            weight,
            otp,
            diet,
          });
          console.log("healthprofile form is submitted ", userHealthProfile);
          navigate("/onboarding/healthprofile/workoutplace");
        }}
      >
        <Card className=" lg:max-w-6xl mx-auto bg-[#ffff] lg:px-8 px-2 ">
          <CardHeader>
            <CardTitle className="">Health Profile</CardTitle>
            <CardDescription className="text-gray-500">
              Fill out the form to create your personalized health profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  className="bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-gray-400"
                  id="name"
                  placeholder="Enter your full name"
                  setfullname={setfullname}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="Enter your contact number"
                  setcontact={setcontact}
                />
              </div>
            </div>
            {/* TODO for sake for complexcity we will remove the otp field by far now  */}

            {/* <div className="space-y-2 w-fit/">
              <Label htmlFor="otp">One-Time Password</Label>
              <InputOTP
                maxLength={5}
                required
                pattern="^[a-zA-Z0-9]+$"
                id="otp"
                value={otp}
                setotp={setotp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
            </div> */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  setheight={setheight}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  setweight={setweight}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="diet">Diet Preference</Label>
              <Select
                onValueChange={(value: DietType) => setdiet(value as DietType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select diet preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center lg:mt-12 mt-12">
            <Button
              type="submit"
              className="w-40 bg-black text-white  text-center mt-2"
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
