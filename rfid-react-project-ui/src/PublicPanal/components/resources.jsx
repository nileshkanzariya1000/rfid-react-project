import React from "react";
import SharedNavbar from "./SharedNavbar";
import SharedFooter from "./SharedFooter";
import {
  BookOpenIcon,
  PlayCircleIcon,
  QuestionMarkCircleIcon,
  LinkIcon,
  UserGroupIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn how to set up your RFID attendance system from scratch.",
    link: "/docs/getting-started",
    icon: <BookOpenIcon className="w-12 h-12" />,
    color: "blue"
  },
  {
    title: "User Manual",
    description: "Detailed documentation covering every feature.",
    link: "/docs/user-manual",
    icon: <BookOpenIcon className="w-12 h-12" />,
    color: "green"
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step walkthroughs and feature explanations.",
    link: "https://www.youtube.com/@yourchannel",
    external: true,
    icon: <PlayCircleIcon className="w-12 h-12" />,
    color: "red"
  },
  {
    title: "FAQ",
    description: "Find answers to the most common questions.",
    link: "/faq",
    icon: <QuestionMarkCircleIcon className="w-12 h-12" />,
    color: "yellow"
  },
  {
    title: "Developer API",
    description: "Integrate our system into your custom platform using our REST API.",
    link: "/docs/api",
    icon: <LinkIcon className="w-12 h-12" />,
    color: "indigo"
  },
  {
    title: "Community Forum",
    description: "Join the discussion and get help from other users and developers.",
    link: "https://community.yourapp.com",
    external: true,
    icon: <UserGroupIcon className="w-12 h-12" />,
    color: "purple"
  },
];

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to the RFID System Resources</h1>
          <p className="text-lg md:text-xl mb-8 text-green-50 max-w-3xl mx-auto">
            Everything you need to get started and grow with our RFID system. Explore guides, videos, FAQs, and more!
          </p>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to get started and grow with our RFID system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
};

const ResourceCard = ({ resource }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600"
  };

  if (resource.external) {
    return (
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center group border border-gray-100 cursor-pointer block"
      >
        <div className={`${colorClasses[resource.color]} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
          {resource.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-green-600 transition-colors">
          {resource.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
        <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
          <span>Learn More</span>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </a>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center group border border-gray-100 cursor-pointer">
      <div className={`${colorClasses[resource.color]} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
        {resource.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-green-600 transition-colors">
        {resource.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
        <span>Learn More</span>
        <ArrowRightIcon className="w-4 h-4" />
      </div>
    </div>
  );
};

export default ResourcesPage;
