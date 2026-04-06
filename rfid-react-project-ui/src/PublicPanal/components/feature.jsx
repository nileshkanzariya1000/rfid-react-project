import { useNavigate } from "react-router-dom";
import SharedNavbar from "./SharedNavbar";
import SharedFooter from "./SharedFooter";
import {
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  BellIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  LinkIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  FingerPrintIcon
} from "@heroicons/react/24/outline";

export default function FeaturePage() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white min-h-screen">
      <SharedNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Powerful RFID System Features</h1>
          <p className="text-xl mb-8 text-green-50">Discover how our comprehensive feature set can transform your attendance management</p>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Core Features</h2>
          <p className="text-gray-600 text-lg">Everything you need for efficient attendance management</p>
        </div>
        
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 flex justify-center items-center shadow-lg order-1 md:order-1">
            <img src="src\assets\Images\rfidproduct.jpg" alt="Real-time Tracking" className="rounded-lg shadow-xl max-w-full" />
          </div>
          <div className="order-2 md:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Real-time Attendance Tracking</h3>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Monitor attendance in real-time across all your locations. Our system records precise 
              entry and exit times, providing an accurate picture of student or employee presence.
            </p>
            <ul className="space-y-3">
              {[
                "Instant attendance recording with minimal manual intervention",
                "Automatic time-stamping of entry and exit",
                "Live dashboard showing who's present and absent",
                "Mobile app access for on-the-go monitoring"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ChartBarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Advanced Reporting & Analytics</h3>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Transform raw attendance data into actionable insights with our comprehensive reporting tools.
              Monitor trends, identify patterns, and make data-driven decisions.
            </p>
            <ul className="space-y-3">
              {[
                "Customizable report templates for different stakeholders",
                "Exportable data in multiple formats (PDF, Excel, CSV)",
                "Visual attendance analytics with graphs and charts",
                "Automated scheduled reports delivered to your inbox"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 flex justify-center items-center shadow-lg order-1 md:order-2">
            <img src="src\assets\Images\report.jpg" alt="Advanced Analytics" className="rounded-lg shadow-xl max-w-full" />
          </div>
        </div>
        
        {/* Feature 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 flex justify-center items-center shadow-lg order-1 md:order-1">
            <img src="src\assets\Images\mobile.jpg" alt="Automated Notifications" className="rounded-lg shadow-xl max-w-full" />
          </div>
          <div className="order-2 md:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <BellIcon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Automated Notifications</h3>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Keep everyone informed with our smart notification system. Automatically alert 
              administrators about absences, late arrivals, and unusual attendance patterns.
            </p>
            <ul className="space-y-3">
              {[
                "Configurable alerts for absences and tardiness",
                "Parent/guardian notifications for student attendance",
                "Bulk notifications for emergency communications",
                "Multi-channel delivery via email, SMS, and push notifications"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Additional Features</h2>
            <p className="text-gray-600 text-lg">More powerful tools to enhance your experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Access Control Integration",
                description: "Combine attendance tracking with building access control for enhanced security and convenience.",
                icon: <ShieldCheckIcon className="w-8 h-8" />,
                color: "purple"
              },
              {
                title: "Multi-Location Support",
                description: "Manage attendance across multiple campuses or offices from a single centralized platform.",
                icon: <BuildingOffice2Icon className="w-8 h-8" />,
                color: "blue"
              },
              {
                title: "Custom Workflows",
                description: "Create specialized attendance rules and approval processes tailored to your organization.",
                icon: <Cog6ToothIcon className="w-8 h-8" />,
                color: "indigo"
              },
              {
                title: "Mobile Compatibility",
                description: "Access the system from any device with our responsive web interface and dedicated mobile apps.",
                icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
                color: "green"
              },
              {
                title: "API Integration",
                description: "Connect with your existing HR, payroll, or student information systems via our robust API.",
                icon: <LinkIcon className="w-8 h-8" />,
                color: "orange"
              },
              {
                title: "Biometric Authentication",
                description: "Optional added security with fingerprint or facial recognition as secondary verification.",
                icon: <FingerPrintIcon className="w-8 h-8" />,
                color: "pink"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`bg-${feature.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-${feature.color}-600`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to see these features in action?</h2>
          <p className="text-xl text-gray-600 mb-8">Schedule a demo or contact our team to learn more about how our RFID system can benefit your organization.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/contact")}
            >
              Schedule a Demo
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button 
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              onClick={() => navigate("/pricing")}
            >
              View Pricing Plans
            </button>
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}