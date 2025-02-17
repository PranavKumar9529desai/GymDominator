import { m } from '@util/lib/motion';

interface StatsProps {
  stats: Array<{
    number: string;
    label: string;
  }>;
}

export const StatsSection = ({ stats }: StatsProps) => {
  return (
    <div className="container mx-auto px-4 mb-32">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <m.div
            key={index as number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {stat.number}
            </h3>
            <p className="text-gray-400 mt-2">{stat.label}</p>
          </m.div>
        ))}
      </div>
    </div>
  );
};
