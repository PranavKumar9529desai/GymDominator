import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              GymDominator
            </h3>
            <p className="text-sm">
              Empowering you to dominate your fitness goals with free workouts,
              meal plans, and personal mentorship.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </Link>
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
                info@gymdominator.com
              </li>
            </ul>
          </div>
          <div>
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
            &copy; {new Date().getFullYear()} GymDominator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
