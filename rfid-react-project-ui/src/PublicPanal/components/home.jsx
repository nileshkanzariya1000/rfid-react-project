import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
    return (
      <div className="bg-white">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-4 shadow-md bg-black text-white">
  <h1 className="text-xl font-bold text-green-400">RFID SYSTEM</h1>
  <div className="space-x-4">
  <a href="/product" className="hover:text-green-400">Product</a>
          <a href="/feature" className="hover:text-green-400">Feature</a>
          <a href="/resources" className="hover:text-green-400">Resource</a>
          <a href="/pricing" className="hover:text-green-400">Pricing</a>
          <a href="/contact" className="hover:text-green-400">Contact</a>
    <a href="/Adminlogin" className="hover:text-green-400">Admin</a>
  </div>
  <div className="space-x-4">
    <button className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
     onClick={() => navigate("/ClientLogin")}
     >Client</button>
    <button
className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => navigate("/UserLogin")}
          >User</button>
  </div>
</nav>

  
        {/* Hero Section */}
        <section className="bg-green-500 text-white p-10 m-10 rounded-xl flex items-center">
          <div className="w-1/2 flex justify-center">
            <img src="home.png" alt="RFID Illustration" className="w-2/3" />
          </div>
          <div className="w-1/2">
            <h2 className="text-3xl font-bold">RFID based embedded attendance system</h2>
            <p className="mt-2">An RFID-based embedded system website for attendance tracking, access control, and real-time monitoring.</p>
            <div className="mt-4 space-x-2">
            <button className="bg-white hover:bg-black text-green-500 py-2 px-4 rounded" onClick={() => navigate("/feature")}>Get Started Today</button>
              <button className="bg-white hover:bg-black text-green-500 py-2 px-4 rounded" onClick={() => navigate("/contact")}>Request a Demo</button>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="text-center p-10 ">
          <h3 className="text-2xl font-bold">All-in-One Student and Employee Management</h3>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <FeatureCard title="Take Attendance in Minutes" description="Easily publish job listings with our simple job post builder." />
            <FeatureCard title="Student Management" description="Track employees, teams, and ensure seamless scheduling." />
            <FeatureCard title="Candidate Management" description="Simplify the hiring process with powerful candidate tracking." />
            <FeatureCard title="Smart Reporting & Analytics" description="Gain insights with detailed reports on your hiring funnel." />
          </div>
        </section>
  
        {/* Pricing Section */}
        <section className="bg-green-500 text-white p-10 text-center m-10 rounded-xl">
          <h3 className="text-2xl font-bold">Create your complete Package System</h3>
          <p className="mt-2">Automate for more than 10 roles at once and looking for a comprehensive solution?</p>
          <button
            className="bg-white text-green-500 py-2 px-4 rounded mt-4"
            onClick={() => window.location.href = '/pricing'}
          >
            See pricing
          </button>
        </section>
         {/* Footer */}
       <footer className="bg-black text-white py-8 px-8">
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
              <li>Email: nhkanzariya582@rku.ac.in</li>
              <li>Phone: +91 9737071292</li>
              <li>Address: A 308,RK University Rajkot</li>
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
  
  function FeatureCard({ title, description }) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm mt-1">{description}</p>
      </div>
    );
  }
  