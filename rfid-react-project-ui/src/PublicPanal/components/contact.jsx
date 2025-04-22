import React from 'react';
import { useNavigate,Link } from 'react-router-dom';

const teamMembers = [
  {
    name: "Nilesh Kanzariya",
    phone: "+91 9737071292",
    email: "nkanzariya582@rku.ac.in",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQEeQF5dTAczIQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732680945841?e=2147483647&v=beta&t=UWLHfbStOOYYXPAcLNMwwA_dmKOBPnsKT5DSH2bpM4A",
  },
  {
    name: "Nishil Kakadiya",
    phone: "+91 9313424812",
    email: "nkakadiya694@rku.ac.in",
    image: "https://media.licdn.com/dms/image/v2/D5603AQF5dfOEg01c2A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726414787498?e=2147483647&v=beta&t=7I3ZM4nXauQ4byfIaGUmyd-Rg3Amhrwh7FkgrD6Yp1c",
  },
  {
    name: "Sumit Chavda",
    phone: "+91 7043619303",
    email: "schavda295@rku.ac.in",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQELXAJ9UcBQ_Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726419907292?e=1750896000&v=beta&t=HjoBvj9nUuVePV3GksHkL_wJrrWdX9U-J5bvHEx0Y0A",
  },
];


const ContactPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate here for programmatic navigation

  return (
    <div>
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
      <section className="bg-green-500 text-white p-10  my- 0">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Feel free to reach out to any of our team members below.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
                >
                  <div className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-35 h-35 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-green-600">{member.name}</h3>
                    <p className="text-gray-500 mt-2">{member.phone}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-blue-500 underline mt-1 block"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
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
};

export default ContactPage;
