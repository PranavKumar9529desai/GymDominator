import { PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

type BMIVisualizerProps = {
  bmi: number;
};

const BMI_RANGES = [
  { min: 0, max: 18.5, category: 'Underweight', color: '#3B82F6' },  // Blue
  { min: 18.5, max: 24.9, category: 'Normal', color: '#10B981' },   // Green
  { min: 25, max: 29.9, category: 'Overweight', color: '#F59E0B' }, // Yellow
  { min: 30, max: 40, category: 'Obese', color: '#EF4444' }         // Red
];

const getBMICategory = (bmi: number) => {
  return BMI_RANGES.find(range => bmi >= range.min && bmi < range.max) || BMI_RANGES[BMI_RANGES.length - 1];
};

const getNeedleRotation = (bmi: number) => {
  const minBMI = 15;
  const maxBMI = 40;
  const minAngle = -90; // Left side of semicircle
  const maxAngle = 90;  // Right side of semicircle
  
  // Clamp BMI value to our range
  const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
  
  // Linear interpolation between angles based on BMI
  const angle = minAngle + (clampedBMI - minBMI) * (maxAngle - minAngle) / (maxBMI - minBMI);
  
  return `rotate(${angle} 200 200)`;
};

const calculateLabelPosition = (bmiValue: number) => {
  const minBMI = 15;
  const maxBMI = 40;
  
  // Reverse the mapping: 15 should be at 180° (left) and 40 at 0° (right)
  const angleInDegrees = 180 - (((bmiValue - minBMI) / (maxBMI - minBMI)) * 180);
  const angleInRadians = angleInDegrees * (Math.PI / 180);
  
  // Calculate position on the semicircle
  const radius = 160;
  const x = 200 + Math.cos(angleInRadians) * radius;
  const y = 200 - Math.sin(angleInRadians) * radius;
  
  return { x, y };
};

export const BMIVisualizer = ({ bmi }: BMIVisualizerProps) => {
  const category = getBMICategory(bmi);
  const data = BMI_RANGES.map(range => ({
    value: range.max - range.min,
    color: range.color
  }));

  const CustomLabel = () => (
    <g>
      <text x={200} y={160} textAnchor="middle" className="text-3xl font-bold">
        {bmi.toFixed(1)}
      </text>
      <text x={200} y={190} textAnchor="middle" className="text-lg" fill={category.color}>
        {category.category}
      </text>
    </g>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-white shadow-lg"
    >
      <div className="relative w-full max-w-md mx-auto">
        <PieChart width={400} height={240}>
          {/* Semi-circular gauge background */}
          <Pie
            data={data}
            cx={200}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={140}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          
          {/* Updated needle with outward pointing design */}
          <g transform={getNeedleRotation(bmi)}>
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              d="M 200 200 L 200 140 L 196 200 L 204 200 Z"  // Triangle pointing outward
              fill={category.color}
            />
            <circle cx={200} cy={200} r={6} fill={category.color} />
          </g>

          {/* BMI value and category */}
          <CustomLabel />

          {/* Updated BMI range labels with exact positioning */}
          {[15, 20, 25, 30, 35, 40].map(value => {
            const pos = calculateLabelPosition(value);
            return (
              <text 
                key={value}
                x={pos.x} 
                y={pos.y} 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="text-xs"
              >
                {value}
              </text>
            );
          })}

        </PieChart>

        {/* BMI Categories Legend */}
        <div className="flex justify-between mt-4 px-4">
          {BMI_RANGES.map((range) => (
            <div key={range.category} className="flex flex-col items-center">
              <div 
                className="w-3 h-3 rounded-full mb-1" 
                style={{ backgroundColor: range.color }}
              />
              <span className="text-xs text-gray-600">{range.category}</span>
            </div>
          ))}
        </div>

        {/* Health Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className={`mt-6 p-4 rounded-lg text-center`}
          style={{ backgroundColor: `${category.color}20` }}
        >
          <p className="text-sm" style={{ color: category.color }}>
            {category.category === 'Normal' 
              ? "Great job! You're maintaining a healthy BMI."
              : `Your BMI indicates you're in the ${category.category.toLowerCase()} range. 
                 Let's work together towards a healthier you!`}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
