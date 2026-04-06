import { useNavigate } from "react-router-dom";
import SharedNavbar from "./SharedNavbar";
import SharedFooter from "./SharedFooter";
import {
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const navigate = useNavigate();
    return (
      <div className="bg-white">
        <SharedNavbar />

  
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  RFID Based Embedded Attendance System
                </h1>
                <p className="text-xl mb-8 text-green-50">
                  An RFID-based embedded system for attendance tracking, access control, and real-time monitoring. 
                  Streamline your organization's attendance management with cutting-edge technology.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    className="flex items-center gap-2 bg-white text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => navigate("/feature")}
                  >
                    Get Started Today
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                  <button 
                    className="flex items-center gap-2 bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
                    onClick={() => navigate("/contact")}
                  >
                    Request a Demo
                  </button>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-2xl blur-2xl opacity-50"></div>
                  <img 
                    src="home.png" 
                    alt="RFID Illustration" 
                    className="relative w-full max-w-lg rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                All-in-One Student and Employee Management
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive solutions for managing attendance, students, and employees efficiently
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon={<ClockIcon className="w-8 h-8" />}
                title="Take Attendance in Minutes" 
                description="Quick and accurate attendance recording with RFID technology." 
              />
              <FeatureCard 
                icon={<UserGroupIcon className="w-8 h-8" />}
                title="Student Management" 
                description="Comprehensive student tracking and management system." 
              />
              <FeatureCard 
                icon={<ChartBarIcon className="w-8 h-8" />}
                title="Smart Reporting & Analytics" 
                description="Gain insights with detailed reports and analytics." 
              />
              <FeatureCard 
                icon={<SparklesIcon className="w-8 h-8" />}
                title="Real-time Monitoring" 
                description="Monitor attendance in real-time across all locations." 
              />
            </div>
          </div>
        </section>
  
        {/* Pricing Section */}
        <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Complete Package System</h2>
            <p className="text-xl mb-8 text-green-50">
              Automate for more than 10 roles at once and looking for a comprehensive solution?
            </p>
            <button
              className="flex items-center gap-2 bg-white text-green-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto"
              onClick={() => navigate('/pricing')}
            >
              See Pricing
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </section>

        <SharedFooter />
      </div>
    );
  }
  
  function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-green-600">
          {icon}
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  