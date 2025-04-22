import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaVideo, FaQuestionCircle, FaPlug, FaUsers, FaPlayCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn how to set up your RFID attendance system from scratch.",
    link: "/docs/getting-started",
    icon: <FaBook className="text-blue-500 text-3xl mb-4" />,
  },
  {
    title: "User Manual",
    description: "Detailed documentation covering every feature.",
    link: "/docs/user-manual",
    icon: <FaBook className="text-green-500 text-3xl mb-4" />,
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step walkthroughs and feature explanations.",
    link: "https://www.youtube.com/@yourchannel",
    external: true,
    icon: <FaPlayCircle className="text-red-500 text-3xl mb-4" />,
  },
  {
    title: "FAQ",
    description: "Find answers to the most common questions.",
    link: "/faq",
    icon: <FaQuestionCircle className="text-yellow-500 text-3xl mb-4" />,
  },
  {
    title: "Developer API",
    description: "Integrate our system into your custom platform using our REST API.",
    link: "/docs/api",
    icon: <FaPlug className="text-indigo-500 text-3xl mb-4" />,
  },
  {
    title: "Community Forum",
    description: "Join the discussion and get help from other users and developers.",
    link: "https://community.yourapp.com",
    external: true,
    icon: <FaUsers className="text-purple-500 text-3xl mb-4" />,
  },
];

const ResourcesPage = () => {
  const navigate = useNavigate();
  return (
    <div>
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
      <div className="bg-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Welcome to the RFID System Resources</h2>
          <p className="text-lg mb-8">
            Everything you need to get started and grow with our RFID system. Explore guides, videos, FAQs, and more!
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">Resources</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Everything you need to get started and grow with our RFID system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
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

const ResourceCard = ({ resource }) => {
  const Card = resource.external ? "a" : Link;
  const props = resource.external
    ? { href: resource.link, target: "_blank", rel: "noopener noreferrer" }
    : { to: resource.link };

  return (
    <Card
      {...props}
      className="bg-white rounded-xl border hover:shadow-lg transition duration-300 p-6 text-center group hover:border-blue-500"
    >
      <div className="flex justify-center">{resource.icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mt-2 group-hover:text-blue-600">
        {resource.title}
      </h3>
      <p className="text-gray-600 mt-2 text-sm">{resource.description}</p>
    </Card>
  );
};

export default ResourcesPage;
