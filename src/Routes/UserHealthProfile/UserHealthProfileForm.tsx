import { zodResolver } from '@hookform/resolvers/zod';
import Slider from 'rc-slider';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import 'rc-slider/assets/index.css';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { m } from '@util/lib/motion';
import { Phone, Ruler, Target, User, Utensils, Weight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PostUserHealthProfileForm from './PostHealthProfileFom';

const healthProfileSchema = z.object({
  fullname: z.string().min(2, 'Name must be at least 2 characters'),
  contact: z
    .string()
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must not exceed 15 digits'),
  weight: z
    .number()
    .min(20, 'Weight must be at least 20 kg')
    .max(200, 'Weight must not exceed 200 kg'),
  height: z
    .number()
    .min(100, 'Height must be at least 100 cm')
    .max(250, 'Height must not exceed 250 cm'),
  diet: z
    .string()
    .min(2, 'Diet preference must be specified')
    .max(100, 'Diet description is too long'),
  goal: z.string({
    required_error: 'Please select your goal',
  }),
  age: z.number().min(16, 'Must be at least 16 years old').max(100, 'Must be under 100'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender',
  }),
});

export type HealthProfileFormData = z.infer<typeof healthProfileSchema>;

export default function UserHealthProfileForm() {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const form = useForm<HealthProfileFormData>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues: {
      fullname: '',
      contact: '',
      weight: 0,
      height: 0,
      diet: '',
      goal: '',
      age: 16,
      gender: 'male',
    },
  });

  const onSubmit = (data: HealthProfileFormData) => {
    startTransition(() => {
      (async () => {
        try {
          const response = await PostUserHealthProfileForm(data);
          toast.success('Health profile updated successfully!');
          navigate('/dashboard/diet/personalizeddiet');
          console.log(response);
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('Failed to update health profile');
        }
      })();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <Card className="shadow-xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <CardTitle className="text-2xl font-bold text-center">
              Complete Your Health Profile
            </CardTitle>
            <p className="text-blue-100 text-center mt-2">
              Help us create your perfect fitness plan
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info Section */}
                <div className="space-y-4">
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

                  {/* Age Slider */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="flex items-center justify-between">
                          <span className="flex items-center text-gray-700">
                            <User className="mr-2 h-4 w-4" /> Age
                          </span>
                          <span className="text-2xl font-bold text-blue-600">{field.value}</span>
                        </FormLabel>
                        <Controller
                          name="age"
                          control={form.control}
                          render={({ field: { onChange, value } }) => (
                            <Slider
                              min={16}
                              max={100}
                              value={value}
                              onChange={onChange}
                              railStyle={{ backgroundColor: '#E5E7EB' }}
                              trackStyle={{ backgroundColor: '#2563EB' }}
                              handleStyle={{
                                borderColor: '#2563EB',
                                backgroundColor: '#FFFFFF',
                              }}
                            />
                          )}
                        />
                      </FormItem>
                    )}
                  />

                  {/* Gender Selection */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex justify-between"
                        >
                          {[
                            { value: 'male', label: 'Male', icon: '👨' },
                            { value: 'female', label: 'Female', icon: '👩' },
                            { value: 'other', label: 'Other', icon: '👤' },
                          ].map((option) => (
                            <div key={option.value} className="flex-1 mx-1 first:ml-0 last:mr-0">
                              <label
                                htmlFor={option.value}
                                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                  field.value === option.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-200'
                                }`}
                              >
                                <span className="text-2xl mb-2">{option.icon}</span>
                                <RadioGroupItem value={option.value} className="sr-only" />
                                <span className="text-sm font-medium">{option.label}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormItem>
                    )}
                  />

                  {/* Weight and Height with Visual Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="flex items-center justify-between">
                            <span className="flex items-center">
                              <Weight className="mr-2 h-4 w-4" /> Weight
                            </span>
                            <span className="text-xl font-bold text-blue-600">
                              {field.value} kg
                            </span>
                          </FormLabel>
                          <Controller
                            name="weight"
                            control={form.control}
                            render={({ field: { onChange, value } }) => (
                              <Slider
                                min={20}
                                max={200}
                                value={value}
                                onChange={onChange}
                                railStyle={{ backgroundColor: '#E5E7EB' }}
                                trackStyle={{ backgroundColor: '#2563EB' }}
                                handleStyle={{
                                  borderColor: '#2563EB',
                                  backgroundColor: '#FFFFFF',
                                }}
                              />
                            )}
                          />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="flex items-center justify-between">
                            <span className="flex items-center">
                              <Ruler className="mr-2 h-4 w-4" /> Height
                            </span>
                            <span className="text-xl font-bold text-blue-600">
                              {field.value} cm
                            </span>
                          </FormLabel>
                          <Controller
                            name="height"
                            control={form.control}
                            render={({ field: { onChange, value } }) => (
                              <Slider
                                min={100}
                                max={250}
                                value={value}
                                onChange={onChange}
                                railStyle={{ backgroundColor: '#E5E7EB' }}
                                trackStyle={{ backgroundColor: '#2563EB' }}
                                handleStyle={{
                                  borderColor: '#2563EB',
                                  backgroundColor: '#FFFFFF',
                                }}
                              />
                            )}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-white focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select your goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper" className="bg-white border shadow-lg">
                          <SelectItem value="fat_loss">Fat Loss</SelectItem>
                          <SelectItem value="muscle_building">Muscle Building</SelectItem>
                          <SelectItem value="strength_training">Strength Training</SelectItem>
                          <SelectItem value="general_fitness">General Fitness & Health</SelectItem>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-white focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select diet preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border shadow-lg">
                          <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                          <SelectItem value="Vegan">Vegan</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin mr-2">⏳</div>
                        Saving...
                      </div>
                    ) : (
                      'Complete Profile'
                    )}
                  </Button>
                </m.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </m.div>
    </div>
  );
}
