import { BuildingOfficeIcon, SparklesIcon, UsersIcon } from '@heroicons/react/24/outline';
import { m } from '@util/lib/motion';

const AboutUs = () => {
  const features = [
    {
      icon: <BuildingOfficeIcon className="w-8 h-8" />,
      title: 'Modern Gym Management',
      description:
        'Revolutionizing how gyms operate with cutting-edge technology and seamless integration.',
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: 'Member-Centric Approach',
      description: "Focusing on what matters most - your members' success and satisfaction.",
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: 'Innovation First',
      description:
        'Continuously evolving our platform to meet the changing needs of modern fitness facilities.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            About GymNavigator
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Transforming gym management through innovative technology and seamless experiences
          </p>
        </m.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <m.div
              key={index as number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                At GymNavigator, we're committed to revolutionizing how gyms operate. Our platform
                brings together cutting-edge technology with user-friendly design to create the most
                efficient gym management solution available.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '5+', label: 'Years Experience' },
                { number: '100+', label: 'Gyms' },
                { number: '10K+', label: 'Active Users' },
                { number: '98%', label: 'Satisfaction Rate' },
              ].map((stat, index) => (
                <m.div
                  key={index as number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="text-2xl font-bold text-blue-400">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default AboutUs;
