import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bars3Icon, 
  PencilSquareIcon, 
  KeyIcon, 
  BookOpenIcon, 
  PlusIcon, 
  ArrowLeftOnRectangleIcon, 
  MagnifyingGlassIcon, 
  UserIcon 
} from "@heroicons/react/24/solid";

const UserSideNavbar = ({ onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [subjectOpen, setSubjectOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(""); // To track the selected item
  const navigate = useNavigate();

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

  return (
    <div className={`h-screen bg-black text-white p-4 ${isOpen ? "w-72" : "w-16"} flex flex-col transition-all duration-300`}>
      {/* Title Row with Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        {isOpen && <h1 className="text-2xl font-bold">Dashboard</h1>}
        <button onClick={() => setIsOpen(!isOpen)}>
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Search Bar / Search Icon */}
      <div className="mb-4">
        {isOpen ? (
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
        ) : (
          <div className="flex justify-center">
            <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-green-500" />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <ul className="space-y-3 flex-1">
        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "EditProfile" ? "bg-light-green text-green-500" : "hover:text-green-500"}`}
          onClick={() => handleSelectItem("EditProfile")}
        >
          <PencilSquareIcon className="w-6 h-6" />
          {isOpen && <span>Edit Profile</span>}
        </li>

        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "EditPassword" ? "bg-light-green text-green-500" : "hover:text-green-500"}`}
          onClick={() => handleSelectItem("EditPassword")}
        >
          <KeyIcon className="w-6 h-6" />
          {isOpen && <span>Edit Password</span>}
        </li>

        {/* View Subject Dropdown */}
        <li>
          <div
            className={`flex items-center justify-between cursor-pointer p-2 rounded ${selectedItem === "ViewSubject" ? "bg-light-green text-green-500" : "hover:text-green-500"}`}
            onClick={() => {
              handleSelectItem("ViewSubject");
              setSubjectOpen(!subjectOpen);
            }}
          >
            <span className="flex items-center gap-2">
              <BookOpenIcon className="w-6 h-6" />
              {isOpen && <span>View Subject</span>}
            </span>
            {isOpen && <span>{subjectOpen ? "▼" : "▶"}</span>}
          </div>
          {isOpen && subjectOpen && (
            <ul className="pl-6 mt-2 space-y-2">
              <li className="hover:text-green-400 cursor-pointer">Science</li>
              <li className="text-green-500 cursor-pointer">Maths</li>
              <li className="hover:text-green-400 cursor-pointer">Physics</li>
              <li className="hover:text-green-400 cursor-pointer">English</li>
            </ul>
          )}
        </li>

        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "AddNewSubject" ? "bg-light-green text-green-500" : "hover:text-green-500"}`}
          onClick={() => handleSelectItem("AddNewSubject")}
        >
          <PlusIcon className="w-6 h-6" />
          {isOpen && <span>Add New Subject</span>}
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mb-4">
        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "Logout" ? "bg-light-green text-green-500" : "hover:text-red-500"}`}
          onClick={() => handleSelectItem("Logout")}
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          {isOpen && <span>Logout</span>}
        </li>
      </div>

      {/* Profile Section */}
      {isOpen && (
        <div className="flex items-center bg-gray-800 p-2 rounded-lg">
          <UserIcon className="w-10 h-10 text-white" />
          <div className="ml-3">
            <p className="font-bold">Nishil Kakadiya</p>
            <p className="text-sm text-gray-400">Student</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSideNavbar;
