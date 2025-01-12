// @ts-nocheck

import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
export const Footer = () => {
  return (
    <section id="contact-us">
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 w-full">
        <div className="container mx-auto w-full ">
          <div className="grid grid-cols-1  lg:gap-48 gap-10 w-full lg:grid-cols-3 ">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                GymNavigator
              </h3>
              <p className="text-sm">
                Empowering you to dominate your fitness goals with free
                workouts, meal plans, and personal mentorship.
              </p>
              <div className="flex space-x-4">
                <button className="hover:text-cyan-400 transition-colors">
                  {/* @ts-ignore */}
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </button>
                <button className="hover:text-cyan-400 transition-colors">
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </button>
                <button className="hover:text-cyan-400 transition-colors">
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </button>
                <button className="hover:text-cyan-400 transition-colors">
                  <Youtube size={24} />
                  <span className="sr-only">YouTube</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Contact Us
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin size={18} className="mr-2 text-cyan-400" />
                  123 Fitness Street, Muscle City, ST 12345
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2 text-cyan-400" />
                  (123) 456-7890
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-2 text-cyan-400" />
                  info@GymNavigator.com
                </li>
              </ul>
            </div>
            <div className="">
              <h4 className="text-lg font-semibold mb-4 text-white">
                Newsletter
              </h4>
              <p className="mb-4 text-sm">
                Subscribe to get the latest news and offers.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-r-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} GymNavigator. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};
