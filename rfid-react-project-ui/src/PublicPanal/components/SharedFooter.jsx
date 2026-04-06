import { Link } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  SparklesIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

const SharedFooter = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <CubeIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-400">RFID SYSTEM</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced attendance tracking solutions for organizations of all sizes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/feature" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpenIcon className="w-4 h-4" />
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <PhoneIcon className="w-4 h-4" />
              Contact
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4" />
                contact@rfidsystem.com
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                (123) 456-7890
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                123 Tech Street, Suite 100
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 RFID System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter;

