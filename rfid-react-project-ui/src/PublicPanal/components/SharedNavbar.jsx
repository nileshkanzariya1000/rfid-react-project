import { Link, useNavigate } from "react-router-dom";
import { 
  HomeIcon,
  CubeIcon,
  SparklesIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  UserIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

const SharedNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-green-500 p-2 rounded-lg">
              <CubeIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-green-400">RFID SYSTEM</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/product"
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <CubeIcon className="w-4 h-4" />
              Product
            </Link>
            <Link
              to="/feature"
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <SparklesIcon className="w-4 h-4" />
              Feature
            </Link>
            <Link
              to="/resources"
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <BookOpenIcon className="w-4 h-4" />
              Resource
            </Link>
            <Link
              to="/pricing"
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <CurrencyDollarIcon className="w-4 h-4" />
              Pricing
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <PhoneIcon className="w-4 h-4" />
              Contact
            </Link>
            <Link
              to="/AdminLogin"
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <UserIcon className="w-4 h-4" />
              Admin
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/ClientLogin")}
              className="hidden sm:flex items-center gap-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <BuildingOfficeIcon className="w-4 h-4" />
              Client
            </button>
            <button
              onClick={() => navigate("/UserLogin")}
              className="flex items-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium shadow-lg hover:shadow-xl"
            >
              <UserIcon className="w-4 h-4" />
              User
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SharedNavbar;

