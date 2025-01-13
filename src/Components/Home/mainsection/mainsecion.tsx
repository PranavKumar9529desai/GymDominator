import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay';
import WorkoutPlans from "@assets/workoutplans.png";
import Recipes from "@assets/recipes.png";
import Av1 from "@assets/av1.png";
import Av4 from "@assets/av4.png";
import Av3 from "@assets/av3.png";
import PersonalizedMentor from "@assets/personaltrainer.png";

export const MainSection = () => {
  const Testimonial = [
    {
      name: "Harshdeep Singh",
      text: "GymNavigator's free plans transformed my routine. I've never felt stronger!",
      image: Av4,
      role: "Fitness Enthusiast",
      rating: 5
    },
    {
      name: "Joseph Paul",
      text: "The personal mentor keeps me accountable. It's like having a pro trainer for free!",
      image: Av1,
      role: "Amateur Athlete",
      rating: 5
    },
    {
      name: "Sachin Patil",
      text: "From workouts to meals, GymNavigator offers an unbeatable free fitness package.",
      image: Av3,
      role: "Gym Regular",
      rating: 5
    },
  ];

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Dominate Your Fitness Goals
            </h2>
            <p className="max-w-[800px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get everything you need to crush your workouts and achieve your
              dream physique - all for free!
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-14  pb-32">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <img
                  src={WorkoutPlans}
                  alt="Free Gym Workouts"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <h3 className="text-2xl font-bold text-cyan-400">
                  Free Gym Workouts
                </h3>
                <p className="text-center text-gray-400">
                  Access a variety of workout plans tailored to your fitness level
                  and goals.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <img
                  src={Recipes}
                  alt="Personalized Meal Plans"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <h3 className="text-2xl font-bold text-cyan-400">
                  Personalized Meal Plans
                </h3>
                <p className="text-center text-gray-400">
                  Receive customized meal plans to support your fitness journey
                  and nutritional needs.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <img
                  src={PersonalizedMentor}
                  alt="Personal Mentor"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <h3 className="text-2xl font-bold text-cyan-400">
                  Personal Mentor
                </h3>
                <p className="text-center text-gray-400">
                  Get guidance and support from a dedicated fitness mentor to keep
                  you motivated.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-32 mb-20">
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              What Our Dominators Say
            </h3>
            
            <div className="max-w-[340px] mx-auto h-[500px]">
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards, Autoplay]}
                className="h-full"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {Testimonial.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl h-full">
                      <div className="flex flex-col items-center justify-between h-full">
                        <div className="relative w-24 h-24 mb-6">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-50"></div>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="relative rounded-full w-24 h-24 object-cover border-4 border-gray-800"
                          />
                        </div>

                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        <p className="text-gray-300 text-lg italic mb-6">"{testimonial.text}"</p>

                        <div className="text-center">
                          <h4 className="font-bold text-xl text-cyan-400 mb-1">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
              Start Dominating Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
