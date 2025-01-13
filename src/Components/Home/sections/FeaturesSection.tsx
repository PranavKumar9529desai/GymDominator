import { motion } from "framer-motion";

interface FeaturesProps {
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export const FeaturesSection = ({ features }: FeaturesProps) => {
  return (
    <div className="container mx-auto px-4 my-32">
      <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Why Choose GymNavigator?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
