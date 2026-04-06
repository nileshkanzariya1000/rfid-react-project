import React from 'react';
import SharedNavbar from './SharedNavbar';
import SharedFooter from './SharedFooter';
import {
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

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
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto text-green-50">
            Feel free to reach out to any of our team members below. We're here to help!
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the talented individuals behind the RFID System
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-100 shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-4 border-white">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <div className="space-y-3 mt-4">
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <PhoneIcon className="w-5 h-5" />
                      <span>{member.phone}</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <EnvelopeIcon className="w-5 h-5" />
                      <span className="text-sm break-all">{member.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
};

export default ContactPage;

