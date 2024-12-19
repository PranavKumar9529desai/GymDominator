import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import {
  User,
  Phone,
  Weight,
  Ruler,
  Utensils,
  MapPin,
  Target,
} from "lucide-react";

const healthProfileSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must not exceed 15 digits"),
  weight: z
    .number()
    .min(20, "Weight must be at least 20 kg")
    .max(200, "Weight must not exceed 200 kg"),
  height: z
    .number()
    .min(100, "Height must be at least 100 cm")
    .max(250, "Height must not exceed 250 cm"),
  diet: z
    .string()
    .min(2, "Diet preference must be specified")
    .max(100, "Diet description is too long"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),
  goal: z.string({
    required_error: "Please select your goal",
  }),
});

type HealthProfileFormData = z.infer<typeof healthProfileSchema>;

export function UserHealthProfileForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<HealthProfileFormData>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues: {
      fullname: "",
      contact: "",
      weight: 0,
      height: 0,
      diet: "",
      address: "",
      goal: "",
    },
  });

  const onSubmit = (data: HealthProfileFormData) => {
    startTransition(() => {
      (async () => {
        try {
          // TODO: Add your API call here
          console.log("Form data:", data);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      })();
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 ">
      <Card className="shadow-lg bg-white min-w-[250px]">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center justify-center">
            <User className="mr-2" /> Health Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <User className="mr-2 h-4 w-4" /> Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <Phone className="mr-2 h-4 w-4" /> Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your contact number"
                        {...field}
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Weight className="mr-2 h-4 w-4" /> Weight (kg)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter weight in kg"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Ruler className="mr-2 h-4 w-4" /> Height (cm)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter height in cm"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Goal
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-white focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper" className="bg-white border shadow-lg">
                        <SelectItem value="fat_loss">Fat Loss</SelectItem>
                        <SelectItem value="muscle_building">
                          Muscle Building
                        </SelectItem>
                        <SelectItem value="strength_training">
                          Strength Training
                        </SelectItem>
                        <SelectItem value="general_fitness">
                          General Fitness & Health
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <Utensils className="mr-2 h-4 w-4" /> Diet Preference
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-white focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select diet preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent  className="bg-white border shadow-lg">
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Non-Vegetarian">
                          Non-Vegetarian
                        </SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <MapPin className="mr-2 h-4 w-4" /> Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your address"
                        className="resize-none focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

                <Button
                type="submit"
                disabled={isPending}
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                >
                {isPending ? "Submitting..." : "Submit"}
                </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
