import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { 
  UserPlusIcon, 
  QrCodeIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "How to get enrolled?",
    answer: "If you are a gym owner, create an account on gymnavigator.in. If you are a client, ask your gym owner to create an account. Creating an account on GymNavigator is the first step to get started.",
    icon: <UserPlusIcon className="w-6 h-6" />
  },
  {
    question: "How do I get enrolled into a particular gym?",
    answer: "Ask your gym owner to show the onboarding QR code. Once you scan the onboarding QR code, you will be automatically enrolled into the gym.",
    icon: <QrCodeIcon className="w-6 h-6" />
  },
  {
    question: "How will the trainer be assigned?",
    answer: "The gym owner will assign a trainer to you. Your assigned trainer will then create personalized diet plans and workout routines tailored to your goals and needs.",
    icon: <UserGroupIcon className="w-6 h-6" />
  },
  {
    question: "How is my progress tracked?",
    answer: "Your progress is tracked based on your gym attendance. When you scan the attendance QR code at the gym, your attendance is automatically marked and recorded in the system.",
    icon: <ChartBarIcon className="w-6 h-6" />
  }
];

export function FAQSection() {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-blue-400 text-center mb-12 text-lg">
          Everything you need to know about getting started
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index}>
              {({ open }) => (
                <div className={`
                  transform transition-all duration-200
                  ${open ? 'scale-102 -translate-y-1' : ''}
                  bg-gray-800/50 backdrop-blur-lg rounded-xl
                  hover:bg-gray-800/70 border border-gray-700
                  ${open ? 'ring-2 ring-blue-500/50' : ''}
                `}>
                  <Disclosure.Button className="flex items-center w-full px-6 py-5 text-left">
                    <div className="mr-4 text-blue-400">
                      {faq.icon}
                    </div>
                    <span className="flex-grow text-lg font-medium text-white">
                      {faq.question}
                    </span>
                    <ChevronUpIcon
                      className={`flex-shrink-0 w-5 h-5 text-blue-400 transition-transform duration-300
                        ${open ? 'transform rotate-180' : ''}`}
                    />
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-150 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-6 pb-5 pl-16">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}
