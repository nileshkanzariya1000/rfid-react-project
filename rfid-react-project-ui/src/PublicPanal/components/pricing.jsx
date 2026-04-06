import { useNavigate } from "react-router-dom";
import SharedNavbar from "./SharedNavbar";
import SharedFooter from "./SharedFooter";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function PricingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white min-h-screen">
      <SharedNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl mb-8 text-green-50">Choose the plan that fits your organization's needs</p>
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-2 inline-flex rounded-full border border-white/30">
              <button className="py-2 px-6 rounded-full bg-white text-green-600 font-semibold focus:outline-none shadow-lg">
                Monthly Billing
              </button>
              <button className="py-2 px-6 rounded-full text-white hover:bg-white/10 focus:outline-none transition-colors">
                Annual Billing (Save 20%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Starter</h3>
              <p className="text-gray-600 mb-4">For small teams and classrooms</p>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">$99</span>
                <span className="text-gray-600 ml-2 text-lg">/month</span>
              </div>
              <p className="text-gray-500 mt-2">Up to 50 users</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4 mb-8">
                {[
                  "1 RFID reader included",
                  "Basic attendance reports",
                  "Email notifications",
                  "8 hours/5 days support",
                  "90-day data retention"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-white border-2 border-green-500 rounded-xl shadow-2xl overflow-hidden relative transform scale-105 hover:scale-110 transition-all duration-300">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded-bl-lg font-semibold text-sm">
              <SparklesIcon className="w-4 h-4 inline mr-1" />
              Most Popular
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 border-b border-green-200">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Professional</h3>
              <p className="text-gray-600 mb-4">For growing schools and businesses</p>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">$249</span>
                <span className="text-gray-600 ml-2 text-lg">/month</span>
              </div>
              <p className="text-gray-500 mt-2">Up to 250 users</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4 mb-8">
                {[
                  "3 RFID readers included",
                  "Advanced attendance analytics",
                  "Email & SMS notifications",
                  "24/7 priority support",
                  "1-year data retention",
                  "API access"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
              <p className="text-gray-600 mb-4">For large institutions and organizations</p>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">$499</span>
                <span className="text-gray-600 ml-2 text-lg">/month</span>
              </div>
              <p className="text-gray-500 mt-2">Unlimited users</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4 mb-8">
                {[
                  "10 RFID readers included",
                  "Custom reporting & analytics",
                  "All notification channels",
                  "24/7 dedicated support",
                  "5-year data retention",
                  "Full API access & integration",
                  "Custom development options",
                  "Multi-location support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Additional Add-ons</h2>
            <p className="text-gray-600 text-lg">Enhance your plan with these powerful add-ons</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Additional RFID Readers",
                description: "Expand your coverage with additional readers for more entry points.",
                price: "$49 per reader/month"
              },
              {
                title: "Advanced Access Control",
                description: "Enhance security with role-based access control and door integration.",
                price: "$99 per month"
              },
              {
                title: "Mobile App Premium",
                description: "Custom branded mobile app for your organization.",
                price: "$149 per month"
              },
              {
                title: "Extended Data Retention",
                description: "Keep your attendance data for up to 10 years.",
                price: "$79 per month"
              }
            ].map((addon, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{addon.title}</h3>
                  <p className="text-gray-600">{addon.description}</p>
                </div>
                <div className="text-right md:text-left md:ml-4">
                  <span className="block font-semibold text-green-600 text-lg mb-2">{addon.price}</span>
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Everything you need to know about our pricing</p>
        </div>
        <div className="space-y-6">
          {[
            {
              question: "Can I upgrade or downgrade my plan later?",
              answer: "Yes, you can change your plan at any time. When upgrading, you'll be billed the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
            },
            {
              question: "Is there a setup fee?",
              answer: "No, there are no setup fees for our standard plans. For Enterprise customers with custom requirements, there may be a one-time implementation fee."
            },
            {
              question: "Do you offer discounts for educational institutions?",
              answer: "Yes, we offer a 15% discount for all educational institutions. Contact our sales team with your .edu email address to verify eligibility."
            },
            {
              question: "Can I try the system before purchasing?",
              answer: "Yes, we offer a 14-day free trial that includes all features of our Professional plan. No credit card required to start your trial."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 text-green-50">Start your 14-day free trial today. No credit card required.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/contact")}
            >
              Contact Sales
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}