import React, { useEffect, useState } from "react";
import { getTokensForClient } from "../service/api";
import { Link } from "react-router-dom";
const TokensDetails = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {tokens.map((token) => (
  <div
    key={token.token_id}
    className="border border-gray-200 shadow-lg rounded-lg p-6 w-80 text-center hover:shadow-xl transition-all"
  >
    <h3 className="text-xl font-bold text-gray-800">{token.name}</h3>
    <p className="text-gray-600 mt-2">{token.description}</p>
    <h2 className="text-3xl font-extrabold text-green-600 mt-4">${token.price}</h2>
    <p className="text-gray-500 text-sm mt-1">{token.duration_day} Days Access</p>
    <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 transition">
      <Link to={`ProcideToAdd/${token.token_id}`} className="text-white">
        Get Started
      </Link>
    </button>
  </div>
))}

    </div>
  );
};

export default TokensDetails;
