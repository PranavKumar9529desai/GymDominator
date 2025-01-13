import { motion } from "framer-motion";

export const CTASection = () => {
  return (
    <div className="container mx-auto px-4 my-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center"
      >
        {/* ...existing CTA content... */}
      </motion.div>
    </div>
  );
};
