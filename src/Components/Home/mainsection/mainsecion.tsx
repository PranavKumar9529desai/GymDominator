import Av1 from "@assets/av1.png";
import Av4 from "@assets/av4.png";
import Av3 from "@assets/av3.png";
import { StatsSection } from "../sections/StatsSection";
import FeaturesSection from "../Features/FeaturesSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { HowItWorksSection } from "../sections/HowItWorksSection";
import { CTASection } from "../sections/CTASection";

export const MainSection = () => {
  const testimonials = [
    {
      name: "Harshdeep Singh",
      text: "GymNavigator's free plans transformed my routine. I've never felt stronger!",
      image: Av4,
      role: "Fitness Enthusiast",
      rating: 5,
    },
    {
      name: "Joseph Paul",
      text: "The personal mentor keeps me accountable. It's like having a pro trainer for free!",
      image: Av1,
      role: "Amateur Athlete",
      rating: 5,
    },
    {
      name: "Sachin Patil",
      text: "From workouts to meals, GymNavigator offers an unbeatable free fitness package.",
      image: Av3,
      role: "Gym Regular",
      rating: 5,
    },
    {
      name: "Athrav Deshmane",
      text: "The analytics tracking helped me visualize my progress. Love how the app adapts to my changing fitness levels!",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "Fitness Competitor",
      rating: 5,
    },
    {
      name: "Pranavkumar Desai",
      text: "As a gym owner, this platform streamlined our operations. Member engagement has increased significantly!",
      image: "https://randomuser.me/api/portraits/men/92.jpg",
      role: "Gym Owner",
      rating: 5,
    },
    {
      name: "Snehalata Patil",
      text: "The personalized meal plans and workout tracking have made my fitness journey so much easier to manage.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      role: "Wellness Coach",
      rating: 5,
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Workout Plans" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" },
  ];

 

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your free account in seconds",
    },
    {
      step: 2,
      title: "Set Goals",
      description: "Tell us your fitness goals and preferences",
    },
    {
      step: 3,
      title: "Get Your Plan",
      description: "Receive your personalized workout and meal plans",
    },
    {
      step: 4,
      title: "Start Training",
      description: "Begin your journey with expert guidance",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
      <StatsSection stats={stats} />
      <FeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <HowItWorksSection steps={howItWorks} />
      <CTASection />
    </section>
  );
};
