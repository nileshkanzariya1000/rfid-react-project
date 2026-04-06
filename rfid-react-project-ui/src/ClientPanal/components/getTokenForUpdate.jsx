import React, { useEffect, useState } from "react";
import { getTokensForClient } from "../service/api";
import { Link } from "react-router-dom";
import { Check, Shield, Zap, ArrowRight, Package, Calendar } from "lucide-react";

const UpdateTokenDetails = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const brandColor = "#00c950";
  const lightBrandBg = "#e6faed";

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getTokensForClient();
        if (response.success) {
          setTokens(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="w-12 h-12 border-4 border-[#00c950]/20 border-t-[#00c950] rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
          <Shield className="w-5 h-5" />
          <p className="font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 text-center max-w-2xl mx-auto pt-4">
        <span 
          className="px-4 py-1.5 rounded-full text-sm font-bold tracking-wide tabular-nums uppercase inline-flex items-center gap-2 mb-4"
          style={{ backgroundColor: lightBrandBg, color: brandColor }}
        >
          <Zap size={16} /> Subscription Renewal
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">Renew Your Access Token</h1>
        <p className="text-gray-500 text-lg">Select a plan to extend your subject's validity and continue managing attendance tracking without interruption.</p>
      </div>

      {tokens.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">No Tokens Available</h3>
            <p className="text-gray-500 mt-2">There are currently no access plans available to purchase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {tokens.map((token, index) => {
            const isFeatured = index === 1;

            return (
              <div
                key={token.token_id}
                className={`relative flex flex-col bg-white rounded-3xl p-8 transition-all duration-300 ${
                  isFeatured 
                    ? 'shadow-xl scale-105 border-2 border-[#00c950] z-10' 
                    : 'shadow-md border border-gray-100 hover:shadow-xl hover:border-[#00c950]/30'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00c950] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{token.name}</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">{token.description || "Standard access plan for subject renewal."}</p>
                
                <div className="mb-6 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">₹{token.price}</span>
                </div>

                <div 
                  className="mb-8 p-4 rounded-2xl border"
                  style={{ 
                    backgroundColor: isFeatured ? lightBrandBg : '#f9fafb',
                    borderColor: isFeatured ? '#00c95040' : '#f3f4f6'
                  }}
                >
                  <p className="text-sm font-semibold flex items-center gap-2" style={{ color: isFeatured ? brandColor : '#374151' }}>
                    <Calendar className="w-4 h-4" /> Valid for {token.duration_day} Days
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "Extend Subject Validity",
                    "Unlimited Student Enrollments",
                    "Full Analytics Dashboard",
                    "Real-time Attendance Tracking"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="rounded-full p-0.5 mt-0.5" style={{ backgroundColor: lightBrandBg, color: brandColor }}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`ProcideToUpdate/${token.token_id}`}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 group ${
                    isFeatured 
                      ? 'bg-[#00c950] hover:bg-[#00a843] text-white shadow-lg shadow-[#00c950]/30' 
                      : 'bg-gray-50 hover:bg-[#e6faed] text-gray-800 hover:text-[#00c950] border border-gray-200 hover:border-[#00c950]/30'
                  }`}
                >
                  Renew Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpdateTokenDetails;
