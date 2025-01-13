import Av1 from "@assets/av1.png";
import Av4 from "@assets/av4.png";
import Av3 from "@assets/av3.png";
import { StatsSection } from "../sections/StatsSection";
import FeaturesSection from "../Features/FeaturesSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { HowItWorksSection } from "../sections/HowItWorksSection";
import { CTASection } from "../sections/CTASection";
import { FAQSection } from "../sections/FAQSection";

export const MainSection = () => {
  const testimonials = [
    {
      name: "Rajesh Sharma",
      text: "GymNavigator's free plans transformed my fitness journey. Best decision ever!",
      image: Av4,
      role: "Software Engineer & Fitness Enthusiast",
      rating: 5,
    },
    {
      name: "Priya Patel",
      text: "The personal mentor keeps me motivated. Finally found a program that works for me!",
      image: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg", // Indian female profile
      role: "Yoga Instructor",
      rating: 5,
    },
    {
      name: "Amit Deshmukh",
      text: "From workouts to meals, GymNavigator understands Indian fitness needs perfectly.",
      image: Av3,
      role: "Business Professional",
      rating: 5,
    },
    {
      name: "Meera Iyer",
      text: "The analytics tracking helped me achieve my fitness goals while maintaining a balanced lifestyle!",
      image: Av1, // Indian female profile
      role: "Fitness Trainer",
      rating: 5,
    },
    {
      name: "Vikram Malhotra",
      text: "As a gym owner in Mumbai, this platform has revolutionized how we manage our members.",
      image: "https://api.uifaces.co/our-content/donated/N5PLzyan.jpg", // Indian male profile
      role: "Gym Owner",
      rating: 5,
    },
    {
      name: "Anjali Verma",
      text: "The diet plans perfectly balance modern fitness needs with traditional Indian nutrition.",
      image: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg", // Indian female profile
      role: "Nutritionist",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10+", label: "Enrolled" },
    { number: "500+", label: "Workout Plans" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
      <StatsSection stats={stats} />
      <FeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
    </section>
  );
};
