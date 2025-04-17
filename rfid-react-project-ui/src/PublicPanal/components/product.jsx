import { useNavigate,Link } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-black text-white">
      <Link to="/">
  <h1 className="text-xl font-bold text-green-400">RFID SYSTEM</h1>
</Link>
        <div className="space-x-4">
          <a href="/product" className="hover:text-green-400">Product</a>
          <a href="/feature" className="hover:text-green-400">Feature</a>
          <a href="/resources" className="hover:text-green-400">Resource</a>
          <a href="/pricing" className="hover:text-green-400">Pricing</a>
          <a href="/contact" className="hover:text-green-400">Contact</a>
          <a href="/Adminlogin" className="hover:text-green-400">Admin</a>
        </div>
        <div className="space-x-4">
          <button
            className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => navigate("/ClientLogin")} // Navigation on button click
          >
            Client
          </button>
          <button
            className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => navigate("/UserLogin")} // Navigation on button click
          >
            User
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-green-500 text-white py-16 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Advanced RFID Attendance System</h1>
          <p className="text-xl mb-8">Revolutionize how you track attendance with our cutting-edge RFID technology</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
              Schedule Demo
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-green-600">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <div className="max-w-6xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">How Our RFID System Works</h2>
            <p className="text-gray-700 mb-6">
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
                  <div className="bg-green-500 text-white rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-200 rounded-lg p-6 flex justify-center items-center">
            <img src="src\assets\Images\getstart.jpg" alt="RFID System Diagram" className="rounded-lg shadow-md" />
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="bg-gray-100 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Product Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Contactless Technology",
                description: "No physical contact required, improving hygiene and speed of attendance taking",
                icon: "🔄"
              },
              {
                title: "Real-time Tracking",
                description: "Instantly record and view attendance data as it happens",
                icon: "⏱️"
              },
              {
                title: "Multi-level Access Control",
                description: "Customize access for students, teachers, administrators, and guests",
                icon: "🔐"
              },
              {
                title: "Automated Notifications",
                description: "Send alerts for absences, late arrivals, or unauthorized access attempts",
                icon: "📱"
              },
              {
                title: "Comprehensive Reporting",
                description: "Generate detailed attendance reports with custom parameters",
                icon: "📊"
              },
              {
                title: "Easy Integration",
                description: "Works with existing student information systems and HR platforms",
                icon: "🔄"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xl font-semibold mb-4">Hardware Specifications</h3>
            <ul className="space-y-3 text-gray-700">
              <li><strong>RFID Reader Range:</strong> Up to 10 meters (adjustable)</li>
              <li><strong>Card Compatibility:</strong> 13.56 MHz ISO 14443A/B</li>
              <li><strong>Reader Power:</strong> PoE or DC adapter</li>
              <li><strong>Installation:</strong> Wall-mounted or desk-mounted options</li>
              <li><strong>Storage Capacity:</strong> Up to 100,000 events offline</li>
              <li><strong>Connectivity:</strong> Ethernet, Wi-Fi, 4G options</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Software Specifications</h3>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Cloud Hosting:</strong> AWS secure infrastructure</li>
              <li><strong>Data Encryption:</strong> AES-256 bit encryption</li>
              <li><strong>API Access:</strong> REST API for custom integrations</li>
              <li><strong>User Capacity:</strong> Unlimited users per organization</li>
              <li><strong>Data Retention:</strong> Configurable up to 10 years</li>
              <li><strong>Mobile Support:</strong> iOS and Android compatible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-500 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your attendance management?</h2>
          <p className="text-xl mb-8">Get in touch with our team to schedule a personalized demo</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
              Schedule Demo
            </button>
            <button 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-green-600"
              onClick={() => navigate("/pricing")}
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RFID SYSTEM</h3>
            <p className="text-gray-400">Advanced attendance tracking solutions for organizations of all sizes.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/product" className="text-gray-400 hover:text-white">Product</a></li>
              <li><a href="/feature" className="text-gray-400 hover:text-white">Features</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/resources" className="text-gray-400 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@rfidsystem.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Tech Street, Suite 100</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2025 RFID System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}