import { useNavigate,Link } from "react-router-dom";

export default function PricingPage() {
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
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl mb-8">Choose the plan that fits your organization's needs</p>
          <div className="flex justify-center">
            <div className="bg-white p-2 inline-flex rounded-full">
              <button className="py-2 px-6 rounded-full bg-green-600 text-white focus:outline-none">
                Monthly Billing
              </button>
              <button className="py-2 px-6 rounded-full text-green-600 focus:outline-none">
                Annual Billing (Save 20%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-16 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="border rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 p-6">
              <h3 className="text-xl font-bold mb-1">Starter</h3>
              <p className="text-gray-600 mb-4">For small teams and classrooms</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <p className="text-gray-500 mt-2">Up to 50 users</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {[
                  "1 RFID reader included",
                  "Basic attendance reports",
                  "Email notifications",
                  "8 hours/5 days support",
                  "90-day data retention"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="border rounded-lg shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg">
              Most Popular
            </div>
            <div className="bg-gray-50 p-6">
              <h3 className="text-xl font-bold mb-1">Professional</h3>
              <p className="text-gray-600 mb-4">For growing schools and businesses</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$249</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <p className="text-gray-500 mt-2">Up to 250 users</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {[
                  "3 RFID readers included",
                  "Advanced attendance analytics",
                  "Email & SMS notifications",
                  "24/7 priority support",
                  "1-year data retention",
                  "API access"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Get Started
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 p-6">
              <h3 className="text-xl font-bold mb-1">Enterprise</h3>
              <p className="text-gray-600 mb-4">For large institutions and organizations</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <p className="text-gray-500 mt-2">Unlimited users</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
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
                    <div className="text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="bg-gray-100 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Additional Add-ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{addon.title}</h3>
                  <p className="text-gray-600">{addon.description}</p>
                </div>
                <div className="text-right">
                  <span className="block font-semibold text-green-600">{addon.price}</span>
                  <button className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded text-sm">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
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
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-500 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8">Start your 14-day free trial today. No credit card required.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-green-600"
              onClick={() => navigate("/contact")}>
              Contact Sales
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