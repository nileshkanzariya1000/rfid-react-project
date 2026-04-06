import { useNavigate } from "react-router-dom";
import SharedNavbar from "./SharedNavbar";
import SharedFooter from "./SharedFooter";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  CpuChipIcon,
  CloudIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  LinkIcon
} from "@heroicons/react/24/outline";

export default function ProductPage() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white min-h-screen">
      <SharedNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Advanced RFID Attendance System</h1>
          <p className="text-xl mb-8 text-green-50">Revolutionize how you track attendance with our cutting-edge RFID technology</p>
          <div className="flex justify-center gap-4">
            <button 
              className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/feature")}
            >
              Learn More
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">How Our RFID System Works</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Our RFID-based attendance tracking system uses state-of-the-art technology to 
              automate attendance recording for schools, universities, and businesses.
            </p>
            <ul className="space-y-4">
              {[
                "RFID cards or tags uniquely identify each individual",
                "Strategically placed RFID readers capture attendance automatically",
                "Cloud-based software processes and stores all attendance data",
                "Real-time reporting and analytics available on any device"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-green-500 text-white rounded-full p-1.5 mr-3 mt-1 flex-shrink-0">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 flex justify-center items-center shadow-lg">
            <img src="src\assets\Images\getstart.jpg" alt="RFID System Diagram" className="rounded-lg shadow-xl max-w-full" />
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Key Product Features</h2>
            <p className="text-gray-600 text-lg">Everything you need for efficient attendance management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Contactless Technology",
                description: "No physical contact required, improving hygiene and speed of attendance taking",
                icon: <CpuChipIcon className="w-8 h-8" />,
                color: "blue"
              },
              {
                title: "Real-time Tracking",
                description: "Instantly record and view attendance data as it happens",
                icon: <ChartBarIcon className="w-8 h-8" />,
                color: "green"
              },
              {
                title: "Multi-level Access Control",
                description: "Customize access for students, teachers, administrators, and guests",
                icon: <ShieldCheckIcon className="w-8 h-8" />,
                color: "purple"
              },
              {
                title: "Automated Notifications",
                description: "Send alerts for absences, late arrivals, or unauthorized access attempts",
                icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
                color: "orange"
              },
              {
                title: "Comprehensive Reporting",
                description: "Generate detailed attendance reports with custom parameters",
                icon: <ChartBarIcon className="w-8 h-8" />,
                color: "indigo"
              },
              {
                title: "Easy Integration",
                description: "Works with existing student information systems and HR platforms",
                icon: <LinkIcon className="w-8 h-8" />,
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

      {/* Technical Specifications */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Technical Specifications</h2>
          <p className="text-gray-600 text-lg">Built with enterprise-grade technology</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <CpuChipIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Hardware Specifications</h3>
            </div>
            <ul className="space-y-4">
              {[
                { label: "RFID Reader Range", value: "Up to 10 meters (adjustable)" },
                { label: "Card Compatibility", value: "13.56 MHz ISO 14443A/B" },
                { label: "Reader Power", value: "PoE or DC adapter" },
                { label: "Installation", value: "Wall-mounted or desk-mounted options" },
                { label: "Storage Capacity", value: "Up to 100,000 events offline" },
                { label: "Connectivity", value: "Ethernet, Wi-Fi, 4G options" }
              ].map((spec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">{spec.label}:</strong>
                    <span className="text-gray-600 ml-2">{spec.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <CloudIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Software Specifications</h3>
            </div>
            <ul className="space-y-4">
              {[
                { label: "Cloud Hosting", value: "AWS secure infrastructure" },
                { label: "Data Encryption", value: "AES-256 bit encryption" },
                { label: "API Access", value: "REST API for custom integrations" },
                { label: "User Capacity", value: "Unlimited users per organization" },
                { label: "Data Retention", value: "Configurable up to 10 years" },
                { label: "Mobile Support", value: "iOS and Android compatible" }
              ].map((spec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">{spec.label}:</strong>
                    <span className="text-gray-600 ml-2">{spec.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your attendance management?</h2>
          <p className="text-xl mb-8 text-green-50">Get in touch with our team to schedule a personalized demo</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/contact")}
            >
              Schedule Demo
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button 
              className="flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
              onClick={() => navigate("/pricing")}
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}