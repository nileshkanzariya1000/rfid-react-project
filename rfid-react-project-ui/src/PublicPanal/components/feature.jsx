import { useNavigate,Link } from "react-router-dom";

export default function FeaturePage() {
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
          <h1 className="text-4xl font-bold mb-4">Powerful RFID System Features</h1>
          <p className="text-xl mb-8">Discover how our comprehensive feature set can transform your attendance management</p>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Core Features</h2>
        
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="bg-gray-200 rounded-lg p-6 flex justify-center items-center order-1 md:order-1">
            <img src="src\assets\Images\rfidproduct.jpg" alt="Real-time Tracking" className="rounded-lg shadow-md" />
          </div>
          <div className="order-2 md:order-2">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Real-time Attendance Tracking</h3>
            <p className="text-gray-700 mb-4">
              Monitor attendance in real-time across all your locations. Our system records precise 
              entry and exit times, providing an accurate picture of student or employee presence.
            </p>
            <ul className="space-y-2">
              {[
                "Instant attendance recording with minimal manual intervention",
                "Automatic time-stamping of entry and exit",
                "Live dashboard showing who's present and absent",
                "Mobile app access for on-the-go monitoring"
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
        </div>
        
        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Advanced Reporting & Analytics</h3>
            <p className="text-gray-700 mb-4">
              Transform raw attendance data into actionable insights with our comprehensive reporting tools.
              Monitor trends, identify patterns, and make data-driven decisions.
            </p>
            <ul className="space-y-2">
              {[
                "Customizable report templates for different stakeholders",
                "Exportable data in multiple formats (PDF, Excel, CSV)",
                "Visual attendance analytics with graphs and charts",
                "Automated scheduled reports delivered to your inbox"
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
          <div className="bg-gray-200 rounded-lg p-6 flex justify-center items-center order-1 md:order-2">
            <img src="src\assets\Images\report.jpg"  alt="Advanced Analytics" className="rounded-lg shadow-md" />
          </div>
        </div>
        
        {/* Feature 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="bg-gray-200 rounded-lg p-6 flex justify-center items-center order-1 md:order-1">
            <img src="src\assets\Images\mobile.jpg" alt="Automated Notifications" className="rounded-lg shadow-md" />
          </div>
          <div className="order-2 md:order-2">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Automated Notifications</h3>
            <p className="text-gray-700 mb-4">
              Keep everyone informed with our smart notification system. Automatically alert 
              administrators about absences, late arrivals, and unusual attendance patterns.
            </p>
            <ul className="space-y-2">
              {[
                "Configurable alerts for absences and tardiness",
                "Parent/guardian notifications for student attendance",
                "Bulk notifications for emergency communications",
                "Multi-channel delivery via email, SMS, and push notifications"
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
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="bg-gray-100 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Additional Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Access Control Integration",
                description: "Combine attendance tracking with building access control for enhanced security and convenience."
              },
              {
                title: "Multi-Location Support",
                description: "Manage attendance across multiple campuses or offices from a single centralized platform."
              },
              {
                title: "Custom Workflows",
                description: "Create specialized attendance rules and approval processes tailored to your organization."
              },
              {
                title: "Mobile Compatibility",
                description: "Access the system from any device with our responsive web interface and dedicated mobile apps."
              },
              {
                title: "API Integration",
                description: "Connect with your existing HR, payroll, or student information systems via our robust API."
              },
              {
                title: "Biometric Authentication",
                description: "Optional added security with fingerprint or facial recognition as secondary verification."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-green-600">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to see these features in action?</h2>
          <p className="text-xl text-gray-600 mb-8">Schedule a demo or contact our team to learn more about how our RFID system can benefit your organization.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium">
              Schedule a Demo
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-medium"
              onClick={() => navigate("/pricing")}>
              View Pricing Plans
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