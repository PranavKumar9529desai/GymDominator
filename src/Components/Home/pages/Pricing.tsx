import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    period: '/month',
    description: 'Perfect for small gyms',
    features: [
      'Up to 100 members',
      'Basic analytics',
      'QR attendance system',
      'Email support',
      '1 Admin account',
    ],
  },
  {
    name: 'Pro',
    price: '₹1,999',
    period: '/month',
    description: 'Great for growing gyms',
    popular: true,
    features: [
      'Up to 500 members',
      'Advanced analytics',
      'Custom branding',
      'Priority support',
      '5 Admin accounts',
      'Member app access',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large fitness chains',
    features: [
      'Unlimited members',
      'Custom solutions',
      'Dedicated support',
      'API access',
      'Multiple locations',
      'Custom integrations',
    ],
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your gym. All plans include our core features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index as number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`
                relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border 
                ${plan.popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-white">
                  {plan.price}
                  <span className="text-sm text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i as number} className="flex items-center text-gray-300">
                    <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`
                w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'border border-gray-600 hover:border-blue-500 text-white'
                }
              `}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
