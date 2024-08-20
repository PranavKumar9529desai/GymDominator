import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@components/ui/ui/card";
import { Label } from "@components/ui/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/ui/input-otp";
import { Input } from "@components/ui/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/ui/select";
import { Button } from "@components/ui/ui/button";
export const HealthProfileForm = () => {
  return (
    <div className="">
      <Card className=" max-w-4xl mx-auto bg-[#ffff] ">
        <CardHeader>
          <CardTitle>Health Profile</CardTitle>
          <CardDescription className="text-gray-500">
            Fill out the form to create your personalized health profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" >Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <InputOTP maxLength={5} pattern="^[a-zA-Z0-9]+$" id="otp">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter your height"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="diet">Diet Preference</Label>
            <Select id="diet" defaultValue="non-vegetarian">
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
        <CardFooter className="flex justify-end">
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
