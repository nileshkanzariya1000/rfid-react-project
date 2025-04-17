import React from 'react';
import { useNavigate,Link } from 'react-router-dom';

const teamMembers = [
  {
    name: "Nilesh Kanzariya",
    phone: "+91 9737071292",
    email: "nkanzariya582@rku.ac.in",
  },
  {
    name: "Nishil Kakadiya",
    phone: "+91 9313424812",
    email: "nkakadiya694@rku.ac.in",
  },
  {
    name: "Sumit Chavda",
    phone: "+91 7043619303",
    email: "schavda295@rku.ac.in",
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
      <section className="bg-green-500 text-white p-10 rounded-xl my- 0">
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
                  <h3 className="text-xl font-semibold text-green-600">{member.name}</h3>
                  <p className="text-gray-500 mt-2">{member.phone}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-500 underline mt-1"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
