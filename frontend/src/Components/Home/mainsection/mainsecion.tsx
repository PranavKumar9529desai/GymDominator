import { Card , CardContent } from "@components/ui/ui/card";
import { Button } from "@components/ui/ui/button";
export const MainSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Dominate Your Fitness Goals
          </h2>
          <p className="max-w-[800px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Get everything you need to crush your workouts and achieve your
            dream physique - all for free!
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <img
                src="/src/assets/workoutplans.png"
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
                src="/src/assets/recipes.png"
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
                src="/src/assets/personaltrainer.png"
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
        <div className="mt-20">
          <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 my-2">
            What Our Dominators Say
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {[
              {
                name: "Harshdeep",
                text: "GymDominator's free plans transformed my routine. I've never felt stronger!",
                image:
                  "/src/assets/av4.png",
              },
              {
                name: "Joseph",
                text: "The personal mentor keeps me accountable. It's like having a pro trainer for free!",
                image:
                  "/src/assets/av1.png",
              },
              {
                name: "Sachin Patil",
                text: "From workouts to meals, GymDominator offers an unbeatable free fitness package.",
                image:
                  "/src/assets/av3.png",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <p className="text-gray-400 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-cyan-400">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
            Start Dominating Now
          </Button>
        </div>
      </div>
    </section>
  );
};
