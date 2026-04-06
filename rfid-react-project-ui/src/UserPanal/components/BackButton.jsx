import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const BackButton = ({ to, title = "Back", className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${className}`}
      title={title}
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
};

export default BackButton;

