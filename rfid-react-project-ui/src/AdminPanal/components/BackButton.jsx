import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-[#1b2559] font-bold text-sm rounded-xl shadow-sm border border-gray-100 transition-all group mb-6 active:scale-95"
    >
      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
      Back
    </button>
  );
};

export default BackButton;
