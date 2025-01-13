import { motion } from "framer-motion";

interface HowItWorksProps {
  steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
}

export const HowItWorksSection = ({ steps }: HowItWorksProps) => {
  return (
    <div className="container mx-auto px-4 my-32">
      <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        How It Works
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-gray-800/50 rounded-lg"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">{step.step}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
